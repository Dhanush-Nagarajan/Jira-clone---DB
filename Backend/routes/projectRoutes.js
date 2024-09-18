import express from 'express';
import {createProject} from '../controllers/projectController.js';
import protectRoute from '../middleware/authenticateUser.js';
import {deleteProject} from "../controllers/deleteProjectController.js";


const router = express.Router();

router.post("/createproject",protectRoute,createProject);
router.delete("/deleteproject/:projectId",protectRoute,deleteProject)

export default router;