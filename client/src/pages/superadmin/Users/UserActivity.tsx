import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Users,
  Eye,
  MousePointer,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Globe,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  LogIn,
  LogOut,
  FileText,
  Settings,
  ShoppingCart,
  CreditCard,
  Mail,
  Share2,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

const UserActivity = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterUser, setFilterUser] = useState('all')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [dateRange, setDateRange] = useState('today')

  const activities = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      action: 'logged_in',
      type: 'authentication',
      description: 'Logged in successfully',
      timestamp: '2 mins ago',
      ip: '192.168.1.100',
      location: 'London, UK',
      device: 'Chrome on Windows',
      details: { method: '2FA', duration: '0.45s' }
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      action: 'created_order',
      type: 'transaction',
      description: 'Created new order #ORD-12456',
      timestamp: '5 mins ago',
      ip: '192.168.1.105',
      location: 'Manchester, UK',
      device: 'Safari on MacOS',
      details: { orderId: 'ORD-12456', amount: '£1,250.00', items: 3 }
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        email: 'emma.w@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      action: 'updated_profile',
      type: 'profile',
      description: 'Updated profile information',
      timestamp: '12 mins ago',
      ip: '192.168.1.110',
      location: 'Birmingham, UK',
      device: 'Firefox on Linux',
      details: { fields: ['phone', 'address'], changes: 2 }
    },
    {
      id: 4,
      user: {
        name: 'James Brown',
        email: 'james.b@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=7'
      },
      action: 'deleted_document',
      type: 'content',
      description: 'Deleted document "Q4-Report.pdf"',
      timestamp: '18 mins ago',
      ip: '192.168.1.115',
      location: 'Leeds, UK',
      device: 'Chrome on Android',
      details: { fileName: 'Q4-Report.pdf', size: '2.4 MB' }
    },
    {
      id: 5,
      user: {
        name: 'Lisa Anderson',
        email: 'lisa.a@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=9'
      },
      action: 'sent_email',
      type: 'communication',
      description: 'Sent email to 45 customers',
      timestamp: '25 mins ago',
      ip: '192.168.1.120',
      location: 'Liverpool, UK',
      device: 'Outlook on Windows',
      details: { recipients: 45, subject: 'Monthly Newsletter' }
    },
    {
      id: 6,
      user: {
        name: 'David Martinez',
        email: 'david.m@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      action: 'changed_settings',
      type: 'system',
      description: 'Modified system settings',
      timestamp: '35 mins ago',
      ip: '192.168.1.125',
      location: 'Bristol, UK',
      device: 'Chrome on Windows',
      details: { setting: 'notification_preferences', oldValue: 'all', newValue: 'important' }
    },
    {
      id: 7,
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      action: 'viewed_report',
      type: 'analytics',
      description: 'Viewed analytics report',
      timestamp: '42 mins ago',
      ip: '192.168.1.100',
      location: 'London, UK',
      device: 'Chrome on Windows',
      details: { report: 'Monthly Revenue', duration: '5m 34s' }
    },
    {
      id: 8,
      user: {
        name: 'Michael Chen',
        email: 'michael.c@slbrothers.co.uk',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      action: 'payment_processed',
      type: 'transaction',
      description: 'Processed payment for order #ORD-12456',
      timestamp: '48 mins ago',
      ip: '192.168.1.105',
      location: 'Manchester, UK',
      device: 'Safari on MacOS',
      details: { orderId: 'ORD-12456', amount: '£1,250.00', method: 'Credit Card' }
    }
  ]

  const stats = [
    {
      label: 'Active Users',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Actions Today',
      value: '8,945',
      change: '+23%',
      icon: Activity,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Page Views',
      value: '45.2K',
      change: '+8%',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Avg Session',
      value: '12m 34s',
      change: '+2m',
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const topActions = [
    { action: 'Page Views', count: 12450, icon: Eye, color: 'blue' },
    { action: 'Login Events', count: 3420, icon: LogIn, color: 'green' },
    { action: 'Orders Created', count: 892, icon: ShoppingCart, color: 'purple' },
    { action: 'Profile Updates', count: 567, icon: Settings, color: 'orange' },
    { action: 'Documents Edited', count: 445, icon: FileText, color: 'pink' }
  ]

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || activity.type === filterType
    const matchesUser = filterUser === 'all' || activity.user.email === filterUser
    return matchesSearch && matchesType && matchesUser
  })

  const getActionIcon = (action) => {
    const icons = {
      logged_in: LogIn,
      logged_out: LogOut,
      created_order: ShoppingCart,
      updated_profile: Edit,
      deleted_document: Trash2,
      sent_email: Mail,
      changed_settings: Settings,
      viewed_report: Eye,
      payment_processed: CreditCard,
      shared_content: Share2
    }
    return icons[action] || Activity
  }

  const getTypeColor = (type) => {
    const colors = {
      authentication: 'bg-blue-100 text-blue-700 border-blue-300',
      transaction: 'bg-green-100 text-green-700 border-green-300',
      profile: 'bg-purple-100 text-purple-700 border-purple-300',
      content: 'bg-orange-100 text-orange-700 border-orange-300',
      communication: 'bg-pink-100 text-pink-700 border-pink-300',
      system: 'bg-gray-100 text-gray-700 border-gray-300',
      analytics: 'bg-teal-100 text-teal-700 border-teal-300'
    }
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-300'
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
              <Activity className="mr-3 text-purple-600" size={36} />
              User Activity
            </h1>
            <p className="text-gray-600">Track and monitor all user actions across the system</p>
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
        {/* Top Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-green-600" size={24} />
            Top Actions
          </h2>
          <div className="space-y-4">
            {topActions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>
                    <item.icon className={`text-${item.color}-600`} size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.count.toLocaleString()} events</p>
                  </div>
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
                  placeholder="Search activities..."
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
              <option value="authentication">Authentication</option>
              <option value="transaction">Transaction</option>
              <option value="profile">Profile</option>
              <option value="content">Content</option>
              <option value="communication">Communication</option>
              <option value="system">System</option>
              <option value="analytics">Analytics</option>
            </select>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="mr-2 text-blue-600" size={28} />
          Activity Feed
        </h2>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredActivities.map((activity, idx) => {
              const ActionIcon = getActionIcon(activity.action)
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedActivity(activity)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{activity.user.name}</p>
                          <p className="text-sm text-gray-600">{activity.user.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getTypeColor(activity.type)}`}>
                          {activity.type.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <ActionIcon size={16} className="text-gray-600" />
                        <p className="text-gray-900">{activity.description}</p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {activity.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {activity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Monitor size={12} />
                          {activity.device}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe size={12} />
                          {activity.ip}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-semibold">No activities found</p>
          </div>
        )}
      </motion.div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Activity Details</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={selectedActivity.user.avatar}
                    alt={selectedActivity.user.name}
                    className="w-16 h-16 rounded-full border-4 border-white"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{selectedActivity.user.name}</p>
                    <p className="text-gray-600">{selectedActivity.user.email}</p>
                  </div>
                </div>

                {/* Action Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-700 mb-1">Action</p>
                    <p className="font-bold text-blue-900">{selectedActivity.description}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-purple-700 mb-1">Type</p>
                    <p className="font-bold text-purple-900 capitalize">{selectedActivity.type}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-700 mb-1">Timestamp</p>
                    <p className="font-bold text-green-900">{selectedActivity.timestamp}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <p className="text-sm text-orange-700 mb-1">IP Address</p>
                    <p className="font-bold text-orange-900">{selectedActivity.ip}</p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-700 mb-3 font-semibold">Additional Information</p>
                  <div className="space-y-2">
                    {Object.entries(selectedActivity.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Device */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="text-gray-600" size={24} />
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{selectedActivity.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Monitor className="text-gray-600" size={24} />
                    <div>
                      <p className="text-xs text-gray-600">Device</p>
                      <p className="font-semibold text-gray-900">{selectedActivity.device}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedActivity(null)}
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserActivity