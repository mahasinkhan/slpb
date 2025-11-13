import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Settings,
  Eye,
  EyeOff,
  Key,
  RefreshCw,
  Download,
  Upload,
  Globe,
  Mail,
  MessageSquare,
  Database,
  Cloud,
  CreditCard,
  BarChart3,
  Shield,
  Webhook,
  Code,
  Link
} from 'lucide-react'

interface Integration {
  id: number;
  name: string;
  category: string;
  icon: any;
  description: string;
  status: string;
  color: string;
  config: {
    [key: string]: string;
  } | null;
  features: string[];
}

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showApiKey, setShowApiKey] = useState<{[key: string]: boolean}>({})

  const integrations: Integration[] = [
    {
      id: 1,
      name: 'Stripe',
      category: 'payment',
      icon: CreditCard,
      description: 'Accept payments and manage subscriptions',
      status: 'connected',
      color: 'purple',
      config: {
        apiKey: 'sk_test_51234567890',
        webhookUrl: 'https://slbrothers.co.uk/webhooks/stripe',
        lastSync: '2 hours ago'
      },
      features: ['Payment Processing', 'Subscriptions', 'Invoicing', 'Refunds']
    },
    {
      id: 2,
      name: 'SendGrid',
      category: 'email',
      icon: Mail,
      description: 'Email delivery and marketing automation',
      status: 'connected',
      color: 'blue',
      config: {
        apiKey: 'SG.1234567890abcdef',
        fromEmail: 'noreply@slbrothers.co.uk',
        lastSync: '30 mins ago'
      },
      features: ['Transactional Email', 'Marketing Campaigns', 'Analytics', 'Templates']
    },
    {
      id: 3,
      name: 'AWS S3',
      category: 'storage',
      icon: Cloud,
      description: 'Cloud storage for files and media',
      status: 'connected',
      color: 'orange',
      config: {
        bucketName: 'slbrothers-production',
        region: 'eu-west-2',
        lastSync: '1 hour ago'
      },
      features: ['File Storage', 'CDN', 'Backup', 'Media Delivery']
    },
    {
      id: 4,
      name: 'Slack',
      category: 'communication',
      icon: MessageSquare,
      description: 'Team notifications and alerts',
      status: 'connected',
      color: 'green',
      config: {
        webhookUrl: 'https://hooks.slack.com/services/...',
        channel: '#alerts',
        lastSync: '5 mins ago'
      },
      features: ['Notifications', 'Alerts', 'Team Chat', 'File Sharing']
    },
    {
      id: 5,
      name: 'Google Analytics',
      category: 'analytics',
      icon: BarChart3,
      description: 'Website analytics and tracking',
      status: 'connected',
      color: 'yellow',
      config: {
        trackingId: 'UA-123456789-1',
        propertyId: 'G-XXXXXXXXXX',
        lastSync: '15 mins ago'
      },
      features: ['Traffic Analysis', 'User Behavior', 'Conversion Tracking', 'Real-time Data']
    },
    {
      id: 6,
      name: 'GitHub',
      category: 'development',
      icon: Code,
      description: 'Code repository and version control',
      status: 'available',
      color: 'gray',
      config: null,
      features: ['Code Hosting', 'CI/CD', 'Issue Tracking', 'Collaboration']
    },
    {
      id: 7,
      name: 'Twilio',
      category: 'communication',
      icon: MessageSquare,
      description: 'SMS and voice communication',
      status: 'available',
      color: 'red',
      config: null,
      features: ['SMS', 'Voice Calls', '2FA', 'Notifications']
    },
    {
      id: 8,
      name: 'Cloudflare',
      category: 'security',
      icon: Shield,
      description: 'CDN, security, and performance',
      status: 'connected',
      color: 'orange',
      config: {
        zoneId: 'abc123def456',
        apiKey: 'cf_1234567890',
        lastSync: '10 mins ago'
      },
      features: ['CDN', 'DDoS Protection', 'SSL/TLS', 'Firewall']
    }
  ]

  const webhooks = [
    {
      id: 1,
      name: 'Order Created',
      url: 'https://api.slbrothers.co.uk/webhooks/orders',
      events: ['order.created', 'order.updated'],
      status: 'active',
      lastTriggered: '5 mins ago',
      successRate: 99.8
    },
    {
      id: 2,
      name: 'User Registration',
      url: 'https://api.slbrothers.co.uk/webhooks/users',
      events: ['user.created', 'user.verified'],
      status: 'active',
      lastTriggered: '1 hour ago',
      successRate: 100
    },
    {
      id: 3,
      name: 'Payment Events',
      url: 'https://api.slbrothers.co.uk/webhooks/payments',
      events: ['payment.succeeded', 'payment.failed'],
      status: 'active',
      lastTriggered: '2 hours ago',
      successRate: 98.5
    }
  ]

  const categories = [
    { id: 'all', label: 'All', count: integrations.length },
    { id: 'payment', label: 'Payment', count: 1 },
    { id: 'email', label: 'Email', count: 1 },
    { id: 'storage', label: 'Storage', count: 1 },
    { id: 'communication', label: 'Communication', count: 2 },
    { id: 'analytics', label: 'Analytics', count: 1 },
    { id: 'security', label: 'Security', count: 1 },
    { id: 'development', label: 'Development', count: 1 }
  ]

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || integration.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getIconColor = (color: string) => {
    const colors: {[key: string]: string} = {
      purple: 'text-purple-600',
      blue: 'text-blue-600',
      orange: 'text-orange-600',
      green: 'text-green-600',
      yellow: 'text-yellow-600',
      gray: 'text-gray-600',
      red: 'text-red-600'
    }
    return colors[color] || 'text-gray-600'
  }

  const getBgColor = (color: string) => {
    const colors: {[key: string]: string} = {
      purple: 'bg-purple-50',
      blue: 'bg-blue-50',
      orange: 'bg-orange-50',
      green: 'bg-green-50',
      yellow: 'bg-yellow-50',
      gray: 'bg-gray-50',
      red: 'bg-red-50'
    }
    return colors[color] || 'bg-gray-50'
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
              <Zap className="mr-3 text-yellow-600" size={36} />
              Integrations
            </h1>
            <p className="text-gray-600">Connect external services and manage API integrations</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50">
              <Settings size={20} />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg">
              <Plus size={20} />
              <span>Add Integration</span>
            </button>
          </div>
        </div>
      </motion.div>

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
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  filterCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredIntegrations.map((integration, idx) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedIntegration(integration)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {/* Icon & Status */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 ${getBgColor(integration.color)} rounded-xl flex items-center justify-center`}>
                <integration.icon className={getIconColor(integration.color)} size={28} />
              </div>
              {integration.status === 'connected' ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                  AVAILABLE
                </div>
              )}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {integration.features.slice(0, 2).map((feature, fidx) => (
                <span key={fidx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                  {feature}
                </span>
              ))}
              {integration.features.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                  +{integration.features.length - 2} more
                </span>
              )}
            </div>

            {/* Action */}
            <button className={`w-full px-4 py-2 rounded-xl font-semibold transition-all ${
              integration.status === 'connected'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              {integration.status === 'connected' ? 'Configure' : 'Connect'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Webhooks Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Webhook className="mr-2 text-purple-600" size={28} />
            Webhooks
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700">
            <Plus size={18} />
            <span>New Webhook</span>
          </button>
        </div>

        <div className="space-y-3">
          {webhooks.map((webhook, idx) => (
            <motion.div
              key={webhook.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{webhook.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      webhook.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {webhook.status.toUpperCase()}
                    </span>
                  </div>
                  <code className="text-sm text-gray-600 block mb-2">{webhook.url}</code>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event, eidx) => (
                      <span key={eidx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="font-bold text-green-600">{webhook.successRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last Triggered</p>
                    <p className="font-semibold text-gray-900">{webhook.lastTriggered}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Settings size={18} />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Integration Detail Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIntegration(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${getBgColor(selectedIntegration.color)} rounded-xl flex items-center justify-center`}>
                      <selectedIntegration.icon className={getIconColor(selectedIntegration.color)} size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedIntegration.name}</h2>
                      <p className="text-gray-600">{selectedIntegration.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className={`p-4 rounded-xl border-2 ${
                  selectedIntegration.status === 'connected'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">Status</p>
                      <p className="text-sm text-gray-600">
                        {selectedIntegration.status === 'connected' ? 'Connected and operational' : 'Not connected'}
                      </p>
                    </div>
                    {selectedIntegration.status === 'connected' ? (
                      <CheckCircle className="text-green-600" size={32} />
                    ) : (
                      <XCircle className="text-gray-400" size={32} />
                    )}
                  </div>
                </div>

                {/* Configuration */}
                {selectedIntegration.config && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Configuration</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedIntegration.config).map(([key, value], idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <div className="flex items-center justify-between">
                            <code className="text-sm font-mono text-gray-900">{String(value)}</code>
                            {key.includes('Key') || key.includes('key') ? (
                              <button
                                onClick={() => setShowApiKey(prev => ({ ...prev, [key]: !prev[key] }))}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                {showApiKey[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedIntegration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                        <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                        <span className="text-sm font-semibold text-gray-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  {selectedIntegration.status === 'connected' ? (
                    <>
                      <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                        <Settings className="inline mr-2" size={18} />
                        Configure
                      </button>
                      <button className="flex-1 px-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50">
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                      <Link className="inline mr-2" size={18} />
                      Connect Integration
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Integrations