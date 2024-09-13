import express from 'express';
import {createProject} from '../controllers/projectController.js';
import protectRoute1 from '../middleware/authenticateUserProject.js';

const router = express.Router();

router.post("/createproject",protectRoute1,createProject);

export default router;