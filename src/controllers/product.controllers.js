import { productCollection } from "../database/db.js";

export async function GetProducts(req,res){
  try {
    const products = await productCollection.find({}).toArray()
    res.send(products)
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function AddProductCart(req,res) {

}