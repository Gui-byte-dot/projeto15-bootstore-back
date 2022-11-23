import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from "uuid";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}` );
});

/// New Commenter