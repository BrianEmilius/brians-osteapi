import express from "express"
import { createPaymentType } from "./controllers/paymenttypes.js"
import { getAllProducts, createProduct, getSingleProduct, deleteProduct} from "./controllers/products.js"
import { createToken } from "./controllers/token.js"
import { createUser } from "./controllers/users.js"
import { checkHeader, checkToken } from "./middleware/authentication.js"
const Router = express.Router()

Router.get("/api/v1/products", getAllProducts)
Router.get("/api/v1/products/:query", getSingleProduct)
Router.post("/api/v1/products", createProduct)
Router.delete("/api/v1/products/:query", checkHeader, checkToken, deleteProduct)

Router.post("/api/v1/users", createUser)

Router.post("/api/v1/users/:id/payment-methods", createPaymentType)

Router.post("/auth/token", createToken)


export default Router
