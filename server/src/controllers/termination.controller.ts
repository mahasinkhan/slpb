// src/controllers/termination.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../types';
import terminationService from '../services/termination.service';

class TerminationController {
  async terminateEmployee(req: AuthRequest, res: Response): Promise<void> {
    try {
      const termination = await terminationService.terminateEmployee(
        req.body.employeeId,
        req.body.reason,
        req.user!.id,
        req.body.notes
      );
      
      res.status(201).json({
        success: true,
        message: 'Employee terminated successfully',
        data: termination
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to terminate employee'
      });
    }
  }

  async getAllTerminations(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await terminationService.getAllTerminations(page, limit);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch terminations'
      });
    }
  }

  async getTerminationById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const termination = await terminationService.getTerminationById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: termination
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Termination record not found'
      });
    }
  }

  async deleteTermination(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await terminationService.deleteTermination(req.params.id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete termination'
      });
    }
  }
}

export default new TerminationController();