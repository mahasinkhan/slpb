import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  
  // Check if current route is a dashboard route
  const isDashboardRoute = location.pathname.startsWith('/admin') || 
                          location.pathname.startsWith('/superadmin')

  // Option 1: Hide Header/Footer completely on dashboard routes
  if (isDashboardRoute) {
    return <>{children}</>
  }

  // Option 2: Show Header/Footer on all routes (default behavior)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout