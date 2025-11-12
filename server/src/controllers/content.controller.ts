// src/controllers/content.controller.ts
import { Request, Response } from 'express';
import contentService from '../services/content.service';
import { AuthRequest } from '../types';

export class ContentController {
  async createContent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const content = await contentService.createContent(
        req.body,
        req.user!.id
      );
      
      res.status(201).json({
        success: true,
        message: 'Content created successfully',
        data: content
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create content'
      });
    }
  }

  async getAllContent(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const published = req.query.published === 'true';
      
      const result = await contentService.getAllContent(page, limit, published);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch content'
      });
    }
  }

  async getContentById(req: Request, res: Response): Promise<void> {
    try {
      const content = await contentService.getContentById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: content
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Content not found'
      });
    }
  }

  async getContentBySlug(req: Request, res: Response): Promise<void> {
    try {
      const content = await contentService.getContentBySlug(req.params.slug);
      
      res.status(200).json({
        success: true,
        data: content
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Content not found'
      });
    }
  }

  async updateContent(req: Request, res: Response): Promise<void> {
    try {
      const content = await contentService.updateContent(
        req.params.id,
        req.body
      );
      
      res.status(200).json({
        success: true,
        message: 'Content updated successfully',
        data: content
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update content'
      });
    }
  }

  async deleteContent(req: Request, res: Response): Promise<void> {
    try {
      const result = await contentService.deleteContent(req.params.id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete content'
      });
    }
  }
}