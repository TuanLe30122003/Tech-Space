import connectDB from '@/config/db'
import Promotion from '@/models/Promotions'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const activeOnly = searchParams.get('activeOnly') === 'true'
        const code = searchParams.get('code')

        let query = {}

        // Filter by code if provided
        if (code) {
            query.code = code.toUpperCase()
        }

        // Filter active promotions only
        if (activeOnly) {
            const now = Date.now()
            query.isActive = true
            query.startDate = { $lte: now }
            query.endDate = { $gte: now }
        }

        const promotions = await Promotion.find(query).sort({ date: -1 })

        return NextResponse.json({
            success: true,
            promotions
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

