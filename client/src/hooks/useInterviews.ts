
import { useState, useEffect } from 'react'
import { interviewAPI } from '@/api/interview.api'
import { Interview } from '@/types/api.types'
import toast from 'react-hot-toast'

export const useInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInterviews = async () => {
    try {
      setLoading(true)
      const response = await interviewAPI.getAll()
      if (response.success && response.data) {
        setInterviews(response.data.interviews || [])
      }
    } catch (err: any) {
      setError(err.message)
      toast.error('Failed to fetch interviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInterviews()
  }, [])

  const createInterview = async (data: any) => {
    try {
      const response = await interviewAPI.create(data)
      if (response.success) {
        toast.success('Interview created successfully')
        fetchInterviews()
        return true
      }
      return false
    } catch (err: unknown) {
      toast.error('Failed to create interview')
      return false
    }
  }

  const approveInterview = async (id: string) => {
    try {
      const response = await interviewAPI.approve(id)
      if (response.success) {
        toast.success('Interview approved')
        fetchInterviews()
      }
    } catch (err: unknown) {
      toast.error('Failed to approve interview')
    }
  }

  const rejectInterview = async (id: string) => {
    try {
      const response = await interviewAPI.reject(id)
      if (response.success) {
        toast.success('Interview rejected')
        fetchInterviews()
      }
    } catch (err: unknown) {
      toast.error('Failed to reject interview')
    }
  }

  return {
    interviews,
    loading,
    error,
    fetchInterviews,
    createInterview,
    approveInterview,
    rejectInterview
  }
}