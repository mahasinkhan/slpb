import { Request, Response } from 'express';
import userService from '../services/user.service';

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await userService.getAllUsers(page, limit);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch users'
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'User not found'
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update user'
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.deleteUser(req.params.id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete user'
      });
    }
  }

  async hireEmployee(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.hireEmployee(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Employee hired successfully',
        data: user
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to hire employee'
      });
    }
  }

  async fireEmployee(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.fireEmployee(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Employee terminated successfully',
        data: user
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to terminate employee'
      });
    }
  }
}