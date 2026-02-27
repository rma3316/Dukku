import React from 'react'
import GlassPanel from '../ui/GlassPanel'
import NeonButton from '../ui/NeonButton'
import { useGame } from '../../contexts/GameContext'

const ServerList: React.FC = () => {
    const { rooms } = useGame()
    const [searchQuery, setSearchQuery] = React.useState('')

    const serverList = Object.values(rooms).filter(
        (room) =>
            (room.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.id.toString().includes(searchQuery)
    )

    return (
        <GlassPanel title="Room List" accentColor="primary" className="h-full">
            {/* Search bar */}
            <div className="flex gap-2">
                <div className="relative flex-grow">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        className="w-full bg-bg-elevated border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/40 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <NeonButton size="sm" variant="ghost">Refresh</NeonButton>
            </div>

            {/* Room rows */}
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[240px] custom-scrollbar -mx-1 px-1">
                {serverList.length === 0 ? (
                    <div className="text-center py-10 text-text-muted text-sm">
                        No active rooms found.
                    </div>
                ) : (
                    serverList.map((room) => (
                        <div
                            key={room.id}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-elevated border border-transparent hover:border-border-subtle transition-all cursor-pointer group"
                        >
                            {/* Status dot */}
                            <span
                                className={
                                    room.gaming
                                        ? 'status-dot-playing shrink-0'
                                        : 'status-dot-online shrink-0'
                                }
                            />

                            {/* Room info */}
                            <div className="flex-grow min-w-0">
                                <div className="text-sm font-semibold text-text-primary truncate group-hover:text-accent-primary transition-colors">
                                    {room.title || `Room ${room.id}`}
                                </div>
                                <div className="text-[10px] text-text-muted font-mono uppercase tracking-wider">
                                    Mode {room.mode} · {room.gaming ? 'In game' : 'Waiting'}
                                </div>
                            </div>

                            {/* Player count + bar */}
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className="text-[11px] font-mono text-text-secondary">
                                    <span className="text-accent-primary font-bold">{room.players.length}</span>
                                    /{room.limit}
                                </span>
                                <div className="w-16 h-0.5 bg-bg-elevated rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent-primary rounded-full"
                                        style={{ width: `${(room.players.length / room.limit) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Enter button */}
                            <div className="w-0 overflow-hidden group-hover:w-auto group-hover:ml-1 transition-all duration-200">
                                <NeonButton size="sm" variant="primary" className="whitespace-nowrap">
                                    Enter
                                </NeonButton>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </GlassPanel>
    )
}

export default ServerList
