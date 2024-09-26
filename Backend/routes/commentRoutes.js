import express from 'express';
import {addcomment} from '../controllers/commentController.js';
import protectRoute from '../middleware/authenticateUser.js';
import { getComments } from '../controllers/getCommentsController.js';

const router = express.Router();

router.post("/comments/:TaskID",protectRoute,addcomment);
router.get("/fetchcomments/:TaskID",protectRoute,getComments);

export default router;