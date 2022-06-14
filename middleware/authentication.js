import jwt from "jsonwebtoken"

export function checkHeader(request, response, next) {
	if (!request.headers.authorization) {
		response.status(401).end()
		return
	}

	next()
}

export function checkToken(request, response, next) {
	if (!request.headers.authorization.includes("Bearer")) {
		response.status(403).end()
		return
	}

	const token = request.headers.authorization.replace("Bearer ", "")

	if (!jwt.verify(token, process.env.TOKEN_SECRET)) {
		response.status(403).end()
		return
	}

	next()
}
