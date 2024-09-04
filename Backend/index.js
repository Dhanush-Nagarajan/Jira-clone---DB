import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use ("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server started at port ${PORT}`);
});
