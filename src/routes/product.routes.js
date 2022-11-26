import { Router } from "express";

import { auth } from "../middlewares/auth.middleware.js";
import { SchemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { cartSchema, purchaseSchema } from "../models/product.model.js";
import { GetProducts, AddProductCart,Checkout, Logout } from '../controllers/product.controllers.js'

const route= Router();

route.get("/products", auth, GetProducts);
route.post("/cart", [auth, SchemaValidation(cartSchema)], AddProductCart);
route.post("/purchases", [auth, SchemaValidation(purchaseSchema)], Checkout);
route.post("/logout", auth,Logout);


export default route; 
