import User from "../models/usermodel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function createToken(request, response) {
	try {
		const result = await User.findOne({ username: request.body.username })
		
		if (!result) {
			response.status(401).end()
			return
		}

		if (!bcrypt.compareSync(request.body.password, result.password)) {
			response.status(401).end()
			return
		}

		const expire = Math.floor(Date.now() / 1000) + (60 * 60)
		const token = jwt.sign({
			exp: expire,
			data: {
				id: result._id,
				username: result.username,
				role: result.role || "customer"
			}
		}, process.env.TOKEN_SECRET)
		
		response.status(201).json({
			access_token: token,
			expire
		})
	} catch (error) {
		console.log(error)
		response.status(500).end()
	}
}