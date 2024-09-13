import express from 'express';
import protectRoute from '../middleware/authenticateUser.js';
import { getUsersForProject } from '../controllers/userController.js';

const router = express.Router();
router.get("/getusers",protectRoute,getUsersForProject);

export default router;