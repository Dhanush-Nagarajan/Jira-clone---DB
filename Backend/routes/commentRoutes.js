import express from 'express';

import {comment} from '../controllers/commentController.js';

// import protectRoute1 from '../middleware/authenticateUserProject.js';
import protectRoute from '../middleware/authenticateUser.js';



const router = express.Router();

router.post("/comments",protectRoute,comment)

export default router;