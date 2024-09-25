import express from 'express';

import {addcomment} from '../controllers/commentController.js';

import protectRoute from '../middleware/authenticateUser.js';


const router = express.Router();

router.post("/comments/:TaskID",protectRoute,addcomment)

export default router;