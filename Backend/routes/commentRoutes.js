import express from 'express';

import {addcomment} from '../controllers/commentController.js';

import protectRoute1 from '../middleware/authenticateUserProject.js';


const router = express.Router();

router.post("/comments",protectRoute1,addcomment)

export default router;