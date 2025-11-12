import { Request } from 'express';
import { Role, InterviewStatus, EmploymentStatus } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateInterviewDTO {
  candidateId: string;
  position: string;
  division: string;
  scheduledAt?: Date;
  notes?: string;
}

export interface UpdateInterviewDTO {
  status?: InterviewStatus;
  scheduledAt?: Date;
  notes?: string;
  feedback?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: Role;
  status?: EmploymentStatus;
}