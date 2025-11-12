import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Smartphone,
  Mail,
  Clock,
  Activity,
  Save,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Users,
  Settings
} from 'lucide-react'

const SecuritySettings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [showApiKey, setShowApiKey] = useState(false)
  const [show2FA, setShow2FA] = useState(false)

  const [settings, setSettings] = useState({
    // Authentication
    twoFactorRequired: true,
    passwordMinLength: 12,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 3600,
    
    // IP Restrictions
    ipWhitelistEnabled: true,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    
    // Security Logs
    logLoginAttempts: true,
    logPasswordChanges: true,
    logPermissionChanges: true,
    logDataAccess: true,
    logRetention: 365,
    
    // Encryption
    encryptionEnabled: true,
    encryptionAlgorithm: 'AES-256',
    sslEnabled: true,
    tlsVersion: '1.3',
    
    // API Security
    apiKeyRotation: 90,
    rateLimitEnabled: true,
    rateLimit: 1000,
    corsEnabled: true,
    allowedOrigins: ['https://slbrothers.co.uk']
  })

  const tabs = [
    { id: 'general', label: 'General', icon: Shield },
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'ip_security', label: 'IP Security', icon: Globe },
    { id: 'encryption', label: 'Encryption', icon: Lock },
    { id: 'api_security', label: 'API Security', icon: Activity },
    { id: 'audit', label: 'Audit Logs', icon: FileText }
  ]

  const securityAlerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Multiple Failed Login Attempts',
      message: '15 failed login attempts from IP 203.0.113.5',
      timestamp: '5 mins ago',
      action: 'IP has been temporarily blocked'
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Password Expiry Warning',
      message: '12 user passwords will expire in 7 days',
      timestamp: '2 hours ago',
      action: 'Notification sent to users'
    },
    {
      id: 3,
      severity: 'low',
      title: 'SSL Certificate Renewal',
      message: 'SSL certificate will expire in 45 days',
      timestamp: '1 day ago',
      action: 'Auto-renewal configured'
    }
  ]

  const recentSecurityEvents = [
    { event: 'Admin login from new device', user: 'admin@slbrothers.co.uk', ip: '192.168.1.100', time: '5 mins ago', status: 'success' },
    { event: 'Failed 2FA verification', user: 'user@example.com', ip: '45.33.22.11', time: '15 mins ago', status: 'failed' },
    { event: 'Password changed', user: 'sarah.j@slbrothers.co.uk', ip: '192.168.1.105', time: '1 hour ago', status: 'success' },
    { event: 'API key regenerated', user: 'system', ip: '127.0.0.1', time: '3 hours ago', status: 'success' },
    { event: 'Suspicious activity detected', user: 'unknown', ip: '203.0.113.5', time: '5 hours ago', status: 'blocked' }
  ]

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-orange-100 text-orange-700 border-orange-300',
      low: 'bg-blue-100 text-blue-700 border-blue-300'
    }
    return colors[severity] || colors.low
  }

  const getStatusColor = (status) => {
    const colors = {
      success: 'text-green-600',
      failed: 'text-red-600',
      blocked: 'text-orange-600'
    }
    return colors[status] || 'text-gray-600'
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
              <Shield className="mr-3 text-red-600" size={36} />
              Security Settings
            </h1>
            <p className="text-gray-600">Configure system-wide security policies and controls</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50">
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg">
              <Save size={20} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Security Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="mr-2 text-orange-600" size={28} />
          Security Alerts
        </h2>
        <div className="space-y-4">
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border-2 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle size={20} />
                    <h3 className="font-bold">{alert.title}</h3>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white">
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="mb-2">{alert.message}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {alert.timestamp}
                    </span>
                    <span className="font-semibold">Action: {alert.action}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
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
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">General Security</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Security Status</p>
                    <p className="text-sm text-gray-600">All systems secure</p>
                  </div>
                  <CheckCircle className="text-green-600" size={32} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Shield className="text-blue-600 mb-2" size={24} />
                  <p className="text-2xl font-black text-gray-900">99.9%</p>
                  <p className="text-sm text-gray-600">Security Score</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <Lock className="text-purple-600 mb-2" size={24} />
                  <p className="text-2xl font-black text-gray-900">256-bit</p>
                  <p className="text-sm text-gray-600">Encryption</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <Activity className="text-orange-600 mb-2" size={24} />
                  <p className="text-2xl font-black text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Authentication Tab */}
        {activeTab === 'authentication' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication Settings</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Require 2FA for all admin users</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorRequired}
                      onChange={(e) => setSettings({ ...settings, twoFactorRequired: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Session Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl flex-1">
                  <input
                    type="checkbox"
                    checked={settings.passwordRequireSpecial}
                    onChange={(e) => setSettings({ ...settings, passwordRequireSpecial: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">Require Special Characters</span>
                </label>
                <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl flex-1">
                  <input
                    type="checkbox"
                    checked={settings.passwordRequireNumbers}
                    onChange={(e) => setSettings({ ...settings, passwordRequireNumbers: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">Require Numbers</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* IP Security Tab */}
        {activeTab === 'ip_security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">IP Restrictions</h2>
            
            <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">IP Whitelist</p>
                  <p className="text-sm text-gray-600">Only allow access from whitelisted IPs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.ipWhitelistEnabled}
                    onChange={(e) => setSettings({ ...settings, ipWhitelistEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Whitelisted IP Addresses
              </label>
              <div className="space-y-2">
                {settings.ipWhitelist.map((ip, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={ip}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                    <button className="p-3 text-red-600 hover:bg-red-50 rounded-xl">
                      <XCircle size={20} />
                    </button>
                  </div>
                ))}
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 w-full justify-center text-purple-600 font-semibold">
                  <Globe size={20} />
                  <span>Add IP Address</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Encryption Tab */}
        {activeTab === 'encryption' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Encryption Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Encryption Algorithm
                </label>
                <select
                  value={settings.encryptionAlgorithm}
                  onChange={(e) => setSettings({ ...settings, encryptionAlgorithm: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="AES-256">AES-256</option>
                  <option value="AES-192">AES-192</option>
                  <option value="AES-128">AES-128</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  TLS Version
                </label>
                <select
                  value={settings.tlsVersion}
                  onChange={(e) => setSettings({ ...settings, tlsVersion: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="1.3">TLS 1.3</option>
                  <option value="1.2">TLS 1.2</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Data Encryption</p>
                    <p className="text-sm text-gray-600">Encrypt all data at rest</p>
                  </div>
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>

              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">SSL/TLS</p>
                    <p className="text-sm text-gray-600">Secure connections enabled</p>
                  </div>
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Security Tab */}
        {activeTab === 'api_security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">API Security</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
  type={showApiKey ? 'text' : 'password'}
  value={import.meta.env.VITE_STRIPE_API_KEY || 'API key not configured'}
  readOnly
  className="w-full px-4 py-3 pr-24 border-2 border-gray-200 rounded-xl bg-gray-50 font-mono text-sm"
/>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rate Limit (requests/hour)
                </label>
                <input
                  type="number"
                  value={settings.rateLimit}
                  onChange={(e) => setSettings({ ...settings, rateLimit: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  API Key Rotation (days)
                </label>
                <input
                  type="number"
                  value={settings.apiKeyRotation}
                  onChange={(e) => setSettings({ ...settings, apiKeyRotation: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">CORS Protection</p>
                  <p className="text-sm text-gray-600">Restrict cross-origin requests</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.corsEnabled}
                    onChange={(e) => setSettings({ ...settings, corsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Audit Logs</h2>
            
            <div className="space-y-3">
              {recentSecurityEvents.map((event, idx) => (
                <div key={idx} className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{event.event}</p>
                      <div className="flex gap-4 text-sm text-gray-600 mt-1">
                        <span>User: {event.user}</span>
                        <span>IP: {event.ip}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <span className={`font-bold ${getStatusColor(event.status)}`}>
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default SecuritySettings