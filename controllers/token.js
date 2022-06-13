import User from "../models/usermodel.js"
import bcrypt from "bcryptjs"

export async function createToken(request, response) {
	try {
		const result = await User.findOne({ username: request.body.username })
		response.json(result)
	} catch (error) {
		response.status(500).end()
	}
}