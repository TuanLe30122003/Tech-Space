import connectDB from '@/config/db'
import Promotion from '@/models/Promotions'
import authSeller from '@/lib/authSeller'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const data = await request.json()
        const {
            code,
            name,
            description,
            discountType,
            discountValue,
            startDate,
            endDate,
            isActive = true,
            applicableToAll = true,
            usageLimit = null,
            minPurchaseAmount = 0
        } = data

        // Validation
        if (!code || !name || !discountType || !discountValue || !startDate || !endDate) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields'
            }, { status: 400 })
        }

        if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
            return NextResponse.json({
                success: false,
                message: 'Percentage discount must be between 0 and 100'
            }, { status: 400 })
        }

        if (discountType === 'fixed' && discountValue < 0) {
            return NextResponse.json({
                success: false,
                message: 'Fixed discount must be greater than 0'
            }, { status: 400 })
        }

        if (startDate >= endDate) {
            return NextResponse.json({
                success: false,
                message: 'End date must be after start date'
            }, { status: 400 })
        }

        await connectDB()

        // Check if code already exists
        const existingPromotion = await Promotion.findOne({ code: code.toUpperCase() })
        if (existingPromotion) {
            return NextResponse.json({
                success: false,
                message: 'Promotion code already exists'
            }, { status: 400 })
        }

        const newPromotion = await Promotion.create({
            code: code.toUpperCase(),
            name,
            description: description || '',
            discountType,
            discountValue: Number(discountValue),
            startDate: Number(startDate),
            endDate: Number(endDate),
            isActive,
            applicableToAll,
            usageLimit: usageLimit ? Number(usageLimit) : null,
            minPurchaseAmount: Number(minPurchaseAmount),
            date: Date.now()
        })

        return NextResponse.json({
            success: true,
            message: 'Promotion created successfully',
            promotion: newPromotion
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

