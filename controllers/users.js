import bcrypt from "bcryptjs"
import User from "../models/usermodel.js"

export async function createUser(request, response) {
	const salt = bcrypt.genSaltSync(15)
	const password = bcrypt.hashSync(request.body.password, salt)

	const newUser = new User()
	newUser.username = request.body.username
	newUser.password = password

	try {
		const result = await newUser.save()
		response.status(201).json(result)
	} catch (error) {
		console.log(error.message)
		if (error.message.toLowerCase().includes("user validation failed")) {
			response.status(400).end()
			return
		}

		if (error.message.toLowerCase().includes("duplicate key error")) {
			response.status(409).end()
			return
		}

		response.status(500).end()
	}
}
