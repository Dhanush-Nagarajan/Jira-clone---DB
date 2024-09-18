import express from 'express';
import protectRoute1 from '../middleware/authenticateUserProject.js';
import { getUsersForProject } from '../controllers/userController.js';
import { GetProjectForUser } from '../controllers/getProjectController.js';

const router = express.Router();
router.get("/getusers",protectRoute1,getUsersForProject);
router.get("/getprojects",protectRoute1,GetProjectForUser);

export default router;