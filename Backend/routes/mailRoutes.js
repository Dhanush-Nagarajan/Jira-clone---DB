import express from 'express';
import protectRoute from '../middleware/authenticateUser.js';
import { sendMail } from '../controllers/sendMailController.js';

const router = express.Router();
router.post("/sendmail",protectRoute,sendMail);

export default router;