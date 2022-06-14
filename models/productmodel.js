import mongoose from "mongoose"

export const priceSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: [true, "You must provide an amount"]
	},
	currency: {
		type: String,
		default: "DKK"
	}
})

export const productSchema = new mongoose.Schema({
	name: String,
	price: [priceSchema],
	description: String
})

const Product = mongoose.model("Product", productSchema)

export default Product
