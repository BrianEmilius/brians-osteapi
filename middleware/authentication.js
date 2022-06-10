export function checkHeader(request, response, next) {
	if (!request.headers.authorization) {
		response.status(401).end()
		return
	}

	next()
}

export function checkToken(request, response, next) {
	if(request.headers.authorization !== "Bearer ostergud") {
		response.status(403).end()
		return
	}

	next()
}
