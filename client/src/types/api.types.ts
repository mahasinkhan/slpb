export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'SUPERADMIN' | 'ADMIN' | 'EMPLOYEE'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'TERMINATED'
  createdAt: string
  updatedAt: string
}

export interface Interview {
  id: string
  candidateId: string
  interviewerId?: string
  position: string
  division: string
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'APPROVED' | 'REJECTED'
  scheduledAt?: string
  notes?: string
  feedback?: string
  createdAt: string
  candidate?: User
  interviewer?: User
}

export interface Employee {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  status: string
  phone?: string
  createdAt: string
}