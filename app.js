import express from "express"
import "./mongodb.js"
import Router from "./router.js"
import bodyParser from "body-parser"
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(Router)

app.listen(1337, function(error) {
	if (error) {
		console.log("Error", error)
		process.exit(1)
	}
	console.log("Server is running on http://localhost:1337")
})