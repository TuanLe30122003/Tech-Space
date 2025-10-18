import connectDB from '@/config/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const productId = searchParams.get('id')

        if (!productId) {
            return NextResponse.json({
                success: false,
                message: 'Product ID is required'
            }, { status: 400 })
        }

        await connectDB()

        const product = await Product.findById(productId)

        if (!product) {
            return NextResponse.json({
                success: false,
                message: 'Product not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            product
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}
