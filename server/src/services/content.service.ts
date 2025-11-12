// src/services/content.service.ts
import prisma from '../config/database';

interface CreateContentDTO {
  title: string;
  description?: string;
  type: string;
  slug: string;
  content: string;
  published?: boolean;
}

interface UpdateContentDTO {
  title?: string;
  description?: string;
  type?: string;
  slug?: string;
  content?: string;
  published?: boolean;
}

class ContentService {
  async createContent(data: CreateContentDTO, createdById: string) {
    const content = await prisma.content.create({
      data: {
        ...data,
        createdById
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return content;
  }

  async getAllContent(page: number = 1, limit: number = 10, published?: boolean) {
    const skip = (page - 1) * limit;

    const where = published !== undefined ? { published } : {};

    const [content, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: limit,
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.content.count({ where })
    ]);

    return {
      content,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getContentById(contentId: string) {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!content) {
      throw new Error('Content not found');
    }

    return content;
  }

  async getContentBySlug(slug: string) {
    const content = await prisma.content.findUnique({
      where: { slug },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!content) {
      throw new Error('Content not found');
    }

    return content;
  }

  async updateContent(contentId: string, data: UpdateContentDTO) {
    const content = await prisma.content.update({
      where: { id: contentId },
      data,
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return content;
  }

  async deleteContent(contentId: string) {
    await prisma.content.delete({
      where: { id: contentId }
    });

    return { message: 'Content deleted successfully' };
  }
}

export default new ContentService();