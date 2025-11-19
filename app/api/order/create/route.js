import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {

        const { userId } = getAuth(request)
        const { address, items, promotionCode, discountAmount = 0, finalAmount } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        // calculate amount using items
        const amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + product.offerPrice * item.quantity;
        }, 0)

        const tax = Math.floor(amount * 0.02);
        const subtotal = amount + tax;
        // Use finalAmount from client if provided, otherwise calculate
        const orderAmount = finalAmount !== undefined ? finalAmount : (subtotal - discountAmount);

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: Math.max(0, orderAmount),
                promotionCode: promotionCode || null,
                discountAmount: discountAmount || 0,
                date: Date.now()
            }
        })

        // clear user cart
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}