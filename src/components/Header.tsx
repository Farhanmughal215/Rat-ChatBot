import React, { useState, useRef, useEffect } from 'react';
import { Shield, Wifi, Circle, Zap, Volume2, VolumeX, Menu, X } from 'lucide-react';

interface HeaderProps {
  username?: string;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ username = '$RAT', sidebarOpen, setSidebarOpen }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Find the audio element from ChatArea component
  useEffect(() => {
    const findAudioElement = () => {
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioRef.current = audioElement;
        setIsMuted(audioElement.muted);
      }
    };

    // Try to find audio element immediately
    findAudioElement();

    // If not found, try again after a short delay
    const timer = setTimeout(findAudioElement, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting and audio is paused, try to play it
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <div className="bg-[#222] border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          {setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-[#FACC15] transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          
          <img 
            src="https://rat.ourwebprojects.pro/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-13-at-00.33.41_ea137fcd.jpg" 
            alt="RAT Logo" 
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
          />
          <div className="hidden sm:block">
            <h1 className="text-[#FACC15] font-bold text-lg sm:text-xl">$RAT Assistant</h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Welcome back, <span className="text-[#FACC15] font-medium">{username}</span> • Exposing the System 🐭
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-[#FACC15] font-bold text-lg">$RAT</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Music Control - Icon Only */}
          <button
            onClick={toggleMute}
            className="text-gray-300 hover:text-[#FACC15] transition-all duration-200 hover:scale-110 p-1"
            title={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
            {isMuted ? (
              <VolumeX size={16} className="text-red-500" />
            ) : (
              <Volume2 size={16} className="text-[#FACC15]" />
            )}
          </button>

          {/* Buy $RAT Button */}
          <button className="flex items-center space-x-1 sm:space-x-2 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base">
            <span className="text-sm sm:text-lg">🐭</span>
            <span className="hidden sm:inline">Buy $RAT</span>
            <span className="sm:hidden">Buy $RAT</span>
          </button>
          
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-900/30 rounded-full border border-green-500/30">
            <Circle size={8} className="text-green-500 fill-current" />
            <span className="text-green-500 text-sm font-medium">BASED</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#005EB8]/20 rounded-full border border-[#005EB8]/30">
            <Wifi size={14} className="text-[#005EB8]" />
            <span className="text-[#005EB8] text-sm font-medium">Solana</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#FACC15]/20 rounded-full border border-[#FACC15]/30">
            <Zap size={14} className="text-[#FACC15]" />
            <span className="text-[#FACC15] text-sm font-medium">VIRAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;