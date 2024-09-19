import express from 'express';
import protectRoute from '../middleware/authenticateUser.js';
import { getUsersForProject } from '../controllers/userController.js';
import { GetProjectForUser } from '../controllers/getProjectController.js';
import { getLead } from '../controllers/getLeadController.js';
import { getParticipants } from '../controllers/getParticpantsController.js';

const router = express.Router();
router.get("/getusers/:ProjectID",protectRoute,getUsersForProject);
router.get("/getprojects",protectRoute,GetProjectForUser);
router.get("/getlead/:userID",protectRoute,getLead);
router.get("/getparticipants/:ProjectID",protectRoute,getParticipants);

export default router;