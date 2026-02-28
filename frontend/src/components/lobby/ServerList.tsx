import React from 'react'
import GlassPanel from '../ui/GlassPanel'
import NeonButton from '../ui/NeonButton'
import { useGame } from '../../contexts/GameContext'

const ServerList: React.FC = () => {
    const { rooms } = useGame();
    const [searchQuery, setSearchQuery] = React.useState('');

    const serverList = Object.values(rooms).filter(room =>
        (room.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.id.toString().includes(searchQuery)
    );

    return (
        <GlassPanel title="Room List" accentColor="primary" className="h-full">
            <div className="mb-4 flex gap-2">
                <div className="relative grow">
                    <input
                        type="text"
                        placeholder="Search for a room..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-primary/50 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-2.5 text-text-secondary/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <NeonButton size="sm" variant="secondary">Refresh</NeonButton>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                {serverList.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary italic">No active rooms found.</div>
                ) : (
                    serverList.map((room) => (
                        <div
                            key={room.id}
                            className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-accent-primary/30 transition-all cursor-pointer group"
                        >
                            <div className={`w-3 h-3 rounded-full shrink-0 ${room.gaming ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]' : 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]'
                                }`}></div>

                            <div className="grow">
                                <div className="text-sm font-bold text-white group-hover:text-accent-primary transition-colors">{room.title || `Room ${room.id}`}</div>
                                <div className="text-[10px] text-text-secondary uppercase tracking-wider font-mono">Mode: {room.mode}</div>
                            </div>

                            <div className="flex flex-col items-end gap-1 shrink-0">
                                <div className="text-xs font-mono text-text-secondary">
                                    <span className="text-accent-primary font-bold">{room.players.length}</span> / {room.limit}
                                </div>
                                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-accent-primary to-accent-secondary"
                                        style={{ width: `${(room.players.length / room.limit) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <NeonButton size="sm" className="hidden group-hover:flex">Enter</NeonButton>
                        </div>
                    ))
                )}
            </div>
        </GlassPanel>
    )
}

export default ServerList
