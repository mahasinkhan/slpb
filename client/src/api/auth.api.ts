import api from './axios.config'
import { ApiResponse } from '../types/api.types'

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    status: string
  }
}

export const authAPI = {
  login: async (data: LoginData) => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', data)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get<ApiResponse<unknown>>('/auth/profile')
    return response.data
  },

  logout: async () => {
    const response = await api.post<ApiResponse<null>>('/auth/logout')
    return response.data
  }
}


