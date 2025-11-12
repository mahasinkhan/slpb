import { Request, Response } from 'express';
import interviewService from '../services/interview.service';
import { AuthRequest } from '../types';

export class InterviewController {
  async createInterview(req: AuthRequest, res: Response): Promise<void> {
    try {
      const interview = await interviewService.createInterview(
        req.body,
        req.user?.id
      );
      
      res.status(201).json({
        success: true,
        message: 'Interview created successfully',
        data: interview
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create interview'
      });
    }
  }

  async getAllInterviews(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await interviewService.getAllInterviews(page, limit);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch interviews'
      });
    }
  }

  async getInterviewById(req: Request, res: Response): Promise<void> {
    try {
      const interview = await interviewService.getInterviewById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: interview
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Interview not found'
      });
    }
  }

  async updateInterview(req: Request, res: Response): Promise<void> {
    try {
      const interview = await interviewService.updateInterview(
        req.params.id,
        req.body
      );
      
      res.status(200).json({
        success: true,
        message: 'Interview updated successfully',
        data: interview
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update interview'
      });
    }
  }

  async approveInterview(req: AuthRequest, res: Response): Promise<void> {
    try {
      const interview = await interviewService.approveInterview(
        req.params.id,
        req.user!.id
      );
      
      res.status(200).json({
        success: true,
        message: 'Interview approved successfully',
        data: interview
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to approve interview'
      });
    }
  }

  async rejectInterview(req: Request, res: Response): Promise<void> {
    try {
      const interview = await interviewService.rejectInterview(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Interview rejected',
        data: interview
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to reject interview'
      });
    }
  }

  async deleteInterview(req: Request, res: Response): Promise<void> {
    try {
      const result = await interviewService.deleteInterview(req.params.id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete interview'
      });
    }
  }
}