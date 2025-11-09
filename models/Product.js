import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    date: { type: Number, required: true }
})

if (mongoose.models.product) {
    mongoose.deleteModel('product');
}

const Product = mongoose.model('product', productSchema)

export default Product