import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    Briefcase,
    TrendingUp,
    DollarSign, // Used for generic finance
    UserPlus,
    FileText,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    Activity,
    BarChart3,
    PieChart,
    ArrowUp,
    ArrowDown,
    MoreVertical,
    Search,
    Filter,
    Download,
    Bell,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
    Building,
    Target,
    Award,
    Zap,
    Mail,
    Phone,
    MapPin,
    HeartHandshake, // New icon for HR/Compliance
    ThumbsUp // New icon for performance
} from 'lucide-react'

// --- Main Dashboard Component ---

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState('month')

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
                {/* Top Navigation */}
                <TopNav setSidebarOpen={setSidebarOpen} />

                {/* Dashboard Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 sm:mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003366] mb-2">
                            Welcome back, Admin! 👋
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Here's the latest data for **SL Brothers** this morning.
                        </p>
                    </motion.div>

                    {/* Stats Cards */}
                    <StatsCards />

                    {/* Period Selector */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#003366]">Performance Overview</h2>
                        <div className="flex items-center space-x-2">
                            {['week', 'month', 'quarter'].map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setSelectedPeriod(period)}
                                    className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                                        selectedPeriod === period
                                            ? 'bg-[#003366] text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <RevenueChart />
                        <ProjectsChart />
                    </div>

                    {/* Compliance, Reviews, and Quick Data Tables */}
                    <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <ComplianceWidget />
                        <PerformanceReviews />
                        <RecentEmployees />
                    </div>

                    {/* Final Activity Feed */}
                    <ActivityFeed />
                </main>
            </div>
        </div>
    )
}

// --- Component Definitions (Modified & New) ---

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: Users, label: 'Staff Directory', count: 45 },
        { icon: Briefcase, label: 'Projects', count: 12 },
        { icon: HeartHandshake, label: 'HR & Payroll', count: 3, alert: true }, // Highlighted for UK compliance
        { icon: FileText, label: 'Documents' },
        { icon: Calendar, label: 'Annual Leave' }, // UK English
        { icon: DollarSign, label: 'Finance' },
        { icon: BarChart3, label: 'Reports' },
        { icon: Settings, label: 'System Settings' }
    ]

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ x: sidebarOpen ? 0 : '-100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 lg:translate-x-0 lg:static"
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-lg">SLB</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#003366]">SL Brothers</h3>
                                <p className="text-xs text-gray-500">Admin Panel</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                                            item.active
                                                ? 'bg-[#003366] text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <item.icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        {item.count && (
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                item.active ? 'bg-white/20' : 'bg-[#003366]/10 text-[#003366]'
                                            }`}>
                                                {item.count}
                                            </span>
                                        )}
                                        {item.alert && !item.active && (
                                            <AlertCircle size={16} className="text-red-500 ml-1" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                            <img
                                src="https://i.pravatar.cc/150?img=12"
                                alt="Admin"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-[#003366] text-sm truncate">John Admin</p>
                                <p className="text-xs text-gray-500 truncate">admin@slbrothers.co.uk</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                            <LogOut size={18} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}

const TopNav = ({ setSidebarOpen }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between p-4 sm:p-6">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                    
                    {/* Search Bar */}
                    <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64 lg:w-96">
                        <Search className="text-gray-400 mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Search staff, projects, or reports..." // UK-friendly search
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Mobile Search */}
                    <button className="sm:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Search size={20} />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Settings */}
                    <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Settings size={20} />
                    </button>

                    {/* Profile (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="Admin"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="text-sm">
                            <p className="font-semibold text-[#003366]">John Admin</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

const StatsCards = () => {
    const stats = [
        {
            icon: Users,
            label: 'Total Staff', // Updated to 'Staff'
            value: '245',
            change: '+12%',
            positive: true,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: Briefcase,
            label: 'Active Projects',
            value: '48',
            change: '+8%',
            positive: true,
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: DollarSign,
            label: 'YTD Revenue', // Localised currency format
            value: '£2.4M',
            change: '+23%',
            positive: true,
            color: 'from-green-500 to-green-600'
        },
        {
            icon: Target,
            label: 'KPI Completion', // More business-focused
            value: '88%',
            change: '-2%',
            positive: false,
            color: 'from-orange-500 to-orange-600'
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                            <stat.icon className="text-white" size={24} />
                        </div>
                        <div className={`flex items-center space-x-1 text-xs sm:text-sm font-bold ${
                            stat.positive ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {stat.positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                            <span>{stat.change}</span>
                        </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#003366] mb-1">{stat.value}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </motion.div>
            ))}
        </div>
    )
}

const RevenueChart = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg lg:col-span-1"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#003366] mb-1">Q4 Revenue Forecast</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Tracking against annual budget in GBP</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Download size={20} className="text-gray-400" />
                </button>
            </div>

            {/* Chart Area */}
            <div className="h-64 flex items-end justify-between space-x-2">
                {[65, 45, 75, 50, 85, 60, 90, 70, 95, 80, 88, 92].slice(8).map((height, idx) => ( // Showing only 4 months for Q4
                    <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-[#003366] to-[#004488] rounded-t-lg min-w-0 hover:from-[#004488] hover:to-[#005599] transition-all cursor-pointer relative"
                    >
                         {/* Simple tooltip for added value */}
                         <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[#003366] hidden sm:block">
                            {`£${(height / 10).toFixed(1)}K`}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan (F)</span>
            </div>
        </motion.div>
    )
}

const ProjectsChart = () => {
    const projectStats = [
        { label: 'Completed', value: 65, color: 'text-green-600' },
        { label: 'In Progress', value: 25, color: 'text-blue-600' },
        { label: 'Pending', value: 10, color: 'text-orange-600' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg lg:col-span-1"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#003366] mb-1">Project Status</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Current project distribution (48 total)</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Download size={20} className="text-gray-400" />
                </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                {/* Pie Chart Representation */}
                <div className="relative w-40 h-40 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                        {/* Completed */}
                        <circle 
                            cx="80" cy="80" r="70" fill="none" stroke="#10b981" strokeWidth="20"
                            strokeDasharray={`${65 * 4.4} 440`}
                        />
                        {/* In Progress */}
                        <circle 
                            cx="80" cy="80" r="70" fill="none" stroke="#3b82f6" strokeWidth="20"
                            strokeDasharray={`${25 * 4.4} 440`} strokeDashoffset={-65 * 4.4}
                        />
                        {/* Pending */}
                        <circle 
                            cx="80" cy="80" r="70" fill="none" stroke="#f97316" strokeWidth="20"
                            strokeDasharray={`${10 * 4.4} 440`} strokeDashoffset={-(65 + 25) * 4.4}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-black text-[#003366]">48</p>
                            <p className="text-xs text-gray-500">Projects</p>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 flex-1">
                    {projectStats.map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-between min-w-[180px]">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${
                                    stat.label === 'Completed' ? 'bg-green-600' :
                                    stat.label === 'In Progress' ? 'bg-blue-600' :
                                    'bg-orange-600'
                                }`} />
                                <span className="text-sm text-gray-700">{stat.label}</span>
                            </div>
                            <span className={`text-sm font-bold ${stat.color}`}>{stat.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

const RecentEmployees = () => {
    const employees = [
        { name: 'Sarah Johnson', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=1', status: 'active' },
        { name: 'Michael Chen', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=3', status: 'active' },
        { name: 'Emma Wilson', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=5', status: 'away' },
        { name: 'James Brown', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=7', status: 'active' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg lg:col-span-1"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#003366]">Recent Hires</h3>
                <button className="text-xs sm:text-sm text-[#003366] font-semibold hover:text-[#004488]">
                    View All Staff
                </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
                {employees.map((employee, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src={employee.avatar}
                                    alt={employee.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                    employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                }`} />
                            </div>
                            <div>
                                <p className="font-semibold text-[#003366] text-sm">{employee.name}</p>
                                <p className="text-xs text-gray-500">{employee.role}</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical size={16} className="text-gray-400" />
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

const PerformanceReviews = () => {
    const reviews = [
        { name: 'Ben Thompson', rating: 'Excellent', date: '01 Nov', color: 'text-green-600', icon: ThumbsUp },
        { name: 'Laura Hughes', rating: 'Good', date: '25 Oct', color: 'text-blue-600', icon: Award },
        { name: 'Chris O\'Neill', rating: 'Needs Improvement', date: '15 Oct', color: 'text-red-600', icon: AlertCircle },
        { name: 'Hannah Patel', rating: 'Pending', date: 'Scheduled', color: 'text-gray-600', icon: Clock }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg lg:col-span-1"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#003366]">Performance Reviews</h3>
                <button className="text-xs sm:text-sm text-[#003366] font-semibold hover:text-[#004488]">
                    View Calendar
                </button>
            </div>

            <div className="space-y-4">
                {reviews.map((review, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <review.icon size={20} className={review.color} />
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                                <p className="text-xs text-gray-500">{review.rating}</p>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{review.date}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

const ComplianceWidget = () => {
    const complianceItems = [
        { label: 'Pending Leave Requests', value: 3, icon: Calendar, color: 'bg-orange-100 text-orange-600' },
        { label: 'Overdue Compliance Training', value: 1, icon: AlertCircle, color: 'bg-red-100 text-red-600' },
        { label: 'Updated Policy Signatures', value: 'Complete', icon: CheckCircle, color: 'bg-green-100 text-green-600' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg lg:col-span-1"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#003366]">HR & Compliance</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <HeartHandshake size={20} />
                </button>
            </div>

            <div className="space-y-4">
                {complianceItems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                        </div>
                        <span className="font-black text-lg text-[#003366]">{item.value}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}


const ActivityFeed = () => {
    const activities = [
        { icon: UserPlus, text: '**Sarah Johnson** started her role as Frontend Developer', time: '2 hours ago', color: 'text-green-600' },
        { icon: Briefcase, text: 'New project **E-Learning Platform** initiated', time: '4 hours ago', color: 'text-blue-600' },
        { icon: CheckCircle, text: 'Mobile App Redesign **milestone completed**', time: '6 hours ago', color: 'text-purple-600' },
        { icon: AlertCircle, text: '**AI Chatbot Integration** project flagged as at-risk', time: '8 hours ago', color: 'text-red-600' },
        { icon: FileText, text: 'Q4 Budget report submitted for sign-off', time: '1 day ago', color: 'text-gray-600' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
        >
            <h3 className="text-lg sm:text-xl font-bold text-[#003366] mb-4 sm:mb-6">System Activity Log</h3>
            <div className="space-y-4">
                {activities.map((activity, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                            <activity.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: activity.text }} />
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default AdminDashboard