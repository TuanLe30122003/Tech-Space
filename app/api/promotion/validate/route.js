import connectDB from '@/config/db'
import Promotion from '@/models/Promotions'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { code, orderAmount } = await request.json()

        if (!code) {
            return NextResponse.json({
                success: false,
                message: 'Promotion code is required'
            }, { status: 400 })
        }

        await connectDB()

        const promotion = await Promotion.findOne({ code: code.toUpperCase() })

        if (!promotion) {
            return NextResponse.json({
                success: false,
                message: 'Invalid promotion code'
            }, { status: 404 })
        }

        const now = Date.now()

        // Check if promotion is active
        if (!promotion.isActive) {
            return NextResponse.json({
                success: false,
                message: 'Promotion is not active'
            }, { status: 400 })
        }

        // Check date validity
        if (now < promotion.startDate || now > promotion.endDate) {
            return NextResponse.json({
                success: false,
                message: 'Promotion code has expired or not yet started'
            }, { status: 400 })
        }

        // Check usage limit
        if (promotion.usageLimit && promotion.usedCount >= promotion.usageLimit) {
            return NextResponse.json({
                success: false,
                message: 'Promotion code has reached its usage limit'
            }, { status: 400 })
        }

        // Check minimum purchase amount
        if (orderAmount && promotion.minPurchaseAmount > 0 && orderAmount < promotion.minPurchaseAmount) {
            return NextResponse.json({
                success: false,
                message: `Minimum purchase amount of ${promotion.minPurchaseAmount} is required`
            }, { status: 400 })
        }

        // Calculate discount
        let discountAmount = 0
        if (promotion.discountType === 'percentage') {
            discountAmount = (orderAmount || 0) * (promotion.discountValue / 100)
        } else {
            discountAmount = promotion.discountValue
        }

        return NextResponse.json({
            success: true,
            promotion: {
                code: promotion.code,
                name: promotion.name,
                discountType: promotion.discountType,
                discountValue: promotion.discountValue,
                discountAmount: discountAmount,
                applicableToAll: promotion.applicableToAll
            }
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

