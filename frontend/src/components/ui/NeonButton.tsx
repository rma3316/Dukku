import React from 'react'

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
}

const NeonButton: React.FC<NeonButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'rounded-lg font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2'

    const variantStyles = variant === 'primary'
        ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary hover:bg-accent-primary/20 hover:border-accent-primary hover:shadow-neon'
        : 'bg-accent-secondary/10 border border-accent-secondary/30 text-accent-secondary hover:bg-accent-secondary/20 hover:border-accent-secondary hover:shadow-neon-purple'

    const sizeStyles = {
        sm: 'px-4 py-1.5 text-xs',
        md: 'px-6 py-2 text-sm',
        lg: 'px-8 py-3 text-base',
    }

    return (
        <button
            className={`
        ${baseStyles} 
        ${variantStyles} 
        ${sizeStyles[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    )
}

export default NeonButton
