import ProfileCard from './components/lobby/ProfileCard'
import ServerList from './components/lobby/ServerList'
import LobbyChat from './components/lobby/LobbyChat'
import NeonButton from './components/ui/NeonButton'
import { useGame } from './contexts/GameContext'

function App() {
    const { sendEvent, isConnected } = useGame()

    const handleQuickStart = () => {
        if (!isConnected) return
        sendEvent('quick')
    }

    const handleCreateRoom = () => {
        if (!isConnected) return
        sendEvent('roomCreate', {
            title: 'New Game Room',
            mode: 0,
            limit: 8,
            round: 3,
            time: 60,
            password: '',
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-bg-primary">

            {/* Connecting overlay */}
            {!isConnected && (
                <div className="fixed inset-0 z-50 bg-bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                    <div className="glass-card p-8 flex flex-col items-center gap-4 max-w-xs w-full mx-4">
                        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                        <div className="text-center">
                            <p className="text-sm font-semibold text-text-primary">Connecting to Server</p>
                            <p className="text-xs text-text-muted mt-1">Please wait...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Navigation */}
            <nav className="w-full max-w-6xl mb-6 flex justify-between items-center glass-card px-5 py-3.5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-primary/15 rounded-lg flex items-center justify-center border border-accent-primary/20">
                        <span className="text-accent-primary font-black text-sm">K</span>
                    </div>
                    <h1 className="text-base font-black text-text-primary tracking-tight">
                        KKUTU <span className="text-accent-primary">ONLINE</span>
                    </h1>
                </div>

                <div className="flex items-center gap-5">
                    <div className="hidden md:flex items-center gap-5 text-xs font-medium text-text-secondary">
                        {['Notice', 'Ranking', 'Shop', 'Rules'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="hover:text-text-primary transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <NeonButton variant="ghost" size="sm">Logout</NeonButton>
                </div>
            </nav>

            {/* Main Layout */}
            <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* Left: Profile + Lobby Menu */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <ProfileCard />

                    <div className="glass-card p-5">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-3">
                            Lobby Menu
                        </p>
                        <div className="flex flex-col gap-0.5">
                            {[
                                { label: 'Daily Rewards', action: undefined },
                                { label: 'Friend List', action: () => sendEvent('friend') },
                                { label: 'Inventory', action: undefined },
                            ].map(({ label, action }) => (
                                <button
                                    key={label}
                                    onClick={action}
                                    className="text-left py-2 px-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center: Room List + Action Buttons */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                    <ServerList />

                    <div className="grid grid-cols-2 gap-3">
                        <NeonButton
                            variant="primary"
                            size="lg"
                            className="h-16 text-xs"
                            onClick={handleQuickStart}
                        >
                            Quick Start
                        </NeonButton>
                        <NeonButton
                            variant="secondary"
                            size="lg"
                            className="h-16 text-xs"
                            onClick={handleCreateRoom}
                        >
                            Create Room
                        </NeonButton>
                    </div>
                </div>

                {/* Right: Chat + Notices */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <LobbyChat />

                    <div className="glass-card p-5 flex-grow">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-3">
                            Notices
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1 border-l border-accent-primary/40 pl-3">
                                <span className="text-[10px] text-accent-primary font-mono">2026-02-27</span>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Welcome to the React Revival project!
                                </p>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-border-subtle pl-3">
                                <span className="text-[10px] text-text-muted font-mono">2026-02-26</span>
                                <p className="text-xs text-text-muted leading-relaxed">
                                    System maintenance scheduled at midnight.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-6xl mt-10 pt-6 border-t border-border-subtle text-center">
                <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                    Rule the words · KKuTu Master v1.0.0-react-alpha · Powered by Antigravity
                </p>
            </footer>
        </div>
    )
}

export default App
