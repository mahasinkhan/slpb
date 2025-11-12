import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  User,
  DollarSign,
  FileText,
  Shield,
  Calendar,
  MessageSquare,
  Filter,
  Search,
  ChevronRight,
  Download,
  TrendingUp
} from 'lucide-react'

const PendingApprovals = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [modalAction, setModalAction] = useState(null)

  const pendingApprovals = [
    {
      id: 'APR-101',
      type: 'expense_claim',
      title: 'Travel Expenses - Client Meeting London',
      submitter: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1',
        department: 'Sales'
      },
      amount: '£2,450.00',
      priority: 'high',
      submittedDate: '2025-11-10',
      daysWaiting: 1,
      description: 'Travel and accommodation expenses for 3-day client meeting in London. Includes train tickets, hotel, and meals.',
      attachments: 3,
      category: 'Travel'
    },
    {
      id: 'APR-102',
      type: 'user_access',
      title: 'Admin Access Request - Emma Wilson',
      submitter: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3',
        department: 'IT'
      },
      amount: null,
      priority: 'critical',
      submittedDate: '2025-11-09',
      daysWaiting: 2,
      description: 'Request to grant admin access to Emma Wilson for project management tools. Required for new team lead role.',
      attachments: 1,
      category: 'Security'
    },
    {
      id: 'APR-103',
      type: 'content_publish',
      title: 'Blog Post: "AI Trends 2025"',
      submitter: {
        name: 'Lisa Anderson',
        email: 'lisa.a@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=9',
        department: 'Marketing'
      },
      amount: null,
      priority: 'medium',
      submittedDate: '2025-11-09',
      daysWaiting: 2,
      description: 'New blog post about AI trends for 2025. Content has been reviewed by technical team.',
      attachments: 2,
      category: 'Content'
    },
    {
      id: 'APR-104',
      type: 'purchase_order',
      title: 'New Office Equipment Purchase',
      submitter: {
        name: 'James Brown',
        email: 'james.b@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=7',
        department: 'Operations'
      },
      amount: '£8,500.00',
      priority: 'high',
      submittedDate: '2025-11-08',
      daysWaiting: 3,
      description: '10 new workstations for expanding development team. Includes monitors, keyboards, and mice.',
      attachments: 4,
      category: 'Procurement'
    },
    {
      id: 'APR-105',
      type: 'leave_request',
      title: 'Annual Leave - 2 Weeks',
      submitter: {
        name: 'David Martinez',
        email: 'david.m@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=11',
        department: 'Engineering'
      },
      amount: null,
      priority: 'medium',
      submittedDate: '2025-11-08',
      daysWaiting: 3,
      description: 'Requesting 2 weeks annual leave from December 15 to December 29. All current projects will be handed over.',
      attachments: 0,
      category: 'HR'
    },
    {
      id: 'APR-106',
      type: 'budget_increase',
      title: 'Q4 Marketing Budget Increase',
      submitter: {
        name: 'Lisa Anderson',
        email: 'lisa.a@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=9',
        department: 'Marketing'
      },
      amount: '£25,000.00',
      priority: 'critical',
      submittedDate: '2025-11-07',
      daysWaiting: 4,
      description: 'Request for additional marketing budget to support Q4 campaign. Projected ROI: 350%.',
      attachments: 5,
      category: 'Finance'
    },
    {
      id: 'APR-107',
      type: 'expense_claim',
      title: 'Software Licenses Renewal',
      submitter: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3',
        department: 'IT'
      },
      amount: '£4,200.00',
      priority: 'high',
      submittedDate: '2025-11-07',
      daysWaiting: 4,
      description: 'Annual renewal for development tools and cloud services. Critical for ongoing operations.',
      attachments: 2,
      category: 'IT'
    },
    {
      id: 'APR-108',
      type: 'user_access',
      title: 'Database Access - New Developer',
      submitter: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1',
        department: 'Engineering'
      },
      amount: null,
      priority: 'medium',
      submittedDate: '2025-11-06',
      daysWaiting: 5,
      description: 'Database read access for new developer joining next week.',
      attachments: 1,
      category: 'Security'
    }
  ]

  const stats = [
    {
      label: 'Pending',
      value: pendingApprovals.length,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Critical',
      value: pendingApprovals.filter(a => a.priority === 'critical').length,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600'
    },
    {
      label: 'This Week',
      value: pendingApprovals.filter(a => a.daysWaiting <= 7).length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Total Value',
      value: `£${(pendingApprovals.filter(a => a.amount).reduce((sum, a) => sum + parseFloat(a.amount.replace(/[^0-9.-]+/g,'')), 0) / 1000).toFixed(1)}K`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    }
  ]

  const filteredApprovals = pendingApprovals.filter(approval => {
    const matchesSearch = 
      approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.submitter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || approval.type === filterType
    const matchesPriority = filterPriority === 'all' || approval.priority === filterPriority
    return matchesSearch && matchesType && matchesPriority
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'expense_claim': return DollarSign
      case 'user_access': return Shield
      case 'content_publish': return FileText
      case 'purchase_order': return FileText
      case 'leave_request': return Calendar
      case 'budget_increase': return TrendingUp
      default: return FileText
    }
  }

  const handleApprove = (approval) => {
    setSelectedApproval(approval)
    setModalAction('approve')
    setShowActionModal(true)
  }

  const handleReject = (approval) => {
    setSelectedApproval(approval)
    setModalAction('reject')
    setShowActionModal(true)
  }

  const confirmAction = () => {
    alert(`Approval ${selectedApproval.id} ${modalAction === 'approve' ? 'APPROVED' : 'REJECTED'}`)
    setShowActionModal(false)
    setSelectedApproval(null)
    setModalAction(null)
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
              <Clock className="mr-3 text-yellow-600" size={36} />
              Pending Approvals
            </h1>
            <p className="text-gray-600">Review and authorize pending requests</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50">
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
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
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
            <option value="budget_increase">Budget Increase</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </motion.div>

      {/* Approvals List */}
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
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Left Section - Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TypeIcon className="text-gray-600" size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-500">{approval.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(approval.priority)}`}>
                          {approval.priority.toUpperCase()}
                        </span>
                        {approval.daysWaiting > 3 && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border-2 border-red-300 animate-pulse">
                            {approval.daysWaiting} DAYS WAITING
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-gray-900 text-lg mb-2">{approval.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{approval.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <img
                            src={approval.submitter.avatar}
                            alt={approval.submitter.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{approval.submitter.name}</span>
                        </div>
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
                        {approval.attachments > 0 && (
                          <span className="flex items-center gap-1">
                            <FileText size={14} />
                            {approval.attachments} files
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex lg:flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => setSelectedApproval(approval)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
                    >
                      <Eye size={18} />
                      <span>Review</span>
                    </button>
                    <button
                      onClick={() => handleApprove(approval)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold"
                    >
                      <CheckCircle size={18} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(approval)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
                    >
                      <XCircle size={18} />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredApprovals.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-semibold">No pending approvals found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApproval && !showActionModal && (
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
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-gray-500">{selectedApproval.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(selectedApproval.priority)}`}>
                        {selectedApproval.priority.toUpperCase()}
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

              <div className="p-6 space-y-6">
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={selectedApproval.submitter.avatar}
                      alt={selectedApproval.submitter.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-blue-900">{selectedApproval.submitter.name}</p>
                      <p className="text-sm text-blue-700">{selectedApproval.submitter.email}</p>
                      <p className="text-xs text-blue-600">{selectedApproval.submitter.department}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900">{selectedApproval.description}</p>
                </div>

                {selectedApproval.amount && (
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-700 mb-1">Amount</p>
                    <p className="text-2xl font-black text-green-900">{selectedApproval.amount}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedApproval)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleReject(selectedApproval)}
                    className="flex-1 px-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50"
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Confirmation Modal */}
      <AnimatePresence>
        {showActionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {modalAction === 'approve' ? 'Approve' : 'Reject'} Request?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {modalAction} approval {selectedApproval?.id}?
              </p>
              <textarea
                placeholder="Add notes (optional)..."
                className="w-full p-3 border-2 border-gray-200 rounded-xl mb-4 focus:border-blue-500 focus:outline-none"
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold ${
                    modalAction === 'approve' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PendingApprovals