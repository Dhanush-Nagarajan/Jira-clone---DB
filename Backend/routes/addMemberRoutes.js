import express from 'express';
import protectRoute1 from '../middleware/authenticateUserProject.js';
import { addMember } from '../controllers/addMemberController.js';

const router = express.Router();

router.post("/add/:projectId/:newUserId", protectRoute1, addMember);

export default router;
