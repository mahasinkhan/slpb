// src/services/employee.service.ts
import prisma from '../config/database';
import { EmploymentStatus } from '@prisma/client';

class EmployeeService {
  async getAllEmployees(page: number = 1, limit: number = 10, status?: string) {
    const skip = (page - 1) * limit;

    const where = status ? { status: status as EmploymentStatus } : {};

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              role: true,
              status: true
            }
          },
          hiredBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.employee.count({ where })
    ]);

    return {
      employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getEmployeeById(employeeId: string) {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            status: true
          }
        },
        hiredBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        termination: true
      }
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async getPendingApprovals() {
    const employees = await prisma.employee.findMany({
      where: {
        status: EmploymentStatus.INACTIVE
      },
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
      },
      orderBy: { createdAt: 'asc' }
    });

    return employees;
  }

  async approveEmployee(employeeId: string, approvedById: string) {
    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        status: EmploymentStatus.ACTIVE,
        hiredById: approvedById,
        hiredAt: new Date()
      },
      include: {
        user: true
      }
    });

    // Update user status as well
    await prisma.user.update({
      where: { id: employee.userId },
      data: {
        status: EmploymentStatus.ACTIVE
      }
    });

    return employee;
  }

  async rejectEmployee(employeeId: string) {
    await prisma.employee.delete({
      where: { id: employeeId }
    });

    return { message: 'Employee rejected and removed from system' };
  }

  async updateEmployeeStatus(employeeId: string, status: EmploymentStatus) {
    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: { status },
      include: {
        user: true
      }
    });

    // Update user status as well
    await prisma.user.update({
      where: { id: employee.userId },
      data: { status }
    });

    return employee;
  }

  async getEmployeeStats() {
    const [total, active, inactive, suspended, terminated] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: EmploymentStatus.ACTIVE } }),
      prisma.employee.count({ where: { status: EmploymentStatus.INACTIVE } }),
      prisma.employee.count({ where: { status: EmploymentStatus.SUSPENDED } }),
      prisma.employee.count({ where: { status: EmploymentStatus.TERMINATED } })
    ]);

    return {
      total,
      active,
      inactive,
      suspended,
      terminated
    };
  }
}

export default new EmployeeService();