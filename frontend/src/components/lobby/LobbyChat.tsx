import React from 'react'
import GlassPanel from '../ui/GlassPanel'

const LobbyChat: React.FC = () => {
    return (
        <GlassPanel title="Lobby Chat" accentColor="secondary" className="h-full">
            <div className="flex flex-col gap-2 h-[200px] overflow-y-auto pr-2 custom-scrollbar text-sm">
                <div className="flex gap-2">
                    <span className="text-accent-secondary font-bold shrink-0">[System]</span>
                    <span className="text-text-secondary">Welcome to the new KKuTu Lobby!</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-blue-400 font-bold shrink-0">User123:</span>
                    <span className="text-white">Is this the new UI? Wow!</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-pink-400 font-bold shrink-0">WordMaster:</span>
                    <span className="text-white">The glass effects look really premium.</span>
                </div>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-secondary transition-all"
                />
                <button className="bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30 px-4 py-2 rounded-lg hover:bg-accent-secondary hover:text-white transition-all">
                    Send
                </button>
            </div>
        </GlassPanel>
    )
}

export default LobbyChat
