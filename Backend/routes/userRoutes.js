import express from 'express';
import protectRoute1 from '../middleware/authenticateUserProject.js';
import { getUsersForProject } from '../controllers/userController.js';

const router = express.Router();
router.get("/getusers",protectRoute1,getUsersForProject);

export default router;