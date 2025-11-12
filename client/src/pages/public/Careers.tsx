import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Rocket,
  Heart,
  Award,
  TrendingUp,
  Coffee,
  Laptop,
  Globe,
  Zap,
  Shield,
  Target,
  BookOpen,
  Code,
  ArrowRight,
  Search,
  Filter,
  X,
  ChevronDown,
  CheckCircle,
  Star,
  Calendar,
  Send,
  Upload,
  User,
  Mail,
  Phone,
  FileText,
  GraduationCap,
  Building,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Gift,
  Plane,
  Settings,
  Headset,
  ClipboardList,
  Lightbulb,
  PieChart
} from 'lucide-react'

// --- Types for Job Data ---
interface Job {
  id: number
  title: string
  department: 'engineering' | 'design' | 'marketing' | 'sales' | 'operations'
  location: 'remote' | 'london' | 'new york' | 'tokyo' | 'berlin'
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string[]
  responsibilities: string[]
  salary: string
  applicants: number
  posted: string
  tags: string[]
}

// --- Mock Job Data ---
const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer (React/TS)',
    department: 'engineering',
    location: 'remote',
    type: 'full-time',
    description: 'Design and implement robust, scalable, and user-friendly frontend applications using React and TypeScript. Work closely with product and design teams.',
    requirements: ['5+ years of experience with React/Redux/Hooks.', 'Strong proficiency in TypeScript.', 'Experience with Tailwind CSS/Styled Components.', 'Excellent communication skills.'],
    responsibilities: ['Develop new user-facing features.', 'Build reusable components and front-end libraries.', 'Optimize application for maximum speed and scalability.', 'Collaborate with backend developers.'],
    salary: '$120k - $160k',
    applicants: 42,
    posted: '2 days ago',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion']
  },
  {
    id: 2,
    title: 'Product Designer (UX/UI)',
    department: 'design',
    location: 'london',
    type: 'full-time',
    description: 'Lead the design process from concept to final product, focusing on user experience and creating visually appealing interfaces.',
    requirements: ['3+ years of professional UX/UI design experience.', 'Expertise in Figma or Sketch.', 'Strong portfolio showcasing product design.', 'Knowledge of design systems.'],
    responsibilities: ['Conduct user research and testing.', 'Create wireframes, prototypes, and high-fidelity designs.', 'Iterate based on user feedback and business goals.', 'Maintain and evolve the design system.'],
    salary: '$80k - $110k',
    applicants: 28,
    posted: '5 days ago',
    tags: ['Figma', 'UX Research', 'Design System', 'Prototyping']
  },
  {
    id: 3,
    title: 'Content Marketing Specialist',
    department: 'marketing',
    location: 'new york',
    type: 'full-time',
    description: 'Develop and execute a content strategy that drives organic traffic, increases brand awareness, and supports lead generation efforts.',
    requirements: ['2+ years in content marketing/SEO.', 'Exceptional writing and editing skills.', 'Experience with content management systems (CMS).', 'Familiarity with marketing analytics.'],
    responsibilities: ['Write, edit, and publish blog posts, guides, and website copy.', 'Manage the content calendar.', 'Optimize content for SEO.', 'Analyze content performance.'],
    salary: '$60k - $90k',
    applicants: 55,
    posted: '1 week ago',
    tags: ['SEO', 'Content Strategy', 'Blogging', 'Analytics']
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    department: 'engineering',
    location: 'berlin',
    type: 'full-time',
    description: 'Maintain and scale our cloud infrastructure, improving CI/CD pipelines and ensuring system reliability.',
    requirements: ['3+ years with AWS/GCP/Azure.', 'Proficiency in Terraform and Kubernetes.', 'Experience with CI/CD tools (e.g., Jenkins, GitLab CI).'],
    responsibilities: ['Manage cloud infrastructure using Infrastructure as Code (IaC).', 'Implement and maintain monitoring and alerting systems.', 'Automate deployment and scaling processes.', 'Ensure high availability and disaster recovery.'],
    salary: '$100k - $140k',
    applicants: 35,
    posted: '4 days ago',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD']
  },
  {
    id: 5,
    title: 'Sales Development Representative (SDR)',
    department: 'sales',
    location: 'remote',
    type: 'full-time',
    description: 'Generate new business opportunities by identifying, qualifying, and scheduling meetings with potential clients.',
    requirements: ['1+ year of B2B sales experience.', 'Excellent cold calling and email outreach skills.', 'Familiarity with CRM software (e.g., Salesforce).'],
    responsibilities: ['Research and target prospective clients.', 'Qualify leads through calls and emails.', 'Schedule demos for Account Executives.', 'Maintain accurate records in the CRM.'],
    salary: '$50k - $70k + Commission',
    applicants: 60,
    posted: '3 days ago',
    tags: ['B2B', 'Salesforce', 'Outreach', 'Lead Generation']
  },
  {
    id: 6,
    title: 'Operations Analyst',
    department: 'operations',
    location: 'tokyo',
    type: 'full-time',
    description: 'Analyze business processes to identify efficiencies and improvements, supporting overall operational excellence.',
    requirements: ['2+ years of experience in operations or business analysis.', 'Strong quantitative and analytical skills.', 'Proficiency in SQL and data visualization tools.'],
    responsibilities: ['Map and analyze existing operational workflows.', 'Develop metrics and reports to track performance.', 'Recommend and implement process improvements.', 'Support cross-functional projects.'],
    salary: '$75k - $105k',
    applicants: 15,
    posted: '6 days ago',
    tags: ['SQL', 'Analysis', 'Process Improvement', 'Data Viz']
  }
]

// --- Utility Components (Card, Button, Input, Textarea) ---

// Custom Button Component (Re-imported for completeness)
const Button = ({ children, className = '', variant = 'primary', size = 'md', onClick, type = 'button', disabled = false }: any) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[#003366] text-white hover:bg-[#002244] shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white',
    ghost: 'text-[#003366] hover:bg-gray-50',
    success: 'bg-[#004488] text-white hover:bg-[#003366]',
    warning: 'bg-[#C0C0C0] text-[#003366] hover:bg-[#B0B0B0]'
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  )
}

// Custom Card Component (Re-imported for completeness)
const Card = ({ children, className = '' }: any) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  )
}

// Input Component (Re-imported for completeness)
const Input = ({ label, type = 'text', placeholder, value, onChange, required, icon: Icon, error }: any) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#003366] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:border-[#003366] focus:outline-none transition-colors`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

// Textarea Component (Re-imported for completeness)
const Textarea = ({ label, placeholder, value, onChange, required, rows = 4, error }: any) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#003366] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 border-2 ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:border-[#003366] focus:outline-none transition-colors resize-none`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

// --- Hero Section ---
const HeroSection = () => (
  <section className="py-24 md:py-32 bg-gradient-to-br from-[#003366] to-[#004488] text-white">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Sparkles className="mx-auto text-[#C0C0C0] mb-6" size={64} />
        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
          Join the <span className="text-[#C0C0C0]">Future</span> Builders
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          We're solving the world's toughest problems. Find your next great challenge.
        </p>
        <Button size="lg" className="bg-[#C0C0C0] text-[#003366] hover:bg-[#A0A0A0]">
          <Briefcase className="mr-2" size={20} />
          See Open Roles
        </Button>
      </motion.div>
    </div>
  </section>
)

// --- Why Join Us Section ---
const WhyJoinUs = () => {
  const features = [
    { icon: Rocket, title: 'Impactful Work', description: 'Be part of a team building products that change industries.' },
    { icon: Lightbulb, title: 'Innovation Focus', description: 'Explore cutting-edge technology and challenge the status quo.' },
    { icon: BookOpen, title: 'Continuous Learning', description: 'Generous learning budget and internal mentorship programs.' },
    { icon: Heart, title: 'Inclusive Culture', description: 'A diverse, supportive, and truly collaborative work environment.' }
  ]
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Why SL Brothers?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            It's more than a job. It's a mission.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center h-full">
                <feature.icon className="mx-auto text-[#003366] mb-4" size={40} />
                <h3 className="text-xl font-bold text-[#003366] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Company Culture Section ---
const CompanyCulture = () => {
  const values = [
    { icon: Zap, title: 'Bias for Action', desc: 'Move fast, iterate, and deliver results. Perfection is the enemy of good.' },
    { icon: Globe, title: 'Global Citizenship', desc: 'Think local, act global. Embrace diversity in thought and background.' },
    { icon: Headset, title: 'Customer Obsession', desc: 'Work backwards from the customer. Their success is our success.' },
    { icon: Shield, title: 'Radical Candor', desc: 'Speak your mind and challenge others respectfully. Openness builds trust.' }
  ]
  return (
    <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <PieChart className="mx-auto text-[#003366] mb-4" size={48} />
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide our decisions and define our culture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 border-b-4 border-[#003366]/50 rounded-lg bg-white shadow-xl"
            >
              <value.icon className="mx-auto text-[#003366] mb-4" size={32} />
              <h3 className="text-xl font-bold text-[#003366] mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Benefits Section ---
const BenefitsSection = () => {
  const benefits = [
    { icon: DollarSign, title: 'Top-Tier Compensation', desc: 'Competitive salary and equity packages, reviewed annually.' },
    { icon: Plane, title: 'Unlimited PTO', desc: 'Take the time you need to recharge. Mandatory minimum 4 weeks off.' },
    { icon: Gift, title: 'Wellness Stipend', desc: '$100/month for gym, meditation, or mental health services.' },
    { icon: Laptop, title: 'Home Office Setup', desc: '$1,000 budget for monitors, chairs, and other remote work essentials.' },
    { icon: Heart, title: 'Comprehensive Health', desc: '100% covered health, dental, and vision for you and your family.' },
    { icon: Clock, title: 'Flexible Schedule', desc: 'Work when you are most productive, focusing on results, not hours.' }
  ]

  return (
    <section className="py-24 bg-[#003366] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Award className="mx-auto text-[#C0C0C0] mb-4" size={48} />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The Perks of Joining
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We invest in our people because you are our greatest asset.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                <benefit.icon className="text-[#C0C0C0] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Job Card Component (Modified to use Job type) ---
const JobCard = ({ job, index, onClick }: { job: Job, index: number, onClick: () => void }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-l-4 border-[#003366]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#003366] mb-2 hover:text-[#004488] transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <Building size={14} />
                <span className="capitalize">{job.department}</span>
              </span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{job.location}</span>
              </span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{job.type}</span>
              </span>
            </div>
          </div>
          <ThumbsUp className="text-[#C0C0C0] flex-shrink-0" size={24} />
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.slice(0, 4).map((tag, idx) => ( // Show max 4 tags
            <span
              key={idx}
              className="px-3 py-1 bg-[#003366]/10 text-[#003366] rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <DollarSign size={16} />
              <span className="font-semibold">{job.salary}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users size={16} />
              <span>{job.applicants} applicants</span>
            </span>
          </div>
          <Button size="sm">
            Details <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Posted {job.posted}
        </div>
      </Card>
    </motion.div>
  )
}

// --- Job Filters Component ---
const JobFilters = ({ selectedDepartment, setSelectedDepartment, selectedLocation, setSelectedLocation, searchQuery, setSearchQuery }: any) => {
  const departments = ['all', 'engineering', 'design', 'marketing', 'sales', 'operations']
  const locations = ['all', 'remote', 'london', 'new york', 'tokyo', 'berlin']

  const FilterButton = ({ value, label, current, onClick }: any) => (
    <Button
      variant={current === value ? 'primary' : 'outline'}
      size="sm"
      className="capitalize flex-shrink-0"
      onClick={() => onClick(value)}
    >
      {label}
    </Button>
  )

  return (
    <section className="py-12 bg-gray-50 sticky top-14 z-20 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6">
            <Input
              icon={Search}
              placeholder="Search by job title or keyword..."
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            {/* Department Filter */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#003366] mb-2 flex items-center">
                <Filter size={16} className="mr-1" /> Department
              </h3>
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                {departments.map(dept => (
                  <FilterButton
                    key={dept}
                    value={dept}
                    label={dept === 'all' ? 'All Teams' : dept}
                    current={selectedDepartment}
                    onClick={setSelectedDepartment}
                  />
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#003366] mb-2 flex items-center">
                <MapPin size={16} className="mr-1" /> Location
              </h3>
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                {locations.map(loc => (
                  <FilterButton
                    key={loc}
                    value={loc}
                    label={loc === 'all' ? 'Anywhere' : loc}
                    current={selectedLocation}
                    onClick={setSelectedLocation}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Job Listings Component ---
const JobListings = ({ selectedDepartment, selectedLocation, searchQuery, setSelectedJob }: any) => {
  const filteredJobs = MOCK_JOBS.filter(job => {
    const departmentMatch = selectedDepartment === 'all' || job.department === selectedDepartment
    const locationMatch = selectedLocation === 'all' || job.location === selectedLocation
    const searchMatch = searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return departmentMatch && locationMatch && searchMatch
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#003366] mb-8"
        >
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Opportunity' : 'Openings'} Available
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onClick={() => setSelectedJob(job)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="md:col-span-2 text-center py-12 bg-gray-50 rounded-xl"
              >
                <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-xl text-gray-600 font-semibold">
                  No jobs match your current criteria.
                </p>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// --- CareerGrowthPath, TeamTestimonials, LifeAtCompany, DiversityInclusion, RecruitmentProcess, FAQSection, CTASection (Re-imported/Used from prompt) ---
// Note: The components below are included from the prompt, adapted slightly for the full file structure.

const CareerGrowthPath = () => {
  const growthLevels = [
    { level: 'Junior', years: '0-2', icon: GraduationCap, color: 'from-[#003366] to-[#004488]' },
    { level: 'Mid-Level', years: '2-5', icon: Target, color: 'from-[#004488] to-[#005599]' },
    { level: 'Senior', years: '5-8', icon: Award, color: 'from-[#005599] to-[#006699]' },
    { level: 'Lead/Principal', years: '8+', icon: Rocket, color: 'from-[#C0C0C0] to-[#A0A0A0]' }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <TrendingUp className="mx-auto text-[#003366] mb-4" size={48} />
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Your Growth Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear career progression with mentorship and learning at every stage
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#003366] via-[#004488] to-[#C0C0C0]" />

          <div className="grid md:grid-cols-4 gap-8">
            {growthLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-20 h-20 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl relative z-10`}
                  >
                    <level.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#003366] mb-1">{level.level}</h3>
                  <p className="text-sm text-gray-600">{level.years} years</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TeamTestimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior ML Engineer',
      image: 'https://i.pravatar.cc/150?img=1',
      quote: 'The learning opportunities here are incredible. I\'ve grown more in 2 years than I did in my previous 5 years elsewhere.',
      rating: 5
    },
    {
      name: 'James Rodriguez',
      role: 'Product Designer',
      image: 'https://i.pravatar.cc/150?img=3',
      quote: 'Amazing culture and truly talented teammates. The work-life balance is real, not just a buzzword.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'DevOps Lead',
      image: 'https://i.pravatar.cc/150?img=5',
      quote: 'I love the autonomy and trust given to make technical decisions. Leadership truly values our input.',
      rating: 5
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <MessageSquare className="mx-auto text-[#003366] mb-4" size={48} />
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Hear From Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people building amazing things
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#003366]/10"
                  />
                  <div>
                    <h4 className="font-bold text-[#003366]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-[#C0C0C0] fill-[#C0C0C0]" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const LifeAtCompany = () => {
  const gallery = [
    { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', caption: 'Team Collaboration' },
    { image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80', caption: 'Modern Workspace' },
    { image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', caption: 'Team Events' },
    { image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', caption: 'Learning Sessions' }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Coffee className="mx-auto text-[#003366] mb-4" size={48} />
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Life at SL Brothers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A glimpse into our daily life, culture, and community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-64"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const DiversityInclusion = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#003366] to-[#002244] text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Users className="text-[#C0C0C0] mb-6" size={48} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Diversity & Inclusion
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              We believe diverse teams build better products. Our commitment to inclusion goes beyond words – it's embedded in everything we do.
            </p>
            <ul className="space-y-4">
              {[
                '50% women in leadership positions',
                'Team members from 25+ countries',
                'Active ERGs (Employee Resource Groups)',
                'Inclusive hiring and promotion practices',
                'Regular D&I training and workshops'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="text-[#C0C0C0] flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '50+', label: 'Nationalities' },
                  { num: '45%', label: 'Women in Tech' },
                  { num: '30%', label: 'LGBTQ+ Members' },
                  { num: '100%', label: 'Pay Equity' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl font-black text-[#C0C0C0] mb-2">{stat.num}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const RecruitmentProcess = () => {
  const steps = [
    { icon: Send, title: 'Apply', desc: 'Submit your application online', time: '5 min' },
    { icon: User, title: 'Initial Screen', desc: 'Phone or video chat with recruiter', time: '30 min' },
    { icon: Code, title: 'Technical Assessment', desc: 'Skills evaluation relevant to role', time: '1-2 hours' },
    { icon: Users, title: 'Team Interviews', desc: 'Meet potential teammates', time: '2-3 hours' },
    { icon: CheckCircle, title: 'Offer', desc: 'Receive and accept your offer', time: '1-2 days' }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Settings className="mx-auto text-[#003366] mb-4" size={48} />
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Our Hiring Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, efficient, and designed to find the perfect mutual fit
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[#003366] to-[#C0C0C0]" />

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004488] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                  >
                    <step.icon className="text-white" size={24} />
                  </motion.div>
                  <div className="text-sm font-black text-[#C0C0C0] mb-2">STEP {index + 1}</div>
                  <h3 className="text-lg font-bold text-[#003366] mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{step.desc}</p>
                  <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                    <Clock size={12} />
                    <span>{step.time}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            <strong>Average time to hire:</strong> 2-3 weeks from application to offer
          </p>
          <Button>
            <Calendar className="mr-2" size={18} />
            Schedule a Call
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Do you sponsor work visas?',
      answer: 'Yes, we sponsor work visas for qualified candidates in the UK, US, and Canada. We handle the entire visa process and provide relocation support.'
    },
    {
      question: 'What is your remote work policy?',
      answer: 'We are a remote-first company. Most roles can be performed from anywhere. Some positions may require occasional travel to regional hubs for team meetings.'
    },
    {
      question: 'How long does the hiring process take?',
      answer: 'Our typical hiring process takes 2-3 weeks from initial application to offer. We move quickly to respect your time while ensuring a thorough evaluation.'
    },
    {
      question: 'Do you offer internships or graduate programs?',
      answer: 'Yes! We have dedicated internship and graduate programs starting twice a year (January and July). These are paid positions with potential for full-time conversion.'
    },
    {
      question: 'What learning and development opportunities do you provide?',
      answer: 'Every employee gets a $2,000 annual learning budget, access to online learning platforms, quarterly workshops, mentorship programs, and conference attendance opportunities.'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#003366] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#003366] pr-8">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-[#003366] flex-shrink-0" size={24} />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CTASection = ({ setShowApplicationForm }: any) => {
  return (
    <section className="py-32 bg-gradient-to-r from-[#003366] to-[#004488]">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Rocket className="mx-auto text-[#C0C0C0] mb-6" size={64} />
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Don't see a perfect fit? Send us your resume anyway. We're always looking for exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#C0C0C0] text-[#003366] hover:bg-[#B0B0B0]" onClick={() => setShowApplicationForm(true)}>
              <Send className="mr-2" size={20} />
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#003366]">
              <Mail className="mr-2" size={20} />
              Contact Recruiting Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Modals ---

const JobModal = ({ job, onClose, onApply }: { job: Job | null, onClose: () => void, onApply: () => void }) => {
  if (!job) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003366]">{job.title}</h2>
            <Button onClick={onClose} variant="ghost" className="rounded-full w-10 h-10 p-0">
              <X size={24} />
            </Button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-4 mb-6 text-sm md:text-base">
              <span className="flex items-center space-x-2 text-gray-600">
                <Building size={18} />
                <span className="capitalize">{job.department}</span>
              </span>
              <span className="flex items-center space-x-2 text-gray-600">
                <MapPin size={18} />
                <span>{job.location}</span>
              </span>
              <span className="flex items-center space-x-2 text-gray-600">
                <Clock size={18} />
                <span>{job.type}</span>
              </span>
              <span className="flex items-center space-x-2 text-gray-600">
                <DollarSign size={18} />
                <span>{job.salary}</span>
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003366] mb-4">About the Role</h3>
              <p className="text-gray-700 text-lg">{job.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003366] mb-4">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="text-[#004488] flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003366] mb-4">Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Target className="text-[#004488] flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003366] mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[#003366]/10 text-[#003366] rounded-lg font-semibold text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onApply} className="flex-1">
                <Send className="mr-2" size={20} />
                Apply for this Position
              </Button>
              <Button size="lg" variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const ApplicationFormModal = ({ isOpen, onClose, selectedJob }: { isOpen: boolean, onClose: () => void, selectedJob: Job | null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null // Changed type to File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleClose = () => {
    onClose()
    setSubmitted(false)
    setFormData({
      fullName: '', email: '', phone: '', location: '', linkedIn: '',
      portfolio: '', experience: '', coverLetter: '', resume: null
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation (can be expanded)
    if (!formData.fullName || !formData.email || !formData.resume) {
      alert("Please fill in all required fields and upload a resume.")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    console.log('Submitting Application:', { ...formData, jobTitle: selectedJob?.title || 'General Application' })
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-3xl font-bold text-[#003366]">
              {selectedJob ? `Apply for ${selectedJob.title}` : 'General Application'}
            </h2>
            <Button onClick={handleClose} variant="ghost" className="rounded-full w-10 h-10 p-0">
              <X size={24} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-20"
                >
                  <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
                  <h3 className="text-3xl font-bold text-[#003366] mb-4">Application Submitted!</h3>
                  <p className="text-lg text-gray-600">
                    Thank you for your interest. We've received your application and will be in touch within a week.
                  </p>
                  <Button onClick={handleClose} className="mt-8" variant="success">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <div className="space-y-6 mb-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        icon={User}
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        icon={Mail}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={Phone}
                      />
                      <Input
                        label="Current Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        icon={MapPin}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="LinkedIn URL"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        icon={Globe}
                      />
                      <Input
                        label="Portfolio/Website (Optional)"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        icon={ClipboardList}
                      />
                    </div>

                    <Textarea
                      label="Relevant Experience Summary (Optional)"
                      name="experience"
                      placeholder="Briefly describe your relevant experience..."
                      value={formData.experience}
                      onChange={handleChange}
                    />

                    <Textarea
                      label="Cover Letter (Optional)"
                      name="coverLetter"
                      placeholder="Why do you want to work with us?"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={3}
                    />

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#003366] mb-2">
                        Upload Resume (PDF, DOCX) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between p-4"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex items-center">
                          <Upload size={20} className="mr-2" />
                          {formData.resume ? formData.resume.name : 'Choose File'}
                        </div>
                        {formData.resume && (
                          <X size={20} className="text-red-500 hover:text-red-700" onClick={(e) => {
                            e.stopPropagation()
                            setFormData(prev => ({ ...prev, resume: null }))
                            if (fileInputRef.current) fileInputRef.current.value = '' // Reset input value
                          }} />
                        )}
                      </Button>
                      {/* Optional: Add file size/type validation error message here */}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    variant={isSubmitting ? 'warning' : 'primary'}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        Submit Application
                        <Send className="ml-2" size={20} />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// --- Main Careers Component ---
const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Job['department'] | 'all'>('all')
  const [selectedLocation, setSelectedLocation] = useState<Job['location'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  // Smooth progress bar on scroll
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Close form modal when job modal is opened and vice-versa
  useEffect(() => {
    if (selectedJob && showApplicationForm) {
      setShowApplicationForm(false)
    }
  }, [selectedJob, showApplicationForm])

  // Handle body scroll for modals
  useEffect(() => {
    document.body.style.overflow = (selectedJob || showApplicationForm) ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedJob, showApplicationForm])

  return (
    <div className="overflow-x-hidden bg-gray-50">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003366] via-[#004488] to-[#C0C0C0] z-50 origin-left"
        style={{ scaleX }}
      />

      <HeroSection />
      <WhyJoinUs />
      <CompanyCulture />
      <BenefitsSection />
      <JobFilters
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <JobListings
        selectedDepartment={selectedDepartment}
        selectedLocation={selectedLocation}
        searchQuery={searchQuery}
        setSelectedJob={setSelectedJob}
      />
      <CareerGrowthPath />
      <TeamTestimonials />
      <LifeAtCompany />
      <DiversityInclusion />
      <RecruitmentProcess />
      <FAQSection />
      <CTASection setShowApplicationForm={setShowApplicationForm} />

      {/* Job Detail Modal */}
      <JobModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={() => {
          setSelectedJob(null)
          setShowApplicationForm(true)
        }}
      />

      {/* Application Form Modal */}
      <ApplicationFormModal
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        selectedJob={selectedJob}
      />
    </div>
  )
}

export default Careers