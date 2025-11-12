// src/services/contact.service.ts
import prisma from '../config/database';

interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

class ContactService {
  async createContact(data: CreateContactDTO) {
    const contact = await prisma.contactSubmission.create({
      data
    });

    return contact;
  }

  async getAllContacts(page: number = 1, limit: number = 10, responded?: boolean) {
    const skip = (page - 1) * limit;

    const where = responded !== undefined ? { responded } : {};

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contactSubmission.count({ where })
    ]);

    return {
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getContactById(contactId: string) {
    const contact = await prisma.contactSubmission.findUnique({
      where: { id: contactId }
    });

    if (!contact) {
      throw new Error('Contact not found');
    }

    return contact;
  }

  async markAsResponded(contactId: string) {
    const contact = await prisma.contactSubmission.update({
      where: { id: contactId },
      data: { responded: true }
    });

    return contact;
  }

  async deleteContact(contactId: string) {
    await prisma.contactSubmission.delete({
      where: { id: contactId }
    });

    return { message: 'Contact deleted successfully' };
  }
}

export default new ContactService();