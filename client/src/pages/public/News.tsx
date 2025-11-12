// @ts-nocheck
import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Brain,
  Lightbulb,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  Filter,
  TrendingUp,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  ThumbsUp,
  Play,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Award,
  Target,
  Rocket,
  Code,
  Users,
  Building,
  Newspaper,
  Video,
  Mic,
  ExternalLink,
  Download,
  Bell,
  Star,
  TrendingDown,
  Activity,
  BarChart,
  PieChart,
  LineChart,
  Rss,
  Mail,
  Twitter,
  Linkedin,
  Facebook,
  X,
  MapPin,
  GalleryHorizontal,
  Cloud,
  Layers,
  Heart,
  Settings,
  ShieldCheck,
  Package,
  Cpu,
  RefreshCw,
  Gauge,
  HelpCircle,
  FolderOpen
} from 'lucide-react'

// --- 1. SLB Custom Color Configuration (Mapping Hex to Tailwind) ---
// Note: Tailwind uses a scale, so we map Primary Blue to 'blue-900', 
// Accent Orange to 'orange-600', and Accent Silver to 'gray-400'.
const SLB_COLORS = {
  PrimaryBlue: '#003366', // Tailwind equivalent: blue-900
  AccentOrange: '#FF7A00', // Tailwind equivalent: orange-600
  AccentSilver: '#C0C0C0', // Tailwind equivalent: gray-400
  TaglineBlue: 'rgba(0, 51, 102, 0.7)',
}

// Mock Data for a full page simulation
const mockNewsArticles = [
  { id: 1, title: 'SLB Launches Next-Gen AI Learning Platform', excerpt: 'Our new platform integrates generative AI models to provide personalized, adaptive learning paths for every user, setting a new standard in EdTech.', image: 'https://images.unsplash.com/photo-1546410531-bb4ec63e9c52?auto=format&fit=crop&w=800&q=80', category: 'education', author: 'J. Davis', date: 'Nov 5, 2025', views: '2.5K', likes: 450, readTime: '5 min', tags: ['AI', 'EdTech', 'Learning'] },
  { id: 2, title: 'The Ethics of Quantum Computing in Financial Services', excerpt: 'A deep dive into SLB’s latest research on securing quantum communications and ensuring ethical deployment of advanced algorithms in the finance sector.', image: 'https://images.unsplash.com/photo-1629904851287-21950d296c69?auto=format&fit=crop&w=800&q=80', category: 'research', author: 'Dr. L. Chen', date: 'Oct 30, 2025', views: '4.1K', likes: 780, readTime: '8 min', tags: ['Quantum', 'Security', 'Research'] },
  { id: 3, title: 'SL Brothers Expands Partnership with Global Tech Innovators', excerpt: 'We are excited to announce a strategic alliance aimed at bridging the gap between cutting-edge IT services and educational curriculum development.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb197135?auto=format&fit=crop&w=800&q=80', category: 'company', author: 'A. Sharma', date: 'Oct 25, 2025', views: '1.8K', likes: 320, readTime: '4 min', tags: ['Partnership', 'IT', 'Strategy'] },
];

const mockVideos = [
  { id: 1, title: 'AI Ethics in Practice', duration: '12:30', views: '55K', date: 'Oct 28, 2025', image: 'https://images.unsplash.com/photo-1516321497487-e288fb197135?auto=format&fit=crop&w=800&q=80', category: 'ai' },
  { id: 2, title: 'Deep Dive: Quantum Computing for Beginners', duration: '20:15', views: '78K', date: 'Oct 20, 2025', image: 'https://images.unsplash.com/photo-1629904851287-21950d296c69?auto=format&fit=crop&w=800&q=80', category: 'research' },
  { id: 3, title: 'Future of Remote Education', duration: '9:45', views: '42K', date: 'Nov 1, 2025', image: 'https://images.unsplash.com/photo-1546410531-bb4ec63e9c52?auto=format&fit=crop&w=800&q=80', category: 'education' },
]

const mockPodcasts = [
  { id: 1, title: 'The Innovation Mindset', episode: 45, duration: '45 min', guests: 'Dr. A. Sharma', date: 'Nov 6, 2025', category: 'ai' },
  { id: 2, title: 'Scaling Education Tech', episode: 44, duration: '32 min', guests: 'M. Johnson', date: 'Oct 30, 2025', category: 'education' },
  { id: 3, title: 'Behind the Research: Ethical AI', episode: 43, duration: '50 min', guests: 'Prof. L. Chen', date: 'Oct 23, 2025', category: 'research' },
]

const mockTrends = [
  { id: 1, topic: 'Generative AI', count: '150 articles', icon: Zap, color: 'text-orange-600' },
  { id: 2, topic: 'EdTech Funding', count: '98 articles', icon: TrendingUp, color: 'text-blue-600' },
  { id: 3, topic: 'Quantum Security', count: '72 articles', icon: ShieldCheck, color: 'text-gray-600' },
  { id: 4, topic: 'Personalized Learning', count: '120 articles', icon: User, color: 'text-purple-600' },
]


// --- 2. Utility Components (Updated with SLB Colors) ---

// Custom Button Component
const Button = ({ children, className = '', variant = 'primary', size = 'md', onClick, type = 'button', disabled = false }) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed border-2'
  const variants = {
    // Primary is now Accent Orange for high contrast
    primary: 'bg-orange-600 border-orange-600 text-white hover:bg-orange-700 hover:border-orange-700 shadow-lg',
    // Outline uses Primary Blue (blue-900)
    outline: 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white',
    // Ghost uses Primary Blue
    ghost: 'border-transparent text-blue-900 hover:bg-blue-50',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      type={type as any}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

// Custom Card Component
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl ${className}`}>
      {children}
    </div>
  )
}

// Custom Section Heading Component
const SectionHeading = ({ title, subtitle, icon: Icon, color = 'text-orange-600' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className={`inline-flex items-center space-x-3 text-sm font-bold uppercase tracking-widest ${color} mb-3`}>
        {Icon && <Icon size={24} />}
        <span>{subtitle}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 font-['Poppins']">
        {title}
      </h2>
      <div className="w-20 h-1 bg-orange-600 mx-auto mt-4 rounded-full" />
    </motion.div>
  )
}

// --- 3. SL Brothers Logo Header Component (Emphasized Styles) ---

const SLBHeader = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={containerRef}
      className="p-8 bg-white shadow-lg font-['Poppins']"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Circular Logo Icon */}
        <motion.div
          initial={{ rotate: -180, scale: 0.5 }}
          animate={isInView ? { rotate: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.3 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mr-6"
          style={{ backgroundColor: SLB_COLORS.PrimaryBlue, boxShadow: `0 0 15px ${SLB_COLORS.AccentSilver}` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* The combined icon: Rocket for IT/Progress, BookOpen for Education/Empowering */}
            <Rocket size={32} className="text-orange-400 absolute" style={{ transform: 'translate(4px, -4px)' }} />
            <BookOpen size={32} className="text-white" style={{ transform: 'translate(-4px, 4px)' }} />
          </motion.div>
        </motion.div>

        {/* Text Hierarchy */}
        <div className="text-center">
          {/* Main Focus: SLB - Extra Bold, Uppercase, Primary Blue */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-5xl font-black uppercase tracking-widest"
            style={{ color: SLB_COLORS.PrimaryBlue, fontWeight: 900, letterSpacing: '0.2rem' }}
          >
            SLB
          </motion.h1>

          {/* Supporting Line: SL Brothers - Normal Weight, Primary Blue */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg uppercase tracking-widest mt-1"
            style={{ color: SLB_COLORS.PrimaryBlue, fontWeight: 400, letterSpacing: '0.2rem' }}
          >
            SL Brothers
          </motion.h2>

          {/* Emotional Touch: Tagline - Italic, Semi-Transparent */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-2 text-sm italic"
            style={{ color: SLB_COLORS.TaglineBlue }}
          >
            Empowering Progress Together
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

// --- 4. Core News Components (Updated with Accent Orange) ---

const NewsCard = ({ article, index, onClick }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  const categoryColor = useMemo(() => {
    switch (article.category) {
      case 'education': return 'bg-orange-600'; // Accent Orange for key category
      case 'research': return 'bg-blue-600';
      case 'company': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  }, [article.category])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="h-full overflow-hidden p-0 group hover:shadow-2xl transition-shadow duration-500">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <motion.img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" /> {/* Primary Blue overlay */}

          <div className="absolute top-4 left-4">
            <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
              {article.title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">{article.excerpt}</p>
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
            {/* Metadata using Accent Orange icons */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <User size={14} className="text-orange-600" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} className="text-orange-600" />
                <span>{article.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{article.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp size={14} />
                <span>{article.likes}</span>
              </div>
            </div>
          </div>
          {/* Dynamic Hover Line (Accent Orange) */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-orange-600 rounded-full mt-4"
          />
        </div>
      </Card>
    </motion.div>
  )
}

const NewsListItem = ({ article, index, onClick }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.01, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Primary Blue border accent */}
      <Card className="p-4 md:p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 border-l-4 border-blue-900 hover:border-orange-600 transition-all duration-300">
        <div className="w-full md:w-56 flex-shrink-0 h-40 md:h-32 overflow-hidden rounded-xl">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase mb-2">
            <Tag size={14} className="text-orange-600" />
            <span className="text-blue-900">{article.category}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{article.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{article.excerpt}</p>
          <div className="flex flex-wrap items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <ChevronRight size={24} className="text-gray-400 group-hover:text-orange-600 transition-colors hidden md:block" />
          <Button size="sm" className="md:hidden mt-2" variant="primary">Read</Button>
        </div>
      </Card>
    </motion.div>
  )
}

const ArticleModal = ({ article, onClose }) => {
  if (!article) return null

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }

  const content = (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 z-10 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="relative h-64 sm:h-96 overflow-hidden rounded-t-3xl">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
          <h2 className="absolute bottom-4 left-6 right-6 text-3xl sm:text-4xl font-black text-white">{article.title}</h2>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 space-x-4">
            <div className="flex items-center space-x-1">
              <User size={16} className="text-orange-600" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} className="text-orange-600" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} className="text-orange-600" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold border-l-4 border-orange-600 pl-4">{article.excerpt}</p>

          <div className="prose max-w-none text-gray-800 space-y-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in euismod urna. Maecenas sed nunc vitae metus convallis ultrices nec nec est. Proin vel ex enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vitae leo non ex vehicula semper.</p>
            <h3 className="text-2xl font-bold pt-4 text-blue-900">In-Depth Analysis</h3>
            <p>Donec nec odio non sem auctor sollicitudin. Aenean consectetur mi eget tortor facilisis, a vehicula felis dictum. Aliquam erat volutpat. Fusce euismod, nulla in pretium lacinia, nisl mauris luctus nunc, at hendrerit turpis purus at libero. Nunc vel ex a quam vulputate ultricies vitae a metus.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>**AI Integration:** Seamlessly integrating new AI models.</li>
              <li>**Educational Outcomes:** Measuring impact on student performance.</li>
              <li>**Global Reach:** Expanding our platform to new continents.</li>
            </ul>
            <blockquote className="bg-gray-100 p-4 border-l-4 border-blue-900 italic text-gray-600">
              "Innovation is the bridge between aspiration and achievement. We are committed to building that bridge." - {article.author}
            </blockquote>
          </div>

          <div className="mt-8 border-t pt-6 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Tag size={16} />
              <span className="font-semibold">Tags:</span>
              {(article.tags || []).map((tag, i) => (
                <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors">#{tag}</span>
              ))}
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button size="sm" variant="outline">
                <Share2 size={16} className="mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  return <AnimatePresence>{article && content}</AnimatePresence>
}


// --- 5. Extended Dynamic Content Sections ---

const Interactive3DNewsroom = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-150px" })

  const NewsCube = ({ icon: Icon, title, delay }) => (
    <motion.div
      initial={{ opacity: 0, rotateX: 90, scale: 0.5 }}
      animate={isInView ? { opacity: 1, rotateX: 0, scale: 1 } : {}}
      transition={{ delay: delay, duration: 0.7, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -10, rotateZ: 5 }}
      className="p-8 bg-white rounded-xl shadow-2xl transform-gpu perspective-1000 cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex flex-col items-center text-center">
        <Icon size={48} className="text-orange-600 mb-4" />
        <h4 className="text-xl font-bold text-blue-900">{title}</h4>
      </div>
    </motion.div>
  )

  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: SLB_COLORS.PrimaryBlue }}>
      <div className="container mx-auto px-4">
        <SectionHeading title="Interactive Newsroom" subtitle="Dive Deeper" icon={Layers} color="text-orange-400" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <NewsCube icon={Brain} title="AI & ML Feed" delay={0.2} />
          <NewsCube icon={BookOpen} title="Education Hub" delay={0.4} />
          <NewsCube icon={Code} title="Tech Development" delay={0.6} />
          <NewsCube icon={Globe} title="Global Perspective" delay={0.8} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="text-center mt-12"
        >
          <Button variant="primary" size="lg" className="mt-4">
            <span className="flex items-center space-x-2">
              <Rocket size={20} />
              <span>Launch Interactive Experience</span>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

const VideoSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Video Updates & Tutorials" subtitle="Watch & Learn" icon={Video} color="text-orange-600" />

        <div className="grid md:grid-cols-3 gap-8">
          {mockVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-0 overflow-hidden relative group">
                <div className="relative h-52 overflow-hidden">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: index % 2 === 0 ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                    >
                      <Play size={24} className="text-white fill-current ml-1" />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-blue-900 line-clamp-2 mb-2">{video.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} className="text-orange-600" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{video.views} Views</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="md">
            <Video size={20} className="mr-2" /> View All Videos
          </Button>
        </div>
      </div>
    </section>
  )
}

const PodcastSection = () => {
  return (
    <section className="py-24" style={{ backgroundColor: SLB_COLORS.PrimaryBlue }}>
      <div className="container mx-auto px-4">
        <SectionHeading title="Podcast Episodes" subtitle="Listen to Experts" icon={Mic} color="text-orange-400" />

        <div className="grid md:grid-cols-3 gap-8">
          {mockPodcasts.map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            >
              <Card className="bg-blue-800 text-white p-6 h-full border-b-4 border-orange-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Mic size={24} className="text-orange-400" />
                    <span className="text-sm font-semibold text-orange-400 uppercase">{podcast.category}</span>
                  </div>
                  <span className="text-xs bg-blue-900/50 px-3 py-1 rounded-full">Ep. {podcast.episode}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{podcast.title}</h3>
                <p className="text-sm text-blue-200 mb-4">Guests: {podcast.guests}</p>
                <div className="flex items-center justify-between text-sm text-blue-200 border-t border-blue-700 pt-4">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{podcast.duration}</span>
                  </div>
                  <Button size="sm" variant="primary">
                    <Play size={16} className="mr-1 fill-current" /> Listen
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900" size="md">
            <Mic size={20} className="mr-2" /> All Episodes
          </Button>
        </div>
      </div>
    </section>
  )
}

const TrendingTopics = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Trending Topics Now" subtitle="Hot Articles" icon={TrendingUp} color="text-orange-600" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            >
              <Card className="flex items-center space-x-4 p-4 border-l-4 border-orange-600 hover:border-blue-900 transition-colors">
                <trend.icon size={36} className={`${trend.color} flex-shrink-0`} />
                <div>
                  <h4 className="font-bold text-blue-900">{trend.topic}</h4>
                  <p className="text-sm text-gray-500">{trend.count}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const NewsletterSignup = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Subscribed with: ${email}`)
    setEmail('')
  }

  return (
    <section ref={ref} className="py-24 bg-orange-600 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-10 hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Bell size={200} className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Sparkles size={48} className="text-yellow-300 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get the Edge. Subscribe Today.
          </h2>
          <p className="text-xl text-orange-200 mb-8">
            Receive exclusive insights on AI, education technology, and company news directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-3 rounded-lg border-2 border-white text-blue-900 focus:outline-none focus:border-orange-900"
            />
            <Button type="submit" variant="primary" size="md" className="bg-blue-900 border-blue-900 hover:bg-blue-800 hover:border-blue-800">
              <Mail size={20} className="mr-2" /> Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// --- 6. Main Application Component ---

const SLBNewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)

  const handleArticleClick = (article) => {
    setSelectedArticle(article)
  }

  const closeModal = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins']">
      <SLBHeader />

      <main>
        {/* Featured News Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeading title="Latest News & Insights" subtitle="SLB Today" icon={Newspaper} color="text-blue-900" />
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {mockNewsArticles.slice(0, 3).map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  index={index}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </div>
            <div className="text-center">
                <Button variant="primary" size="lg">
                    <TrendingUp size={20} className="mr-2" /> Explore All Content
                </Button>
            </div>
          </div>
        </section>
        
        <TrendingTopics />
        <VideoSection />
        <PodcastSection />
        <Interactive3DNewsroom />
        <NewsletterSignup />

      </main>

      <AnimatePresence>
        <ArticleModal article={selectedArticle} onClose={closeModal} />
      </AnimatePresence>

      <footer className="py-12 text-center text-sm" style={{ backgroundColor: SLB_COLORS.PrimaryBlue, color: SLB_COLORS.AccentSilver }}>
        © {new Date().getFullYear()} SL Brothers. Empowering Progress Together.
      </footer>
    </div>
  )
}

// Export the main component for use in a React application
export default SLBNewsPage