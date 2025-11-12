import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Calendar,
  Clock,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  TrendingUp,
  UserPlus,
  FileText,
  Video,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Send,
  User,
  Building
} from 'lucide-react'

const AdminInterviews = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const interviews = [
    {
      id: 1,
      candidate: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+44 7700 900123',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      status: 'scheduled',
      date: '2025-11-15',
      time: '10:00 AM',
      type: 'video',
      interviewer: 'John Smith',
      round: 'Technical Round',
      experience: '5 years',
      location: 'London, UK',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 4.5,
      notes: 'Strong technical background in React and TypeScript'
    },
    {
      id: 2,
      candidate: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+44 7700 900124',
      position: 'Product Manager',
      department: 'Product',
      status: 'completed',
      date: '2025-11-10',
      time: '2:00 PM',
      type: 'in-person',
      interviewer: 'Emily Davis',
      round: 'Final Round',
      experience: '7 years',
      location: 'Manchester, UK',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5.0,
      notes: 'Excellent product vision and leadership skills'
    },
    {
      id: 3,
      candidate: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+44 7700 900125',
      position: 'UX Designer',
      department: 'Design',
      status: 'pending',
      date: '2025-11-20',
      time: '11:00 AM',
      type: 'video',
      interviewer: 'David Brown',
      round: 'Portfolio Review',
      experience: '4 years',
      location: 'Remote',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: null,
      notes: 'Portfolio shows strong design thinking'
    },
    {
      id: 4,
      candidate: 'James Anderson',
      email: 'james.anderson@email.com',
      phone: '+44 7700 900126',
      position: 'Data Scientist',
      department: 'AI Research',
      status: 'scheduled',
      date: '2025-11-18',
      time: '3:00 PM',
      type: 'video',
      interviewer: 'Lisa Martinez',
      round: 'Technical Assessment',
      experience: '6 years',
      location: 'Birmingham, UK',
      avatar: 'https://i.pravatar.cc/150?img=7',
      rating: null,
      notes: 'PhD in Machine Learning, published researcher'
    },
    {
      id: 5,
      candidate: 'Olivia Taylor',
      email: 'olivia.taylor@email.com',
      phone: '+44 7700 900127',
      position: 'Marketing Manager',
      department: 'Marketing',
      status: 'rejected',
      date: '2025-11-08',
      time: '1:00 PM',
      type: 'phone',
      interviewer: 'Robert Wilson',
      round: 'HR Screening',
      experience: '3 years',
      location: 'Leeds, UK',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 2.5,
      notes: 'Experience not aligned with requirements'
    },
    {
      id: 6,
      candidate: 'Daniel Martinez',
      email: 'daniel.martinez@email.com',
      phone: '+44 7700 900128',
      position: 'DevOps Engineer',
      department: 'Engineering',
      status: 'completed',
      date: '2025-11-12',
      time: '4:00 PM',
      type: 'video',
      interviewer: 'Anna Thompson',
      round: 'Technical Round',
      experience: '5 years',
      location: 'Bristol, UK',
      avatar: 'https://i.pravatar.cc/150?img=11',
      rating: 4.0,
      notes: 'Strong DevOps and cloud infrastructure knowledge'
    }
  ]

  const stats = [
    {
      label: 'Total Interviews',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      trend: 'up'
    },
    {
      label: 'Scheduled',
      value: '24',
      change: '+8%',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      trend: 'up'
    },
    {
      label: 'Completed',
      value: '98',
      change: '+15%',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      trend: 'up'
    },
    {
      label: 'Success Rate',
      value: '76%',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      trend: 'up'
    }
  ]

  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = selectedStatus === 'all' || interview.status === selectedStatus
    const matchesSearch = 
      interview.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage)
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              Interview Management
            </h1>
            <p className="text-gray-600">Manage and track all candidate interviews</p>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            <span>Schedule Interview</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-bold flex items-center">
                <TrendingUp size={16} className="mr-1" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search candidates, positions, departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            <div className="flex flex-wrap gap-2">
              {['all', 'scheduled', 'completed', 'pending', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interviews Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {paginatedInterviews.map((interview, index) => (
                  <motion.tr
                    key={interview.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={interview.avatar}
                          alt={interview.candidate}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{interview.candidate}</p>
                          <p className="text-sm text-gray-500">{interview.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{interview.position}</p>
                        <p className="text-sm text-gray-500">{interview.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-gray-900">{interview.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock size={14} className="text-gray-400" />
                          <span className="text-gray-600">{interview.time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {interview.type === 'video' && <Video size={16} className="text-purple-600" />}
                        {interview.type === 'phone' && <Phone size={16} className="text-green-600" />}
                        {interview.type === 'in-person' && <Users size={16} className="text-blue-600" />}
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {interview.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                        interview.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {interview.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {interview.rating ? (
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="font-semibold text-gray-900">{interview.rating}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedInterview(interview)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredInterviews.length)} of {filteredInterviews.length} interviews
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Interview Detail Modal */}
      <AnimatePresence>
        {selectedInterview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInterview(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Interview Details</h2>
                <button
                  onClick={() => setSelectedInterview(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Candidate Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedInterview.avatar}
                    alt={selectedInterview.candidate}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedInterview.candidate}
                    </h3>
                    <p className="text-lg text-gray-600 mb-3">{selectedInterview.position}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-400" />
                        <span>{selectedInterview.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-400" />
                        <span>{selectedInterview.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{selectedInterview.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interview Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Department</p>
                    <p className="font-semibold text-gray-900">{selectedInterview.department}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Experience</p>
                    <p className="font-semibold text-gray-900">{selectedInterview.experience}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Interview Round</p>
                    <p className="font-semibold text-gray-900">{selectedInterview.round}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Interviewer</p>
                    <p className="font-semibold text-gray-900">{selectedInterview.interviewer}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                    <p className="font-semibold text-gray-900">{selectedInterview.date} at {selectedInterview.time}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Interview Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{selectedInterview.type}</p>
                  </div>
                </div>

                {/* Notes */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Notes</p>
                  <p className="text-blue-800">{selectedInterview.notes}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    <CheckCircle size={20} />
                    <span>Approve</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    <XCircle size={20} />
                    <span>Reject</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 border-2 border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    <Send size={20} />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowScheduleModal(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Schedule New Interview</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        placeholder="Enter candidate name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        placeholder="candidate@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        placeholder="e.g., Senior Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interview Type
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                      <option>Video Call</option>
                      <option>Phone Call</option>
                      <option>In-Person</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interviewer
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="Select interviewer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Add any additional notes..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowScheduleModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Schedule Interview
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminInterviews