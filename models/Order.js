import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'user' },
    items: [{
        product: { type: String, required: true, ref: 'product' },
        quantity: { type: Number, required: true }
    }],
    amount: { type: Number, required: true },
    address: { type: String, ref: 'address', required: true },
    status: { type: String, required: true, default: 'Order Placed' },
    date: { type: Number, required: true },
    promotionCode: { type: String, default: null },
    discountAmount: { type: Number, default: 0 },
})

if (mongoose.models.order) {
    mongoose.deleteModel('order');
}

const Order = mongoose.model('order', orderSchema)

export default Order