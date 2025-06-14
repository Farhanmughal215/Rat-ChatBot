import React from 'react';
import { 
  MessageSquare, 
  TrendingUp, 
  Target, 
  Map, 
  Users, 
  BarChart3, 
  HelpCircle, 
  Settings,
  Flame,
  Zap,
  Play,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isOpen = true, onClose }) => {
  const navigationItems = [
    { id: 'assistant', icon: MessageSquare, label: 'RAT Assistant', active: true },
    { id: 'memes', icon: Flame, label: 'Meme Factory' },
    { id: 'manifesto', icon: Target, label: 'RAT Manifesto' },
    { id: 'tokenomics', icon: TrendingUp, label: 'Tokenomics' },
    { id: 'roadmap', icon: Map, label: 'Revolution Map' },
    { id: 'community', icon: Users, label: 'Sewer Citizens' },
  ];

  const utilityItems = [
    { id: 'help', icon: HelpCircle, label: 'Help & FAQ' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        w-64 bg-[#222] border-r border-gray-800 flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://rat.ourwebprojects.pro/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-13-at-00.33.41_ea137fcd.jpg" 
                alt="RAT Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-[#FACC15] font-bold text-lg">$RAT</h2>
                <p className="text-gray-400 text-sm">TO THE MOON 🚀</p>
              </div>
            </div>
            {/* Close button for mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-gray-400 hover:text-[#FACC15] transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3A8A] text-[#FACC15] shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.active && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Push to Games Button */}
          <div className="px-3 mt-4">
            <button
              onClick={() => handleSectionChange('games')}
              className="w-full bg-gradient-to-r from-[#FACC15] to-[#e6b800] hover:from-[#e6b800] hover:to-[#FACC15] text-[#0f172a] font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play size={18} />
              <span>Play Games</span>
            </button>
          </div>

          {/* Live Stats */}
          <div className="mt-6 mx-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 size={16} className="text-[#FACC15]" />
              <span className="text-[#FACC15] font-semibold text-sm">Revolution Stats</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Status</span>
                <div className="flex items-center space-x-1">
                  <Flame size={12} className="text-red-500" />
                  <span className="text-red-500 text-sm font-medium">BASED</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Network</span>
                <div className="flex items-center space-x-1">
                  <Zap size={12} className="text-[#005EB8]" />
                  <span className="text-[#005EB8] text-sm font-medium">Solana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Utility Items */}
          <nav className="mt-6 space-y-1 px-3">
            {utilityItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3A8A] text-[#FACC15] shadow-lg'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Social Links */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-center space-x-3">
            <a
              href="https://t.me/ratcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-200 hover:scale-110"
              title="Join our Telegram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/ratcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-black hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110"
              title="Follow us on X"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          <div className="text-center mt-2">
            <p className="text-gray-500 text-xs">Join the Revolution</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;