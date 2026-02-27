import React from 'react'

interface GlassPanelProps {
    children: React.ReactNode
    className?: string
    title?: string
    accentColor?: 'primary' | 'secondary'
}

const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '', title, accentColor = 'primary' }) => {
    const accentClass = accentColor === 'primary' ? 'bg-accent-primary' : 'bg-accent-secondary'

    return (
        <div className={`flex flex-col gap-4 w-full ${className}`}>
            {title && (
                <h2 className={`text-xl font-bold flex items-center gap-2 ${accentColor === 'primary' ? 'text-accent-primary' : 'text-accent-secondary'}`}>
                    <span className={`w-2 h-6 ${accentClass} rounded-full`}></span>
                    {title}
                </h2>
            )}
            <div className="glass-card p-6 bg-white/5 border-white/10 flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}

export default GlassPanel
