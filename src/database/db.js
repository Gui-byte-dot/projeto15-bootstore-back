import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URI);
const db = mongoClient.db(process.env.DATABASE_NAME);

try{
    await mongoClient.connect();
    console.log("MongoDB Connected");
}catch(err){
    console.log(err);
}
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const productCollection = db.collection("product");
export const purchaseCollection = db.collection("purcahse");
