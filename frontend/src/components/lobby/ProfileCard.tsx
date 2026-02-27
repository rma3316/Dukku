import React from 'react'
import NeonButton from '../ui/NeonButton'
import { useGame } from '../../contexts/GameContext'

const ProfileCard: React.FC = () => {
    const { myId, users } = useGame();
    const currentUser = myId ? users[myId] : null;

    return (
        <div className="glass-card p-6 bg-accent-primary/5 border-accent-primary/20 flex flex-col gap-6 relative overflow-hidden group">
            {/* Subtle Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-3xl -mr-16 -mt-16 group-hover:bg-accent-primary/20 transition-all duration-700"></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-2xl bg-bg-primary flex items-center justify-center overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-accent-primary font-bold">?</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white tracking-tight">
                            {currentUser ? currentUser.profile.name : 'Connecting...'}
                        </h3>
                        <span className="text-[10px] bg-accent-primary/20 text-accent-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                            Lv. {currentUser?.profile.level || 1}
                        </span>
                    </div>
                    <p className="text-xs text-text-secondary font-medium">#{myId?.substring(0, 8) || '00000000'}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Status</span>
                    <span className="text-sm font-black text-white italic">{currentUser ? 'ONLINE' : '...'}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Points</span>
                    <span className="text-lg font-black text-accent-primary">{currentUser?.game.score || 0}</span>
                </div>
            </div>

            <div className="flex gap-2 relative z-10">
                <NeonButton variant="primary" size="sm" fullWidth>Profile</NeonButton>
                <NeonButton variant="secondary" size="sm" fullWidth>Settings</NeonButton>
            </div>
        </div>
    )
}

export default ProfileCard
