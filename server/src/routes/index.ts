// src/routes/index.routes.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import employeeRoutes from './employe.routes';
import interviewRoutes from './interview.routes';
import contentRoutes from './content.routes';
import contactRoutes from './contact.routes';
import terminationRoutes from './termination.routes';

const router = Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/employees', employeeRoutes);
router.use('/interviews', interviewRoutes);
router.use('/content', contentRoutes);
router.use('/contact', contactRoutes);
router.use('/terminations', terminationRoutes);

export default router;