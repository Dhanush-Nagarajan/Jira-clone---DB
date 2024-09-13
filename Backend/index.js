import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from "./routes/authRoutes.js"
import ProjectRoutes from "./routes/projectRoutes.js"
import addUser from "./routes/addMemberRoutes.js"

const app = express();
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 2000;

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};
  
app.use(cors(corsOptions));

app.use ("/api/auth", authRoutes);
app.use ("/api/projects", ProjectRoutes);
app.use ("/api/projects", addUser);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server started at port ${PORT}`);
});
