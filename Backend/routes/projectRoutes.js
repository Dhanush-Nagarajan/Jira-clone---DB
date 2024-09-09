import express from 'express';
import {createProject} from '../controllers/projectController.js';


const router = express.Router();

router.post("/createproject",createProject);

export default router;