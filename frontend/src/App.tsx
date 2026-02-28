import ProfileCard from './components/lobby/ProfileCard'
import ServerList from './components/lobby/ServerList'
import LobbyChat from './components/lobby/LobbyChat'
import NeonButton from './components/ui/NeonButton'
import { useGame } from './contexts/GameContext'

function App() {
  const { sendEvent, isConnected } = useGame();

  const handleQuickStart = () => {
    if (!isConnected) return;
    sendEvent('quick');
  };

  const handleCreateRoom = () => {
    if (!isConnected) return;
    sendEvent('roomCreate', {
      title: 'New Game Room',
      mode: 0,
      limit: 8,
      round: 3,
      time: 60,
      password: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Connection Status Overlay */}
      {!isConnected && (
        <div className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center">
          <div className="glass-card p-8 flex flex-col items-center gap-4 border-accent-secondary/30">
            <div className="w-12 h-12 border-4 border-accent-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-accent-secondary font-bold animate-pulse">Connecting to Server...</p>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <nav className="w-full max-w-6xl mb-8 flex justify-between items-center glass-card px-6 py-4 bg-white/5 border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center font-bold text-white shadow-neon">D</div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-accent-primary to-accent-secondary">
            Dukku
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 mr-6 text-sm font-bold text-text-secondary">
            <a href="#" className="hover:text-accent-primary transition-colors">Notice</a>
            <a href="#" className="hover:text-accent-primary transition-colors">Ranking</a>
            <a href="#" className="hover:text-accent-primary transition-colors">Shop</a>
            <a href="#" className="hover:text-accent-primary transition-colors">Rules</a>
          </div>
          <NeonButton variant="secondary" size="sm">Logout</NeonButton>
        </div>
      </nav>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Left Sidebar - Profile & Stats */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <ProfileCard />
          <div className="glass-card p-6 bg-white/5 border-white/10">
            <h3 className="text-xs font-bold text-accent-secondary uppercase tracking-[0.2em] mb-4">Lobby Menu</h3>
            <div className="flex flex-col gap-2">
              <button className="text-left py-2 px-3 rounded-lg hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-all">Daily Rewards</button>
              <button
                className="text-left py-2 px-3 rounded-lg hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-all"
                onClick={() => sendEvent('friend')}
              >
                Friend List
              </button>
              <button className="text-left py-2 px-3 rounded-lg hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-all">Inventory</button>
            </div>
          </div>
        </div>

        {/* Center - Server List & Main Action */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ServerList />
          <div className="grid grid-cols-2 gap-4">
            <NeonButton
              variant="primary"
              size="lg"
              className="h-24 text-xl font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20"
              onClick={handleQuickStart}
            >
              Quick Start
            </NeonButton>
            <NeonButton
              variant="secondary"
              size="lg"
              className="h-24 text-xl font-black uppercase tracking-widest border-2"
              onClick={handleCreateRoom}
            >
              Create Room
            </NeonButton>
          </div>
        </div>

        {/* Right Sidebar - Chat & Social */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <LobbyChat />
          <div className="glass-card p-6 bg-white/5 border-white/10 grow">
            <h3 className="text-xs font-bold text-accent-primary uppercase tracking-[0.2em] mb-4">Notices</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 border-l-2 border-accent-primary/30 pl-3">
                <span className="text-[10px] text-accent-primary font-bold">2026-02-27</span>
                <p className="text-xs text-white leading-relaxed">Welcome to the React Revival project!</p>
              </div>
              <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-3">
                <span className="text-[10px] text-text-secondary font-bold">2026-02-26</span>
                <p className="text-xs text-text-secondary leading-relaxed">System maintenance scheduled at midnight.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-6xl mt-12 py-8 border-t border-white/5 flex flex-col items-center gap-4">
        <div className="text-xs text-text-secondary text-center">
          <p>© 2026 dasory. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-accent-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-primary transition-colors">Terms of Service</a>
          </div>
        </div>
        <p className="text-text-secondary/20 text-[9px] font-mono tracking-widest uppercase">
          Dukku Master v1.0.0-react-alpha
        </p>
      </footer>
    </div>
  )
}

export default App
