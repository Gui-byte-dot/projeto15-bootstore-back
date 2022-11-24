import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js'

//#CONFIG

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(productRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}` );
});
