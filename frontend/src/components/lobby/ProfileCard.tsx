import React from 'react'
import NeonButton from '../ui/NeonButton'
import { useGame } from '../../contexts/GameContext'

const ProfileCard: React.FC = () => {
    const { myId, users } = useGame()
    const currentUser = myId ? users[myId] : null

    return (
        <div className="glass-card p-5 flex flex-col gap-5 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent-primary/0 via-accent-primary/40 to-accent-primary/0" />

            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center overflow-hidden">
                        <span className="text-accent-primary font-black text-lg">
                            {currentUser ? currentUser.profile.name.charAt(0).toUpperCase() : '?'}
                        </span>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#34D399] rounded-full border-2 border-bg-secondary" />
                </div>

                <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-text-primary truncate">
                            {currentUser ? currentUser.profile.name : 'Connecting...'}
                        </h3>
                        <span className="shrink-0 text-[10px] bg-accent-primary/15 text-accent-primary px-1.5 py-0.5 rounded font-bold">
                            Lv.{currentUser?.profile.level || 1}
                        </span>
                    </div>
                    <p className="text-[11px] text-text-muted font-mono">
                        #{myId?.substring(0, 8) || '00000000'}
                    </p>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-bg-elevated border border-border-subtle">
                    <span className="text-[10px] text-text-muted uppercase font-semibold tracking-wider">Status</span>
                    <span className="text-xs font-bold text-text-primary">
                        {currentUser ? (
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                                Online
                            </span>
                        ) : '...'}
                    </span>
                </div>
                <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-bg-elevated border border-border-subtle">
                    <span className="text-[10px] text-text-muted uppercase font-semibold tracking-wider">Points</span>
                    <span className="text-sm font-bold text-accent-primary font-mono">
                        {(currentUser?.game.score || 0).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <NeonButton variant="primary" size="sm" fullWidth>Profile</NeonButton>
                <NeonButton variant="ghost" size="sm" fullWidth>Settings</NeonButton>
            </div>
        </div>
    )
}

export default ProfileCard
