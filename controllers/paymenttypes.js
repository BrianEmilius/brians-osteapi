import User, { PaymentType } from "../models/usermodel.js";

export async function createPaymentType(request, response) {
	const newPaymentType = new PaymentType()
	newPaymentType.type = request.body.type
	if (request.body.creditcard) {
		newPaymentType.creditcard = {
			name: request.body.creditcard.name,
			number: request.body.creditcard.number,
			exp: request.body.creditcard.exp,
			cvc: request.body.creditcard.cvc
		}
	}
	newPaymentType.paypal = request.body.paypal

	try {
		const result = await newPaymentType.save()
		const id = request.params.id

		await User.findByIdAndUpdate(id, { $push: { paymentTypes: result._id } })

		response.status(201).json(result)
	} catch (error) {
		console.log(error.message)
		response.status(500).end()
	}
}