import express from 'express';
import {createProject} from '../controllers/projectController.js';
import protectRoute from '../middleware/authenticateUser.js';
import {deleteProject} from "../controllers/deleteProjectController.js";
import { addTask } from '../controllers/taskController.js';
import { getProjectDetails } from '../controllers/getProjectDetails.js';



const router = express.Router();

router.post("/createproject",protectRoute,createProject);
router.delete("/deleteproject/:projectId",protectRoute,deleteProject);
router.post("/addtask/:ProjectID/:UserID",protectRoute,addTask);
router.get("/getprojectdetails/:ProjectID",protectRoute,getProjectDetails);

export default router;