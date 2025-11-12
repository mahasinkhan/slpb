import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/roleCheck.middleware';
import { Role } from '@prisma/client';

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

// Get all users (SUPERADMIN and ADMIN only)
router.get(
  '/',
  checkRole(Role.SUPERADMIN, Role.ADMIN),
  (req, res) => userController.getAllUsers(req, res)
);

// Get user by ID (SUPERADMIN and ADMIN only)
router.get(
  '/:id',
  checkRole(Role.SUPERADMIN, Role.ADMIN),
  (req, res) => userController.getUserById(req, res)
);

// Update user (SUPERADMIN and ADMIN only)
router.put(
  '/:id',
  checkRole(Role.SUPERADMIN, Role.ADMIN),
  (req, res) => userController.updateUser(req, res)
);

// Delete user (SUPERADMIN only)
router.delete(
  '/:id',
  checkRole(Role.SUPERADMIN),
  (req, res) => userController.deleteUser(req, res)
);

// Hire employee (SUPERADMIN only - after admin approval)
router.patch(
  '/:id/hire',
  checkRole(Role.SUPERADMIN),
  (req, res) => userController.hireEmployee(req, res)
);

// Fire employee (SUPERADMIN only)
router.patch(
  '/:id/fire',
  checkRole(Role.SUPERADMIN),
  (req, res) => userController.fireEmployee(req, res)
);

export default router;