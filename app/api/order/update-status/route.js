import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    try {
        const { userId } = getAuth(request);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({
                success: false,
                message: 'Not authorized'
            }, { status: 403 });
        }

        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json({
                success: false,
                message: 'Order ID and status are required'
            }, { status: 400 });
        }

        // Validate status values
        const validStatuses = ['Order Placed', 'Cancelled', 'Delivered', 'Arrived'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid status. Allowed values: Order Placed, Cancelled, Delivered, Arrived'
            }, { status: 400 });
        }

        await connectDB();

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'Order not found'
            }, { status: 404 });
        }

        // Prevent changing from Delivered to Cancelled
        if (order.status === 'Delivered' && status === 'Cancelled') {
            return NextResponse.json({
                success: false,
                message: 'Cannot cancel an order that has already been delivered'
            }, { status: 400 });
        }

        order.status = status;
        await order.save();

        return NextResponse.json({
            success: true,
            message: 'Order status updated successfully',
            order
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

