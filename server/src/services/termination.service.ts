// src/services/termination.service.ts
import prisma from '../config/database';
import { EmploymentStatus } from '@prisma/client';

class TerminationService {
  async terminateEmployee(
    employeeId: string,
    reason: string,
    terminatedBy: string,
    notes?: string
  ) {
    // First, check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId }
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    // Create termination record
    const termination = await prisma.employeeTermination.create({
      data: {
        employeeId,
        reason,
        terminatedBy,
        notes
      },
      include: {
        employee: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    // Update employee status
    await prisma.employee.update({
      where: { id: employeeId },
      data: { status: EmploymentStatus.TERMINATED }
    });

    // Update user status
    await prisma.user.update({
      where: { id: employee.userId },
      data: { status: EmploymentStatus.TERMINATED }
    });

    return termination;
  }

  async getAllTerminations(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [terminations, total] = await Promise.all([
      prisma.employeeTermination.findMany({
        skip,
        take: limit,
        include: {
          employee: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        },
        orderBy: { terminatedAt: 'desc' }
      }),
      prisma.employeeTermination.count()
    ]);

    return {
      terminations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getTerminationById(terminationId: string) {
    const termination = await prisma.employeeTermination.findUnique({
      where: { id: terminationId },
      include: {
        employee: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true
              }
            }
          }
        }
      }
    });

    if (!termination) {
      throw new Error('Termination record not found');
    }

    return termination;
  }

  async deleteTermination(terminationId: string) {
    await prisma.employeeTermination.delete({
      where: { id: terminationId }
    });

    return { message: 'Termination record deleted successfully' };
  }
}

export default new TerminationService();