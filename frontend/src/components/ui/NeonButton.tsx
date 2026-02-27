import React from 'react'

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost'
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
    const baseStyles =
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer'

    const variantStyles = {
        primary:
            'bg-accent-primary text-bg-primary hover:brightness-110 shadow-neon',
        secondary:
            'bg-bg-elevated border border-border-default text-text-primary hover:border-accent-primary/50 hover:bg-bg-elevated/80',
        ghost:
            'bg-transparent border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-default',
    }

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs tracking-wide',
        md: 'px-5 py-2 text-sm',
        lg: 'px-7 py-3 text-sm font-bold tracking-widest uppercase',
    }

    return (
        <button
            className={[
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                fullWidth ? 'w-full' : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            {children}
        </button>
    )
}

export default NeonButton
