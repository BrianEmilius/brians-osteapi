import express from "express"
import { getAllProducts, createProduct, getSingleProduct, deleteProduct} from "./controllers/products.js"
import { checkHeader, checkToken } from "./middleware/authentication.js"
const Router = express.Router()

Router.get("/api/v1/products", getAllProducts)
Router.get("/api/v1/products/:query", getSingleProduct)
Router.post("/api/v1/products", createProduct)
Router.delete("/api/v1/products/:query", checkHeader, checkToken, deleteProduct)

export default Router
