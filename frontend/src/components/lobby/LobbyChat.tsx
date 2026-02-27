import React from 'react'
import GlassPanel from '../ui/GlassPanel'

const MESSAGES = [
    { id: 1, sender: 'System', content: 'Welcome to the new KKuTu Lobby!', type: 'system' },
    { id: 2, sender: 'User123', content: 'Is this the new UI? Wow!', type: 'user' },
    { id: 3, sender: 'WordMaster', content: 'The glass effects look really premium.', type: 'user' },
]

const senderColors: Record<string, string> = {
    System: 'text-accent-secondary',
    User123: 'text-blue-400',
    WordMaster: 'text-pink-400',
}

const LobbyChat: React.FC = () => {
    const [input, setInput] = React.useState('')

    const handleSend = () => {
        if (!input.trim()) return
        setInput('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend()
    }

    return (
        <GlassPanel title="Lobby Chat" accentColor="secondary" className="h-full">
            {/* Messages */}
            <div className="flex flex-col gap-2.5 h-[196px] overflow-y-auto custom-scrollbar text-sm">
                {MESSAGES.map((msg) => (
                    <div key={msg.id} className="flex gap-2 leading-relaxed">
                        <span className={`font-semibold shrink-0 text-xs ${senderColors[msg.sender] ?? 'text-text-secondary'}`}>
                            {msg.type === 'system' ? `[${msg.sender}]` : `${msg.sender}:`}
                        </span>
                        <span className={msg.type === 'system' ? 'text-text-secondary text-xs' : 'text-text-primary text-xs'}>
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input row */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-grow bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-secondary/40 transition-colors"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 rounded-lg bg-accent-secondary/15 border border-accent-secondary/25 text-accent-secondary text-xs font-semibold hover:bg-accent-secondary/25 transition-all"
                >
                    Send
                </button>
            </div>
        </GlassPanel>
    )
}

export default LobbyChat
