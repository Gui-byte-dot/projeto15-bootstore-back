import { ObjectID } from "bson";
import { productCollection, cartsCollection, purchasesCollection, sessionsCollection } from "../database/db.js";


export async function GetProducts(req,res){
  try {
    const products = await productCollection.find({}).toArray()
    res.send(products)
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function AddProductCart(req,res) {
  try {
    const {
      id,
      name,
      description,
      price,
      img,
    }= req.body

    const cart = await cartsCollection.findOne({userId:req.user._id})
    if(cart!== null){
      const product = await productCollection.findOne({_id: ObjectID(id)})
      if(product !== null){
        await cartsCollection.updateOne({ _id: cart._id }, { $push: { "products": {
          _id: id,
          name,
          description,
          price,
          img,
        } } })
      }else {
        return res.status(400).send("product not found")
      }
    } else{
      await cartsCollection.insertOne({ products:[{
          _id: id,
          name,
          description,
          price,
          img,
        }], userId: req.user._id })
    }
    res.send()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
  
}

export async function GetUserCart(req,res){
  try {
    const userCart = await cartsCollection.findOne({userId: req.user._id})
    if(userCart !== null){
      delete userCart._id
      delete userCart.userId
      let productList = userCart?.products;
      
      if(userCart !== null) {
        productList = productList.reduce((list, cartProduct) => {
          cartProduct.id = cartProduct._id;
          delete cartProduct._id;
          list.push(cartProduct)
          return list
        }, [])
      }

      res.send(productList);
    }else{
      res.send([])
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export async function Checkout(req,res){
  try {
    const { products } = req.body;
    await purchasesCollection.insertOne({products: products, userId: req.user._id});
    await cartsCollection.deleteOne({ userId: req.user._id});
    res.send();
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export async function Logout(req,res){
  try{
    const token = req.header('Authorization');
    await sessionsCollection.deleteOne({token, userId:req.user._id});
    res.send()
  }catch(err){
    console.log(err);
  }
}