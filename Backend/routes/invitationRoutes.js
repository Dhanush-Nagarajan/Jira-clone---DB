import express from 'express';
import { inviteMember } from '../controllers/invitationController.js';
import { verifyInvitation } from '../controllers/invitationController.js';

const router = express.Router();

router.post('/:projectId', inviteMember);

export default router;
