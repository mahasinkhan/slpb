import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Lock,
  Unlock,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  DollarSign,
  Award
} from 'lucide-react'

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // grid or table

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@slbrothers.co.uk',
      role: 'admin',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=1',
      phone: '+44 20 7946 0958',
      location: 'London, UK',
      joinDate: '2023-01-15',
      lastLogin: '2 hours ago',
      loginCount: 1247,
      projects: 34,
      revenue: 125000
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@slbrothers.co.uk',
      role: 'manager',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=3',
      phone: '+44 20 7946 0959',
      location: 'Manchester, UK',
      joinDate: '2022-11-20',
      lastLogin: '5 hours ago',
      loginCount: 892,
      projects: 28,
      revenue: 98000
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@slbrothers.co.uk',
      role: 'employee',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=5',
      phone: '+44 20 7946 0960',
      location: 'Birmingham, UK',
      joinDate: '2023-03-10',
      lastLogin: '1 day ago',
      loginCount: 654,
      projects: 19,
      revenue: 67000
    },
    {
      id: 4,
      name: 'James Brown',
      email: 'james.b@slbrothers.co.uk',
      role: 'employee',
      status: 'inactive',
      avatar: 'https://i.pravatar.cc/150?img=7',
      phone: '+44 20 7946 0961',
      location: 'Leeds, UK',
      joinDate: '2023-02-05',
      lastLogin: '2 weeks ago',
      loginCount: 423,
      projects: 15,
      revenue: 45000
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@slbrothers.co.uk',
      role: 'manager',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=9',
      phone: '+44 20 7946 0962',
      location: 'Liverpool, UK',
      joinDate: '2022-08-12',
      lastLogin: '30 minutes ago',
      loginCount: 1103,
      projects: 41,
      revenue: 156000
    },
    {
      id: 6,
      name: 'David Martinez',
      email: 'david.m@slbrothers.co.uk',
      role: 'employee',
      status: 'suspended',
      avatar: 'https://i.pravatar.cc/150?img=11',
      phone: '+44 20 7946 0963',
      location: 'Bristol, UK',
      joinDate: '2023-05-20',
      lastLogin: '1 month ago',
      loginCount: 287,
      projects: 8,
      revenue: 23000
    }
  ]

  const stats = [
    {
      label: 'Total Users',
      value: '245',
      change: '+12',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Users',
      value: '198',
      change: '+8',
      icon: UserCheck,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Suspended',
      value: '12',
      change: '+3',
      icon: UserX,
      color: 'from-red-500 to-red-600'
    },
    {
      label: 'New This Month',
      value: '23',
      change: '+5',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-700 border-purple-300',
      manager: 'bg-blue-100 text-blue-700 border-blue-300',
      employee: 'bg-gray-100 text-gray-700 border-gray-300'
    }
    return styles[role] || styles.employee
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-300',
      inactive: 'bg-gray-100 text-gray-700 border-gray-300',
      suspended: 'bg-red-100 text-red-700 border-red-300'
    }
    return styles[status] || styles.inactive
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
              <Users className="mr-3 text-blue-600" size={36} />
              User Management
            </h1>
            <p className="text-gray-600">Manage all system users, roles, and permissions</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <UserPlus size={20} />
              <span>Add User</span>
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </motion.div>

      {/* Users Grid View */}
      {viewMode === 'grid' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredUsers.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-4 border-gray-100"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    user.status === 'active' ? 'bg-green-500' :
                    user.status === 'inactive' ? 'bg-gray-400' :
                    'bg-red-500'
                  }`} />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>

              {/* User Info */}
              <h3 className="font-bold text-gray-900 text-lg mb-1">{user.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{user.email}</p>

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getRoleBadge(user.role)}`}>
                  {user.role.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusBadge(user.status)}`}>
                  {user.status.toUpperCase()}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-600">Projects</p>
                  <p className="font-bold text-gray-900">{user.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Revenue</p>
                  <p className="font-bold text-gray-900">£{(user.revenue / 1000).toFixed(0)}K</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Users Table View */}
      {viewMode === 'table' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Last Login</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Projects</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getRoleBadge(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusBadge(user.status)}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.projects}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
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
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-16 h-16 rounded-full border-4 border-gray-100"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                      <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <Activity size={24} className="text-blue-600 mb-2" />
                    <p className="text-2xl font-black text-blue-900">{selectedUser.loginCount}</p>
                    <p className="text-sm text-blue-700">Total Logins</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <Award size={24} className="text-green-600 mb-2" />
                    <p className="text-2xl font-black text-green-900">{selectedUser.projects}</p>
                    <p className="text-sm text-green-700">Projects</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <DollarSign size={24} className="text-purple-600 mb-2" />
                    <p className="text-2xl font-black text-purple-900">£{(selectedUser.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-purple-700">Revenue</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <Calendar size={24} className="text-orange-600 mb-2" />
                    <p className="text-2xl font-black text-orange-900">{selectedUser.lastLogin}</p>
                    <p className="text-sm text-orange-700">Last Active</p>
                  </div>
                </div>

                {/* User Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-4">Personal Information</h3>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Mail size={20} className="text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Phone size={20} className="text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">{selectedUser.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin size={20} className="text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{selectedUser.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-4">Account Details</h3>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Shield size={20} className="text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Role</p>
                        <p className="font-semibold text-gray-900">{selectedUser.role.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <CheckCircle size={20} className="text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Status</p>
                        <p className="font-semibold text-gray-900">{selectedUser.status.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Calendar size={20} className="text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Joined</p>
                        <p className="font-semibold text-gray-900">{selectedUser.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                    <Edit size={20} />
                    <span>Edit User</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
                    <Unlock size={20} />
                    <span>Grant Access</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-all">
                    <Lock size={20} />
                    <span>Suspend</span>
                  </button>
                  <button className="flex items-center space-x-2 border-2 border-red-600 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all">
                    <Trash2 size={20} />
                    <span>Delete User</span>
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

export default UserManagement