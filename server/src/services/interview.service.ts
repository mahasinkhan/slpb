import prisma from '../config/database';
import { CreateInterviewDTO, UpdateInterviewDTO } from '../types';
import { InterviewStatus } from '@prisma/client';

class InterviewService {
  async createInterview(data: CreateInterviewDTO, interviewerId?: string) {
    const interview = await prisma.interview.create({
      data: {
        candidateId: data.candidateId,
        interviewerId,
        position: data.position,
        division: data.division,
        scheduledAt: data.scheduledAt,
        notes: data.notes
      },
      include: {
        candidate: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        interviewer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return interview;
  }

  async getAllInterviews(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      prisma.interview.findMany({
        skip,
        take: limit,
        include: {
          candidate: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          },
          interviewer: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.interview.count()
    ]);

    return {
      interviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getInterviewById(interviewId: string) {
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        candidate: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        },
        interviewer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!interview) {
      throw new Error('Interview not found');
    }

    return interview;
  }

  async updateInterview(interviewId: string, data: UpdateInterviewDTO) {
    const interview = await prisma.interview.update({
      where: { id: interviewId },
      data,
      include: {
        candidate: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        interviewer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return interview;
  }

  async approveInterview(interviewId: string, approvedBy: string) {
    const interview = await prisma.interview.update({
      where: { id: interviewId },
      data: {
        status: InterviewStatus.APPROVED,
        approvedBy,
        approvedAt: new Date()
      },
      include: {
        candidate: true
      }
    });

    return interview;
  }

  async rejectInterview(interviewId: string) {
    const interview = await prisma.interview.update({
      where: { id: interviewId },
      data: {
        status: InterviewStatus.REJECTED
      },
      include: {
        candidate: true
      }
    });

    return interview;
  }

  async deleteInterview(interviewId: string) {
    await prisma.interview.delete({
      where: { id: interviewId }
    });

    return { message: 'Interview deleted successfully' };
  }
}

export default new InterviewService();