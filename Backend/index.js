import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from "./routes/authRoutes.js"
import ProjectRoutes from "./routes/projectRoutes.js"
import addUser from "./routes/addMemberRoutes.js"
import getUsers from "./routes/userRoutes.js";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 2000;

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));

app.use ("/api/auth", authRoutes);
app.use ("/api/projects", ProjectRoutes);
app.use ("/api/projects", addUser);
app.use ("/api/projects", getUsers);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server started at port ${PORT}`);
});
