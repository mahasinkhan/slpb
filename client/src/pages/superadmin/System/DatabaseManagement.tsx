import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database,
  HardDrive,
  Server,
  Activity,
  Download,
  Upload,
  RefreshCw,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Clock,
  BarChart3,
  PieChart,
  Table,
  FileText,
  Settings,
  Shield,
  Search,
  Filter,
  Eye,
  Play,
  Square,
  TrendingUp,
  Archive
} from 'lucide-react'

const DatabaseManagement = () => {
  const [selectedDb, setSelectedDb] = useState('production')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [showBackupModal, setShowBackupModal] = useState(false)
  const [showQueryModal, setShowQueryModal] = useState(false)

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date())
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const databases = [
    {
      name: 'production',
      status: 'healthy',
      size: '45.2 GB',
      tables: 127,
      connections: 45,
      maxConnections: 100,
      queries: '2.5K/sec',
      uptime: '99.98%',
      lastBackup: '2 hours ago'
    },
    {
      name: 'staging',
      status: 'healthy',
      size: '12.8 GB',
      tables: 127,
      connections: 12,
      maxConnections: 50,
      queries: '450/sec',
      uptime: '99.95%',
      lastBackup: '6 hours ago'
    },
    {
      name: 'development',
      status: 'warning',
      size: '8.4 GB',
      tables: 115,
      connections: 8,
      maxConnections: 30,
      queries: '180/sec',
      uptime: '98.2%',
      lastBackup: '1 day ago'
    }
  ]

  const tables = [
    { name: 'users', rows: 245000, size: '2.4 GB', growth: '+12%', lastModified: '2 mins ago' },
    { name: 'orders', rows: 1250000, size: '8.7 GB', growth: '+23%', lastModified: '5 mins ago' },
    { name: 'products', rows: 45000, size: '1.2 GB', growth: '+5%', lastModified: '1 hour ago' },
    { name: 'transactions', rows: 3200000, size: '15.3 GB', growth: '+34%', lastModified: '3 mins ago' },
    { name: 'logs', rows: 8500000, size: '12.1 GB', growth: '+56%', lastModified: '30 secs ago' },
    { name: 'sessions', rows: 125000, size: '890 MB', growth: '+8%', lastModified: '1 min ago' }
  ]

  const recentQueries = [
    { 
      id: 1, 
      query: 'SELECT * FROM users WHERE status = "active" LIMIT 1000', 
      duration: '0.023s', 
      status: 'success',
      timestamp: '2 mins ago',
      rows: 1000
    },
    { 
      id: 2, 
      query: 'UPDATE orders SET status = "shipped" WHERE id IN (...)', 
      duration: '0.156s', 
      status: 'success',
      timestamp: '5 mins ago',
      rows: 45
    },
    { 
      id: 3, 
      query: 'DELETE FROM sessions WHERE created_at < NOW() - INTERVAL 30 DAY', 
      duration: '1.234s', 
      status: 'success',
      timestamp: '10 mins ago',
      rows: 12450
    },
    { 
      id: 4, 
      query: 'SELECT COUNT(*) FROM transactions WHERE date > "2024-01-01"', 
      duration: '2.567s', 
      status: 'slow',
      timestamp: '15 mins ago',
      rows: 1
    },
    { 
      id: 5, 
      query: 'INSERT INTO logs (user_id, action, timestamp) VALUES (...)', 
      duration: '0.012s', 
      status: 'success',
      timestamp: '18 mins ago',
      rows: 1
    }
  ]

  const metrics = [
    {
      label: 'Total Size',
      value: '66.4 GB',
      change: '+2.3 GB',
      icon: HardDrive,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Connections',
      value: '65',
      change: '+5',
      icon: Activity,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Queries/sec',
      value: '3.1K',
      change: '+234',
      icon: Zap,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Avg Response',
      value: '0.045s',
      change: '-0.003s',
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const currentDb = databases.find(db => db.name === selectedDb)

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
              <Database className="mr-3 text-blue-600" size={36} />
              Database Management
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
              <span className="hidden sm:inline">{autoRefresh ? 'Live' : 'Paused'}</span>
            </button>
            <button
              onClick={() => setShowBackupModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Save size={20} />
              <span>Backup</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                <metric.icon className="text-white" size={20} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-green-600">
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Database Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Select Database</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {databases.map((db) => (
            <button
              key={db.name}
              onClick={() => setSelectedDb(db.name)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedDb === db.name
                  ? 'bg-blue-50 border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 capitalize">{db.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  db.status === 'healthy' ? 'bg-green-100 text-green-700' :
                  db.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {db.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold">{db.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Connections:</span>
                  <span className="font-semibold">{db.connections}/{db.maxConnections}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Queries:</span>
                  <span className="font-semibold">{db.queries}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Current Database Details */}
      {currentDb && (
        <motion.div
          key={selectedDb}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2 capitalize">{currentDb.name} Database</h2>
              <p className="text-blue-100">Currently managing {currentDb.tables} tables with {currentDb.size} of data</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-black">{currentDb.uptime}</div>
                <div className="text-sm text-blue-200">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-black">{currentDb.lastBackup}</div>
                <div className="text-sm text-blue-200">Last Backup</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tables Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Table className="mr-2 text-purple-600" size={28} />
            Tables Overview
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all">
            <Search size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Table Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rows</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Size</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Growth</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Last Modified</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tables.map((table, idx) => (
                <motion.tr
                  key={table.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{table.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {table.rows.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {table.size}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-green-600">{table.growth}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {table.lastModified}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download size={18} />
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

      {/* Recent Queries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Activity className="mr-2 text-green-600" size={28} />
            Recent Queries
          </h2>
          <button
            onClick={() => setShowQueryModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            <Play size={18} />
            <span className="hidden sm:inline">Execute Query</span>
          </button>
        </div>

        <div className="space-y-3">
          {recentQueries.map((query, idx) => (
            <motion.div
              key={query.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <code className="text-sm text-gray-800 font-mono block truncate">
                    {query.query}
                  </code>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {query.duration}
                    </span>
                    <span>{query.rows.toLocaleString()} rows</span>
                    <span>{query.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {query.status === 'success' ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : query.status === 'slow' ? (
                    <AlertTriangle className="text-orange-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: Save, label: 'Full Backup', color: 'blue', action: () => setShowBackupModal(true) },
          { icon: Archive, label: 'Optimize Tables', color: 'green', action: () => alert('Optimizing...') },
          { icon: RefreshCw, label: 'Rebuild Indexes', color: 'purple', action: () => alert('Rebuilding...') },
          { icon: Shield, label: 'Security Audit', color: 'red', action: () => alert('Running audit...') }
        ].map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -5 }}
            onClick={action.action}
            className={`p-6 bg-${action.color}-50 border-2 border-${action.color}-200 rounded-2xl hover:shadow-lg transition-all`}
          >
            <action.icon className={`text-${action.color}-600 mb-3`} size={32} />
            <p className="font-bold text-gray-900">{action.label}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Backup Modal */}
      <AnimatePresence>
        {showBackupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBackupModal(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Backup</h2>
              <p className="text-gray-600 mb-6">
                Create a full backup of the {selectedDb} database. This may take several minutes.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Backup Type
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option>Full Backup</option>
                    <option>Incremental Backup</option>
                    <option>Differential Backup</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Storage Location
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option>AWS S3</option>
                    <option>Google Cloud Storage</option>
                    <option>Local Server</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBackupModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Backup started!')
                    setShowBackupModal(false)
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Start Backup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatabaseManagement