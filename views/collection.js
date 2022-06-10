export function collectionView({response, products: data, url, count}) {
	const view = {
		count,
		next: nextLink(url, count),
		results: data
	}
	return response.json(view)
}

function nextLink(url, count) {
	const temp = new URL(url)
	const limit = temp.searchParams.get("limit")
	const offset = temp.searchParams.get("offset")
	
	const newOffset = parseInt(offset) + parseInt(limit)

	if (newOffset > count -1) {
		return null
	}
	
	temp.searchParams.set("offset", newOffset)
	return temp.toString()
}