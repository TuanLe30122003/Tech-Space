import connectDB from "@/config/db";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized'
            }, { status: 401 });
        }

        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json({
                success: false,
                message: 'Order ID is required'
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

        // Verify that the order belongs to the user
        if (order.userId !== userId) {
            return NextResponse.json({
                success: false,
                message: 'You can only cancel your own orders'
            }, { status: 403 });
        }

        // Prevent canceling if already delivered
        if (order.status === 'Delivered') {
            return NextResponse.json({
                success: false,
                message: 'Cannot cancel an order that has already been delivered'
            }, { status: 400 });
        }

        // Prevent canceling if already cancelled
        if (order.status === 'Cancelled') {
            return NextResponse.json({
                success: false,
                message: 'Order is already cancelled'
            }, { status: 400 });
        }

        order.status = 'Cancelled';
        await order.save();

        return NextResponse.json({
            success: true,
            message: 'Order cancelled successfully',
            order
        });

    } catch (error) {
        console.error('Error cancelling order:', error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

