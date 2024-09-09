import express from 'express';
import {createProject} from '../controllers/projectController.js';
import protectRoute from '../middleware/authenticateUser.js';


const router = express.Router();

router.post("/createproject",protectRoute,createProject);

export default router;