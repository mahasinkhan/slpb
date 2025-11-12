import { Router } from 'express';
import { InterviewController } from '../controllers/interview.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const interviewController = new InterviewController();

// Make sure this route exists!
router.get('/:id', interviewController.getInterviewById);

// Other routes
router.post('/', authenticate, interviewController.createInterview);
router.get('/', interviewController.getAllInterviews);
router.put('/:id', authenticate, interviewController.updateInterview);
router.patch('/:id/approve', authenticate, authorize(['ADMIN', 'SUPERADMIN']), interviewController.approveInterview);
router.patch('/:id/reject', authenticate, authorize(['ADMIN', 'SUPERADMIN']), interviewController.rejectInterview);
router.delete('/:id', authenticate, authorize(['ADMIN', 'SUPERADMIN']), interviewController.deleteInterview);

export default router;