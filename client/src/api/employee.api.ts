// src/api/employee.api.ts
import api from './axios.config'
import { ApiResponse, Employee } from '../types/api.types'

export const employeeAPI = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Employee[]>>('/employees')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Employee>>(`/employees/${id}`)
    return response.data
  },

  getPending: async () => {
    const response = await api.get<ApiResponse<Employee[]>>('/employees/pending')
    return response.data
  },

  approve: async (id: string) => {
    const response = await api.patch<ApiResponse<Employee>>(`/employees/${id}/approve`)
    return response.data
  },

  reject: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/employees/${id}/reject`)
    return response.data
  },

  getStats: async () => {
    const response = await api.get<ApiResponse<unknown>>('/employees/stats')
    return response.data
  }
}