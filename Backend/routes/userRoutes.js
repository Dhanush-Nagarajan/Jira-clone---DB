import express from 'express';
import protectRoute from '../middleware/authenticateUser.js';
import { getUsersForProject } from '../controllers/userController.js';
import { GetProjectForUser } from '../controllers/getProjectController.js';

const router = express.Router();
router.get("/getusers",protectRoute,getUsersForProject);
router.get("/getprojects",protectRoute,GetProjectForUser);

export default router;