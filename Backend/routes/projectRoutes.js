import express from 'express';
import {createProject} from '../controllers/projectController.js';
import {comment} from '../controllers/projectController.js';

import protectRoute from '../middleware/authenticateUser.js';


const router = express.Router();

router.post("/createproject",protectRoute,createProject);
router.post("/comments",protectRoute,comment)

export default router;