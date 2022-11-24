import { Router } from "express";

import { auth } from "../middlewares/auth.middleware.js";
import { SchemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { cartSchema } from "../models/product.model.js";
import { GetProducts, AddProductCart } from '../controllers/product.controllers.js'

const route= Router();

route.get("/products", auth, GetProducts);
route.post("/cart", [auth, SchemaValidation(cartSchema)], AddProductCart);

export default route; 
