import React from 'react'

interface GlassPanelProps {
    children: React.ReactNode
    className?: string
    title?: string
    accentColor?: 'primary' | 'secondary'
}

const GlassPanel: React.FC<GlassPanelProps> = ({
    children,
    className = '',
    title,
    accentColor = 'primary',
}) => {
    const accentTextClass =
        accentColor === 'primary' ? 'text-accent-primary' : 'text-accent-secondary'
    const accentBarClass =
        accentColor === 'primary' ? 'bg-accent-primary' : 'bg-accent-secondary'

    return (
        <div className={`flex flex-col gap-3 w-full ${className}`}>
            {title && (
                <div className="flex items-center gap-2.5 px-1">
                    <span className={`w-1 h-4 rounded-full ${accentBarClass}`} />
                    <h2 className={`text-xs font-bold uppercase tracking-[0.15em] ${accentTextClass}`}>
                        {title}
                    </h2>
                </div>
            )}
            <div className="glass-card p-5 flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}

export default GlassPanel
