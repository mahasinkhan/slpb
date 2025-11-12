const Logo = ({ size = 'medium', showText = true, className = '' }: { 
  size?: 'small' | 'medium' | 'large', 
  showText?: boolean,
  className?: string 
}) => {
  const sizes = {
    small: {
      container: 'w-10 h-10',
      text: 'text-xl',
      subtitle: 'text-[0.5rem]',
    },
    medium: {
      container: 'w-14 h-14',
      text: 'text-3xl',
      subtitle: 'text-xs',
    },
    large: {
      container: 'w-20 h-20',
      text: 'text-4xl',
      subtitle: 'text-sm',
    },
  }

  const currentSize = sizes[size]

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${currentSize.container} bg-white rounded-full flex flex-col items-center justify-center shadow-professional border-2 border-primary`}>
        <div className={`${currentSize.text} font-black leading-none text-primary`}>
          S<span className="text-accent">L</span>B
        </div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-xl tracking-wide leading-tight">
            SL BROTHERS
          </span>
          <span className={`${currentSize.subtitle} text-grey-500 uppercase tracking-wider font-medium`}>
            Ltd
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo