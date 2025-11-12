import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Building,
  CheckCircle
} from 'lucide-react'

// Dummy Data
const initialEmployees = [
  {
    id: 101,
    name: 'Alexandra Reid',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    email: 'alex.reid@corp.com',
    phone: '+44 7700 900301',
    status: 'Active',
    joined: '2019-03-15',
    salary: '£85,000',
    location: 'London',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 102,
    name: 'Ben Carter',
    title: 'Product Manager',
    department: 'Product',
    email: 'ben.carter@corp.com',
    phone: '+44 7700 900302',
    status: 'Active',
    joined: '2021-08-20',
    salary: '£75,000',
    location: 'Manchester',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 103,
    name: 'Chloe Davis',
    title: 'UX Designer',
    department: 'Design',
    email: 'chloe.davis@corp.com',
    phone: '+44 7700 900303',
    status: 'On Leave',
    joined: '2022-01-10',
    salary: '£60,000',
    location: 'Remote',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 104,
    name: 'David Sharma',
    title: 'HR Specialist',
    department: 'HR',
    email: 'david.sharma@corp.com',
    phone: '+44 7700 900304',
    status: 'Active',
    joined: '2023-05-01',
    salary: '£55,000',
    location: 'London',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 105,
    name: 'Emily White',
    title: 'Marketing Director',
    department: 'Marketing',
    email: 'emily.white@corp.com',
    phone: '+44 7700 900305',
    status: 'Terminated',
    joined: '2018-11-25',
    salary: '£95,000',
    location: 'Leeds',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
]

const stats = [
  { label: 'Total Employees', value: '1,245', icon: Users, color: 'from-blue-600 to-blue-700' },
  { label: 'Active Staff', value: '1,190', icon: CheckCircle, color: 'from-green-600 to-green-700' },
  { label: 'Departments', value: '15', icon: Building, color: 'from-purple-600 to-purple-700' },
  { label: 'New Hires (30 Days)', value: '12', icon: UserPlus, color: 'from-orange-600 to-orange-700' },
]

const AdminEmployees = () => {
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const departmentOptions = ['all', ...new Set(initialEmployees.map(e => e.department))]

  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDepartment && matchesSearch
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-700'
      case 'Terminated':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
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
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              Employee Directory
            </h1>
            <p className="text-gray-600">Manage all staff profiles and organizational data</p>
          </div>
          <button
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <UserPlus size={20} />
            <span>Add New Employee</span>
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
                placeholder="Search name, title, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            <div className="flex flex-wrap gap-2">
              {departmentOptions.map((department) => (
                <button
                  key={department}
                  onClick={() => setSelectedDepartment(department)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedDepartment === department
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {department.charAt(0).toUpperCase() + department.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Employees Table */}
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
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {paginatedEmployees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{employee.title}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm">
                        <Building size={14} className="text-gray-400" />
                        <span className="text-gray-700">{employee.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {employee.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(employee.status)}`}>
                        {employee.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
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

      {/* Employee Detail Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEmployee(null)}
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
                <h2 className="text-2xl font-bold text-gray-900">Employee Profile</h2>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{selectedEmployee.name}</h3>
                    <p className="text-xl text-blue-600 mb-2">{selectedEmployee.title}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(selectedEmployee.status)}`}>
                        {selectedEmployee.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Contact & Job Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'Email', value: selectedEmployee.email, icon: Mail },
                    { label: 'Phone', value: selectedEmployee.phone, icon: Phone },
                    { label: 'Department', value: selectedEmployee.department, icon: Building },
                    { label: 'Location', value: selectedEmployee.location, icon: MapPin },
                    { label: 'Date Joined', value: selectedEmployee.joined, icon: Calendar },
                    { label: 'Salary', value: selectedEmployee.salary, icon: DollarSign },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl flex items-center space-x-3">
                      <item.icon size={20} className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 border-2 border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    <Edit size={20} />
                    <span>Edit Profile</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    <Trash2 size={20} />
                    <span>Terminate</span>
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

export default AdminEmployees