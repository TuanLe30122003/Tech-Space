import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'],
        default: 'percentage'
    },
    discountValue: { type: Number, required: true },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    applicableToAll: { type: Boolean, default: true },
    usageLimit: { type: Number, default: null }, // null means unlimited
    usedCount: { type: Number, default: 0 },
    minPurchaseAmount: { type: Number, default: 0 }, // minimum order amount to use this promotion
    date: { type: Number, required: true }
})

const Promotion = mongoose.models.promotion || mongoose.model('promotion', promotionSchema)

export default Promotion

