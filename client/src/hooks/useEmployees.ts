// src/hooks/useEmployees.ts
import { useState, useEffect } from 'react'
import { employeeAPI } from '@/api/employee.api'
import { Employee } from '@/types/api.types'
import toast from 'react-hot-toast'

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await employeeAPI.getAll()
      if (response.success) {
        setEmployees(response.data || [])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const approveEmployee = async (id: string) => {
    try {
      const response = await employeeAPI.approve(id)
      if (response.success) {
        toast.success('Employee approved successfully')
        fetchEmployees()
      }
    } catch (err: unknown) {
      toast.error('Failed to approve employee')
    }
  }

  const rejectEmployee = async (id: string) => {
    try {
      const response = await employeeAPI.reject(id)
      if (response.success) {
        toast.success('Employee rejected')
        fetchEmployees()
      }
    } catch (err: unknown) {
      toast.error('Failed to reject employee')
    }
  }

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    approveEmployee,
    rejectEmployee
  }
}