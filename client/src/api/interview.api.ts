// src/api/interview.api.ts
import api from './axios.config'
import { ApiResponse, Interview } from '../types/api.types'

interface CreateInterviewData {
  candidateId: string
  position: string
  division: string
  scheduledAt?: string
  notes?: string
}

export const interviewAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get<ApiResponse<{
      interviews: Interview[]
      pagination: unknown
    }>>(`/interviews?page=${page}&limit=${limit}`)
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Interview>>(`/interviews/${id}`)
    return response.data
  },

  create: async (data: CreateInterviewData) => {
    const response = await api.post<ApiResponse<Interview>>('/interviews', data)
    return response.data
  },

  update: async (id: string, data: Partial<CreateInterviewData>) => {
    const response = await api.put<ApiResponse<Interview>>(`/interviews/${id}`, data)
    return response.data
  },

  approve: async (id: string) => {
    const response = await api.patch<ApiResponse<Interview>>(`/interviews/${id}/approve`)
    return response.data
  },

  reject: async (id: string) => {
    const response = await api.patch<ApiResponse<Interview>>(`/interviews/${id}/reject`)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/interviews/${id}`)
    return response.data
  }
}