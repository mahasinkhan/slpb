// src/controllers/contact.controller.ts
import { Request, Response } from 'express';
import contactService from '../services/contact.service';

class ContactController {
  async createContact(req: Request, res: Response): Promise<void> {
    try {
      const contact = await contactService.createContact(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Contact submission received successfully',
        data: contact
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to submit contact form'
      });
    }
  }

  async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const responded = req.query.responded === 'true';
      
      const result = await contactService.getAllContacts(page, limit, responded);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch contacts'
      });
    }
  }

  async getContactById(req: Request, res: Response): Promise<void> {
    try {
      const contact = await contactService.getContactById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: contact
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Contact not found'
      });
    }
  }

  async markAsResponded(req: Request, res: Response): Promise<void> {
    try {
      const contact = await contactService.markAsResponded(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Contact marked as responded',
        data: contact
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update contact'
      });
    }
  }

  async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const result = await contactService.deleteContact(req.params.id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete contact'
      });
    }
  }
}

export default new ContactController();