import Product from "../models/productmodel.js"
import { collectionView } from "../views/collection.js"

export async function getAllProducts(request, response) {
	const limit = request.query.limit || 5
	const offset = request.query.offset || 0
	const products = await Product.find().skip(offset).limit(limit)
	const count = await Product.countDocuments()
	let url = `${request.protocol}://${request.headers.host}${request.originalUrl}`

	if (!url.includes("?")) {
		url += `?offset=${offset}&limit=${limit}`
	}

	collectionView({response, products, count, url})
}

export async function getSingleProduct(request, response) {
	try {
		const product = await Product.findById(request.params.query)
	
		if (!product) {
			response.status(404)
			response.end()
			return
		}
	
		response.json(product)
	}
	catch(error) {
		const product = await Product.findOne({ name: request.params.query })

		if (!product) {
			response.status(404)
			response.end()
			return
		}
	
		response.json(product)
	}
}

export async function createProduct(request, response) {
	const newProduct = new Product()
	newProduct.name = request.body.name
	newProduct.price = request.body.price
	newProduct.description = request.body.description

	const result = await newProduct.save()
	response.status(201)
	response.json(result)
}

export async function deleteProduct(request, response) {
	try {
		const product = await Product.findByIdAndRemove(request.params.query)

		if (!product) {
			response.status(404).end()
			return
		}
	
		response.status(204).end()
	}
	catch(error) {
		const product = await Product.findOneAndRemove({ name: request.params.query })

		if (!product) {
			response.status(404).end()
			return
		}
	
		response.status(204).end()
	}
}
