import { productCollection, cartsCollection, purchasesCollection } from "../database/db.js";


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
      await cartsCollection.updateOne({ _id: cart._id }, { $push: { "products": {
        _id: id,
        name,
        description,
        price,
        img,
      } } })
    } else{
      const product = await cartsCollection.findOne({ _id: cart._id, products: { $elemMatch: {_id: id}}})
      if(product !== null) {
        res.status(400).send({ message: 'product already in cart' });
      }else{
        await cartsCollection.insertOne({ products:[{
          _id: id,
          name,
          description,
          price,
          img,
        }], userId: req.user._id })
      }
    }
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
  
}

export async function Checkout (req,res){
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