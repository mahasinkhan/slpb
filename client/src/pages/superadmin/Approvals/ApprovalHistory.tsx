import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Filter,
  Search,
  Download,
  Calendar,
  User,
  FileText,
  DollarSign,
  Shield,
  Users,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  MessageSquare
} from 'lucide-react'

const ApprovalHistory = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [dateRange, setDateRange] = useState('30days')

  const approvals = [
    {
      id: 'APR-001',
      type: 'expense_claim',
      title: 'Travel Expenses - Client Meeting',
      submitter: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      approver: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      amount: '£1,450.00',
      status: 'approved',
      submittedDate: '2025-11-08',
      approvedDate: '2025-11-09',
      notes: 'All receipts verified. Travel to London for client presentation.',
      priority: 'medium'
    },
    {
      id: 'APR-002',
      type: 'user_access',
      title: 'Grant Admin Access - Emma Wilson',
      submitter: {
        name: 'James Brown',
        email: 'james.b@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=7'
      },
      approver: {
        name: 'Super Admin',
        email: 'admin@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      amount: null,
      status: 'approved',
      submittedDate: '2025-11-07',
      approvedDate: '2025-11-07',
      notes: 'Promoted to team lead position. Requires admin access.',
      priority: 'high'
    },
    {
      id: 'APR-003',
      type: 'content_publish',
      title: 'Blog Post: "Future of AI in Business"',
      submitter: {
        name: 'Lisa Anderson',
        email: 'lisa.a@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=9'
      },
      approver: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      amount: null,
      status: 'rejected',
      submittedDate: '2025-11-06',
      approvedDate: '2025-11-08',
      notes: 'Content needs revision. Please address the feedback comments.',
      priority: 'low'
    },
    {
      id: 'APR-004',
      type: 'purchase_order',
      title: 'Office Equipment Purchase',
      submitter: {
        name: 'David Martinez',
        email: 'david.m@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      approver: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      amount: '£3,200.00',
      status: 'approved',
      submittedDate: '2025-11-05',
      approvedDate: '2025-11-06',
      notes: 'Approved for Q4 budget. 5 new workstations for expanding team.',
      priority: 'high'
    },
    {
      id: 'APR-005',
      type: 'leave_request',
      title: 'Annual Leave - 2 Weeks',
      submitter: {
        name: 'Emma Wilson',
        email: 'emma.w@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      approver: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      amount: null,
      status: 'approved',
      submittedDate: '2025-11-04',
      approvedDate: '2025-11-05',
      notes: 'Approved for December 20 - January 3.',
      priority: 'medium'
    },
    {
      id: 'APR-006',
      type: 'expense_claim',
      title: 'Software License Renewal',
      submitter: {
        name: 'James Brown',
        email: 'james.b@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=7'
      },
      approver: {
        name: 'Super Admin',
        email: 'admin@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      amount: '£899.00',
      status: 'rejected',
      submittedDate: '2025-11-03',
      approvedDate: '2025-11-04',
      notes: 'License not due for renewal until Q1 2026.',
      priority: 'low'
    },
    {
      id: 'APR-007',
      type: 'budget_increase',
      title: 'Marketing Budget Increase Request',
      submitter: {
        name: 'Lisa Anderson',
        email: 'lisa.a@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=9'
      },
      approver: {
        name: 'Super Admin',
        email: 'admin@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      amount: '£15,000.00',
      status: 'approved',
      submittedDate: '2025-11-01',
      approvedDate: '2025-11-02',
      notes: 'Approved for Q4 campaign. Strong ROI projection provided.',
      priority: 'high'
    },
    {
      id: 'APR-008',
      type: 'user_access',
      title: 'Remove Access - Contractor',
      submitter: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      approver: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      amount: null,
      status: 'approved',
      submittedDate: '2025-10-30',
      approvedDate: '2025-10-30',
      notes: 'Contract ended. All access revoked immediately.',
      priority: 'high'
    }
  ]

  const stats = [
    {
      label: 'Total Approvals',
      value: '156',
      change: '+23',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Approved',
      value: '142',
      change: '+18',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Rejected',
      value: '14',
      change: '+5',
      icon: XCircle,
      color: 'from-red-500 to-red-600'
    },
    {
      label: 'Avg Response',
      value: '1.2 days',
      change: '-0.3d',
      icon: Clock,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const approvalsByType = [
    { type: 'Expense Claims', count: 45, percentage: 29, color: 'blue' },
    { type: 'User Access', count: 38, percentage: 24, color: 'green' },
    { type: 'Content Publish', count: 32, percentage: 21, color: 'purple' },
    { type: 'Purchase Orders', count: 25, percentage: 16, color: 'orange' },
    { type: 'Leave Requests', count: 16, percentage: 10, color: 'pink' }
  ]

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = 
      approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.submitter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || approval.status === filterStatus
    const matchesType = filterType === 'all' || approval.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-green-100 text-green-700 border-green-300',
      rejected: 'bg-red-100 text-red-700 border-red-300',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    }
    return styles[status] || styles.pending
  }

  const getTypeIcon = (type) => {
    const icons = {
      expense_claim: DollarSign,
      user_access: Shield,
      content_publish: FileText,
      purchase_order: FileText,
      leave_request: Calendar,
      budget_increase: TrendingUp
    }
    return icons[type] || FileText
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-orange-600',
      low: 'text-blue-600'
    }
    return colors[priority] || colors.medium
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 flex items-center">
              <CheckCircle className="mr-3 text-green-600" size={36} />
              Approval History
            </h1>
            <p className="text-gray-600">View all approval decisions and their details</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-green-600">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Approvals by Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="mr-2 text-blue-600" size={24} />
            By Type
          </h2>
          <div className="space-y-4">
            {approvalsByType.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{item.type}</span>
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: idx * 0.1 + 0.5, duration: 0.8 }}
                    className={`h-full bg-${item.color}-500`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Search */}
            <div className="sm:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search approvals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="expense_claim">Expense Claims</option>
              <option value="user_access">User Access</option>
              <option value="content_publish">Content Publish</option>
              <option value="purchase_order">Purchase Orders</option>
              <option value="leave_request">Leave Requests</option>
            </select>
          </div>
        </motion.div>
      </div>

      {/* Approvals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="mr-2 text-purple-600" size={28} />
          Approval Records
        </h2>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredApprovals.map((approval, idx) => {
              const TypeIcon = getTypeIcon(approval.type)
              return (
                <motion.div
                  key={approval.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedApproval(approval)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Left Section */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="text-gray-600" size={24} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-gray-500">{approval.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusBadge(approval.status)}`}>
                            {approval.status.toUpperCase()}
                          </span>
                          <AlertCircle className={`${getPriorityColor(approval.priority)}`} size={16} />
                        </div>

                        <h3 className="font-bold text-gray-900 mb-1">{approval.title}</h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {approval.submitter.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {approval.submittedDate}
                          </span>
                          {approval.amount && (
                            <span className="flex items-center gap-1 font-semibold text-green-600">
                              <DollarSign size={14} />
                              {approval.amount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3 lg:flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={approval.approver.avatar}
                          alt={approval.approver.name}
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                        />
                        <div className="hidden sm:block">
                          <p className="text-xs text-gray-600">Approved by</p>
                          <p className="text-sm font-semibold text-gray-900">{approval.approver.name}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredApprovals.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-semibold">No approvals found</p>
          </div>
        )}
      </motion.div>

      {/* Approval Detail Modal */}
      <AnimatePresence>
        {selectedApproval && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApproval(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-gray-500">{selectedApproval.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusBadge(selectedApproval.status)}`}>
                        {selectedApproval.status.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedApproval.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedApproval(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Submitter & Approver */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <p className="text-sm text-blue-700 mb-3 font-semibold">Submitted By</p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedApproval.submitter.avatar}
                        alt={selectedApproval.submitter.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className="font-bold text-blue-900">{selectedApproval.submitter.name}</p>
                        <p className="text-sm text-blue-700">{selectedApproval.submitter.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border-2 ${
                    selectedApproval.status === 'approved' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className={`text-sm mb-3 font-semibold ${
                      selectedApproval.status === 'approved' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {selectedApproval.status === 'approved' ? 'Approved By' : 'Rejected By'}
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedApproval.approver.avatar}
                        alt={selectedApproval.approver.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className={`font-bold ${
                          selectedApproval.status === 'approved' ? 'text-green-900' : 'text-red-900'
                        }`}>
                          {selectedApproval.approver.name}
                        </p>
                        <p className={`text-sm ${
                          selectedApproval.status === 'approved' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {selectedApproval.approver.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="font-bold text-gray-900 capitalize">{selectedApproval.type.replace('_', ' ')}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Priority</p>
                    <p className={`font-bold capitalize ${getPriorityColor(selectedApproval.priority)}`}>
                      {selectedApproval.priority}
                    </p>
                  </div>
                  {selectedApproval.amount && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Amount</p>
                      <p className="font-bold text-gray-900">{selectedApproval.amount}</p>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Submitted</p>
                    <p className="font-bold text-gray-900">{selectedApproval.submittedDate}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Decision Date</p>
                    <p className="font-bold text-gray-900">{selectedApproval.approvedDate}</p>
                  </div>
                </div>

                {/* Notes */}
                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="text-gray-600" size={20} />
                    <p className="font-semibold text-gray-900">Notes</p>
                  </div>
                  <p className="text-gray-700">{selectedApproval.notes}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                    View Full Details
                  </button>
                  <button
                    onClick={() => setSelectedApproval(null)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ApprovalHistory