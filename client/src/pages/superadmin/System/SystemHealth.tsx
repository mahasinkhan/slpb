import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Globe,
  Shield,
  Lock,
  Unlock,
  BarChart3,
  PieChart,
  Terminal,
  Code,
  Cloud,
  Power
} from 'lucide-react'

const SystemHealth = () => {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date())
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  // Mock system metrics (replace with actual monitoring data)
  const systemStatus = {
    overall: 'operational', // operational, degraded, down
    uptime: '99.98%',
    uptimeDays: 347,
    lastIncident: '12 days ago'
  }

  const services = [
    {
      name: 'Web Server',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '24ms',
      requests: '1.2M/day',
      load: 45,
      icon: Server,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '100%',
      responseTime: '12ms',
      connections: '156/200',
      load: 78,
      icon: Database,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '18ms',
      requests: '500K/day',
      load: 62,
      icon: Code,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '15ms',
      verifications: '50K/day',
      load: 34,
      icon: Lock,
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Email Service',
      status: 'degraded',
      uptime: '97.2%',
      responseTime: '340ms',
      sent: '25K/day',
      load: 89,
      icon: Globe,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      name: 'Cloud Storage',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '45ms',
      storage: '1.2TB/2TB',
      load: 60,
      icon: Cloud,
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  const serverMetrics = [
    { label: 'CPU Usage', value: 68, max: 100, unit: '%', icon: Cpu, color: 'text-blue-600' },
    { label: 'Memory', value: 12.5, max: 16, unit: 'GB', icon: HardDrive, color: 'text-green-600' },
    { label: 'Disk Usage', value: 450, max: 1000, unit: 'GB', icon: HardDrive, color: 'text-purple-600' },
    { label: 'Network I/O', value: 125, max: 1000, unit: 'Mbps', icon: Wifi, color: 'text-orange-600' }
  ]

  const recentIncidents = [
    {
      id: 1,
      title: 'Email Service Latency',
      status: 'investigating',
      severity: 'medium',
      time: '2h ago',
      description: 'Email service experiencing high latency',
      updates: 3
    },
    {
      id: 2,
      title: 'Database Connection Pool',
      status: 'resolved',
      severity: 'low',
      time: '1 day ago',
      description: 'Connection pool exhaustion resolved',
      updates: 5
    },
    {
      id: 3,
      title: 'API Rate Limiting',
      status: 'resolved',
      severity: 'high',
      time: '3 days ago',
      description: 'Rate limiting causing 429 errors',
      updates: 8
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50 border-green-200'
      case 'degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'down': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle className="text-green-600" size={20} />
      case 'degraded': return <AlertTriangle className="text-yellow-600" size={20} />
      case 'down': return <XCircle className="text-red-600" size={20} />
      default: return <Activity className="text-gray-600" size={20} />
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
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 flex items-center">
              <Activity className="mr-3 text-green-600" size={36} />
              System Health Monitor
            </h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock size={16} />
              <span className="text-sm">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <RefreshCw size={20} className={autoRefresh ? 'animate-spin' : ''} />
              <span>{autoRefresh ? 'Live' : 'Paused'}</span>
            </button>
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50">
              <Download size={20} />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Overall Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-8 mb-8 border-2 ${
          systemStatus.overall === 'operational' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
            : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {systemStatus.overall === 'operational' ? (
              <CheckCircle size={48} />
            ) : (
              <AlertTriangle size={48} />
            )}
            <div>
              <h2 className="text-3xl font-black mb-1">
                All Systems {systemStatus.overall === 'operational' ? 'Operational' : 'Degraded'}
              </h2>
              <p className="text-white/90">Everything is running smoothly across all services</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-8 text-center">
            <div>
              <div className="text-4xl font-black">{systemStatus.uptime}</div>
              <div className="text-sm opacity-90">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-black">{systemStatus.uptimeDays}</div>
              <div className="text-sm opacity-90">Days Up</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                <service.icon className="text-white" size={28} />
              </div>
              {getStatusIcon(service.status)}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
            <p className={`text-sm font-semibold mb-4 capitalize ${
              service.status === 'operational' ? 'text-green-600' :
              service.status === 'degraded' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {service.status}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uptime</span>
                <span className="font-bold text-gray-900">{service.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Time</span>
                <span className="font-bold text-gray-900">{service.responseTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Load</span>
                <span className="font-bold text-gray-900">{service.load}%</span>
              </div>
              
              {/* Load Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${service.load}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  className={`h-full ${
                    service.load < 60 ? 'bg-green-500' :
                    service.load < 80 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Server Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Server className="mr-2 text-blue-600" size={28} />
          Server Resource Usage
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serverMetrics.map((metric, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <metric.icon size={20} className={metric.color} />
                  <span className="font-semibold text-gray-900">{metric.label}</span>
                </div>
                <span className={`text-2xl font-black ${metric.color}`}>
                  {metric.value}{metric.unit}
                </span>
              </div>
              
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className={`h-full ${
                    (metric.value / metric.max) < 0.6 ? 'bg-green-500' :
                    (metric.value / metric.max) < 0.8 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{metric.max}{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="mr-2 text-purple-600" size={28} />
            Response Time Trend
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600">Last Hour</span>
            </div>
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="h-64 flex items-end justify-between space-x-1">
          {Array.from({ length: 24 }, (_, i) => Math.random() * 100 + 20).map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: idx * 0.02, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg min-w-0 hover:opacity-80 cursor-pointer"
            />
          ))}
        </div>
        
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span>1h ago</span>
          <span>30m ago</span>
          <span>Now</span>
        </div>
      </motion.div>

      {/* Recent Incidents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="mr-2 text-orange-600" size={28} />
          Recent Incidents
        </h2>

        <div className="space-y-4">
          {recentIncidents.map((incident, idx) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                incident.status === 'resolved' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-gray-900">{incident.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      incident.status === 'resolved' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {incident.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{incident.time}</span>
                    </span>
                    <span>{incident.updates} updates</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  incident.severity === 'high' ? 'bg-red-100 text-red-700' :
                  incident.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {incident.severity.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SystemHealth