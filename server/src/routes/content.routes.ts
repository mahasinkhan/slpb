// src/routes/content.routes.ts
import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/roleCheck.middleware';
import { Role } from '@prisma/client';

const router = Router();
const contentController = new ContentController();

// Public routes
router.get('/', (req, res) => contentController.getAllContent(req, res));
router.get('/:id', (req, res) => contentController.getContentById(req, res));
router.get('/slug/:slug', (req, res) => contentController.getContentBySlug(req, res));

// Protected routes - SUPERADMIN can manage all content
router.post(
  '/',
  authenticate,
  checkRole(Role.SUPERADMIN),
  (req, res) => contentController.createContent(req, res)
);

router.put(
  '/:id',
  authenticate,
  checkRole(Role.SUPERADMIN),
  (req, res) => contentController.updateContent(req, res)
);

router.delete(
  '/:id',
  authenticate,
  checkRole(Role.SUPERADMIN),
  (req, res) => contentController.deleteContent(req, res)
);

export default router;