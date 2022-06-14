import { ObjectId } from "mongodb"
import mongoose from "mongoose"

export const creditcardSchema = mongoose.Schema({
	name: {
		type: String
	},
	number: {
		type: Number
	},
	exp: {
		type: Number
	},
	cvc: {
		Type: Number
	}
})

export const paymentTypeSchema = mongoose.Schema({
	type: {
		type: String,
		required: [true, "You must provide a payment type"]
	},
	creditcard: creditcardSchema,
	paypal: {
		type: String
	}
})

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username required, duh!"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password required, dumbass!"]
	},
	paymentTypes: [{ type: ObjectId, ref: "PaymentType" }]
})

const User = mongoose.model("User", userSchema)
export const PaymentType = mongoose.model("PaymentType", paymentTypeSchema)
export default User
