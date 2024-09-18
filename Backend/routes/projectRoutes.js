import express from 'express';
import {createProject} from '../controllers/projectController.js';
import protectRoute1 from '../middleware/authenticateUserProject.js';
import {deleteProject} from "../controllers/deleteProjectController.js";


const router = express.Router();

router.post("/createproject",protectRoute1,createProject);
router.delete("/deleteproject/:projectId",protectRoute1,deleteProject)

export default router;