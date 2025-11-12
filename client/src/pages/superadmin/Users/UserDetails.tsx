import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Activity,
  CreditCard,
  FileText,
  Settings,
  Edit,
  Lock,
  Unlock,
  Trash2,
  Award,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)

  // Mock user data
  const user = {
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@slbrothers.co.uk',
    phone: '+44 20 7946 0958',
    avatar: 'https://i.pravatar.cc/300?img=1',
    role: 'admin',
    department: 'Engineering',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2 hours ago',
    location: 'London, UK',
    timezone: 'GMT',
    language: 'English (UK)',
    
    // Stats
    stats: {
      totalLogins: 1247,
      projectsCompleted: 34,
      tasksCompleted: 456,
      revenue: 125000,
      activeProjects: 8,
      teamMembers: 12
    },

    // Activity data
    activityData: [
      { month: 'Jan', logins: 45, projects: 3, tasks: 23 },
      { month: 'Feb', logins: 52, projects: 4, tasks: 28 },
      { month: 'Mar', logins: 48, projects: 3, tasks: 31 },
      { month: 'Apr', logins: 61, projects: 5, tasks: 42 },
      { month: 'May', logins: 55, projects: 4, tasks: 38 },
      { month: 'Jun', logins: 67, projects: 6, tasks: 45 }
    ],

    // Recent activity
    recentActivity: [
      { id: 1, action: 'Completed project "Website Redesign"', timestamp: '2 hours ago', type: 'success' },
      { id: 2, action: 'Updated profile information', timestamp: '5 hours ago', type: 'info' },
      { id: 3, action: 'Submitted expense claim £1,450', timestamp: '1 day ago', type: 'warning' },
      { id: 4, action: 'Created new team document', timestamp: '2 days ago', type: 'info' },
      { id: 5, action: 'Joined project "Mobile App"', timestamp: '3 days ago', type: 'success' }
    ],

    // Permissions
    permissions: [
      { module: 'User Management', read: true, write: true, delete: true },
      { module: 'Content Management', read: true, write: true, delete: false },
      { module: 'Financial Reports', read: true, write: false, delete: false },
      { module: 'System Settings', read: true, write: true, delete: true },
      { module: 'Analytics', read: true, write: false, delete: false }
    ],

    // Projects
    projects: [
      { id: 1, name: 'Website Redesign', status: 'completed', progress: 100, budget: '£15,000' },
      { id: 2, name: 'Mobile App Development', status: 'in_progress', progress: 65, budget: '£45,000' },
      { id: 3, name: 'API Integration', status: 'in_progress', progress: 40, budget: '£12,000' },
      { id: 4, name: 'Database Migration', status: 'pending', progress: 0, budget: '£8,000' }
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const stats = [
    {
      label: 'Total Logins',
      value: user.stats.totalLogins.toLocaleString(),
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      label: 'Projects',
      value: user.stats.projectsCompleted,
      icon: FileText,
      color: 'from-green-500 to-green-600',
      change: '+8'
    },
    {
      label: 'Revenue',
      value: `£${(user.stats.revenue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      change: '+23%'
    },
    {
      label: 'Tasks',
      value: user.stats.tasksCompleted,
      icon: CheckCircle,
      color: 'from-orange-500 to-orange-600',
      change: '+45'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-lg">
              ← Back
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900">User Profile</h1>
              <p className="text-gray-600">View and manage user details</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50">
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              <Edit size={20} />
              <span>{editMode ? 'Save' : 'Edit'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* User Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white/20"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl font-black">{user.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                user.status === 'active' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
              }`}>
                {user.status.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
                {user.role.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-blue-200" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-blue-200" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-200" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-blue-200" />
                <span className="text-sm">Joined {user.joinDate}</span>
              </div>
            </div>
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
              <span className="text-xs sm:text-sm font-bold text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={user.department}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={user.location}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                  <input
                    type="text"
                    value={user.timezone}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all font-semibold">
                  <Mail size={20} />
                  <span>Send Email</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all font-semibold">
                  <Unlock size={20} />
                  <span>Grant Access</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-all font-semibold">
                  <Lock size={20} />
                  <span>Suspend Account</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all font-semibold">
                  <RefreshCw size={20} />
                  <span>Reset Password</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all font-semibold">
                  <Trash2 size={20} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Activity Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={user.activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Area type="monotone" dataKey="logins" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="tasks" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {user.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.type === 'success' ? <CheckCircle className="text-green-600" size={20} /> :
                       activity.type === 'warning' ? <AlertCircle className="text-orange-600" size={20} /> :
                       <Activity className="text-blue-600" size={20} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Projects</h2>
            <div className="space-y-4">
              {user.projects.map((project) => (
                <div key={project.id} className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === 'completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Budget</span>
                      <span className="font-semibold">{project.budget}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Access Permissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Module</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Read</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Write</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {user.permissions.map((permission, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">{permission.module}</td>
                      <td className="px-6 py-4 text-center">
                        {permission.read ? <CheckCircle className="inline text-green-600" size={20} /> : <XCircle className="inline text-red-600" size={20} />}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {permission.write ? <CheckCircle className="inline text-green-600" size={20} /> : <XCircle className="inline text-red-600" size={20} />}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {permission.delete ? <CheckCircle className="inline text-green-600" size={20} /> : <XCircle className="inline text-red-600" size={20} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive email updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Session Timeout</p>
                    <p className="text-sm text-gray-600">Auto logout after inactivity</p>
                  </div>
                  <select className="px-4 py-2 border-2 border-gray-200 rounded-lg">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option selected>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default UserDetails