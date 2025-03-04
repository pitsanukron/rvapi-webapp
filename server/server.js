import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!!!!!!!!!!!!!!!!!!"))
  .catch((err) => console.error(err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  });
  const Product = mongoose.model("Product", productSchema);
 
  app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Example</title>
            </head>
            <body>
                <p>This is an example of a simple HTML page with one paragraph.</p>
            </body>
        </html>
    `);
});
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products',async (req, res) =>  {
  const product = new Product(req.body);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!!!!!!!!!!!!`));