import express from 'express';
import protectRoute from '../middleware/authenticateUser.js';
import { addMember } from '../controllers/addMemberController.js';

const router = express.Router();

router.post("/add/:projectId", protectRoute, addMember);

export default router;
