// src/controllers/employee.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../types';
import employeeService from '../services/employee.service';

class EmployeeController {
  async getAllEmployees(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      
      const result = await employeeService.getAllEmployees(page, limit, status);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch employees'
      });
    }
  }

  async getEmployeeById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: employee
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Employee not found'
      });
    }
  }

  async getPendingApprovals(req: AuthRequest, res: Response): Promise<void> {
    try {
      const employees = await employeeService.getPendingApprovals();
      
      res.status(200).json({
        success: true,
        data: employees
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch pending approvals'
      });
    }
  }

  async approveEmployee(req: AuthRequest, res: Response): Promise<void> {
    try {
      const employee = await employeeService.approveEmployee(
        req.params.id,
        req.user!.id
      );
      
      res.status(200).json({
        success: true,
        message: 'Employee approved successfully',
        data: employee
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to approve employee'
      });
    }
  }

  async rejectEmployee(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await employeeService.rejectEmployee(req.params.id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to reject employee'
      });
    }
  }

  async updateEmployeeStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const employee = await employeeService.updateEmployeeStatus(
        req.params.id,
        req.body.status
      );
      
      res.status(200).json({
        success: true,
        message: 'Employee status updated successfully',
        data: employee
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update employee status'
      });
    }
  }

  async getEmployeeStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      const stats = await employeeService.getEmployeeStats();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch employee statistics'
      });
    }
  }
}

export default new EmployeeController();