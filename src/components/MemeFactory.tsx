import React, { useState } from 'react';
import { Flame, Download, Heart, Copy, Plus } from 'lucide-react';
import MemeCreator from './MemeCreator';
import MemeTemplates from './MemeTemplates';

const MemeFactory: React.FC = () => {
  const [selectedMeme, setSelectedMeme] = useState<number | null>(null);
  const [showMemeCreator, setShowMemeCreator] = useState(false);
  const [showMemeTemplates, setShowMemeTemplates] = useState(false);
  const [memeLikes, setMemeLikes] = useState<{ [key: number]: number }>({
    1: 2420,
    2: 3100,
    3: 4200,
    4: 2800,
    5: 3500,
    6: 2900,
    7: 2600,
    8: 3800
  });

  const textMemes = [
    {
      id: 1,
      title: "Netanyahu's Cheese Problem",
      content: "Netanyahu: 'We need more security!'\n$RAT: 'Sir, this is a Wendy's... and you're the one stealing the cheese!' 🐭🧀",
      shares: 890,
      category: "Political Roast"
    },
    {
      id: 2,
      title: "Israeli Government Logic",
      content: "Israeli Gov: 'We're fighting for democracy!'\nAlso Israeli Gov: *Literally ignoring their own people's protests*\n$RAT: 'The real rats are in the Knesset!' 🏛️🐭",
      shares: 1200,
      category: "System Exposed"
    },
    {
      id: 3,
      title: "Bibi's Corruption Speedrun",
      content: "Netanyahu corruption scandals speedrun:\n- Bribery ✅\n- Fraud ✅\n- Breach of trust ✅\n- Still in power ✅\n$RAT: 'Any% corruption glitchless run!' 🏃‍♂️💨",
      shares: 1800,
      category: "Corruption Call-Out"
    },
    {
      id: 4,
      title: "Israeli Democracy Status",
      content: "Israeli Democracy:\n❌ Offline\n❌ Under Maintenance\n❌ 404 Not Found\n✅ Replaced by Authoritarian Rats\n$RAT: 'Time for a system reboot!' 🔄",
      shares: 950,
      category: "Democracy Check"
    },
    {
      id: 5,
      title: "Judicial Reform = Rat Takeover",
      content: "Netanyahu's 'Judicial Reform':\nStep 1: Remove judges\nStep 2: Install yes-men\nStep 3: Profit from corruption\n$RAT: 'We see you, government rats!' 👀🐭",
      shares: 1400,
      category: "Reform Roast"
    },
    {
      id: 6,
      title: "Protest Season",
      content: "Israelis protesting for 50+ weeks:\n'Please stop destroying our democracy!'\nNetanyahu: 'No ❤️'\n$RAT: 'The people vs. the rats - guess who we're rooting for!' 📢🐭",
      shares: 1100,
      category: "People Power"
    },
    {
      id: 7,
      title: "Coalition of Chaos",
      content: "Israeli Government Coalition:\n- Ultra-Orthodox extremists ✅\n- Settler fanatics ✅\n- Corruption enablers ✅\n- Actual democrats ❌\n$RAT: 'This is what peak cringe looks like!' 🤡",
      shares: 820,
      category: "Coalition Cringe"
    },
    {
      id: 8,
      title: "Bibi's Greatest Hits",
      content: "Netanyahu's playlist:\n🎵 'I Will Survive' (corruption charges)\n🎵 'Money for Nothing' (taxpayer funds)\n🎵 'Another One Bites the Dust' (democratic institutions)\n$RAT: 'Time to change the tune!' 🎶🐭",
      shares: 1600,
      category: "Musical Mockery"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleHeartClick = (memeId: number) => {
    setMemeLikes(prev => ({
      ...prev,
      [memeId]: (prev[memeId] || 0) + 1
    }));
  };

  const handleCreateTextMeme = () => {
    setShowMemeCreator(true);
  };

  const handleMemeTemplates = () => {
    setShowMemeTemplates(true);
  };

  const handleBackToFactory = () => {
    setShowMemeCreator(false);
    setShowMemeTemplates(false);
  };

  if (showMemeCreator) {
    return <MemeCreator onBack={handleBackToFactory} />;
  }

  if (showMemeTemplates) {
    return <MemeTemplates onBack={handleBackToFactory} />;
  }

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <Flame className="text-[#FACC15]" size={24} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FACC15]">VIRAL MEME FACTORY</h1>
              <p className="text-gray-400 text-sm sm:text-base">Our memes hit harder than a bear market! 📉💥</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {textMemes.map((meme) => (
              <div
                key={meme.id}
                className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-[#FACC15] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#FACC15] font-bold text-base sm:text-lg">{meme.title}</h3>
                  <span className="text-xs px-2 py-1 bg-[#1E3A8A] text-[#FACC15] rounded-full">
                    {meme.category}
                  </span>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-4 border-l-4 border-[#FACC15]">
                  <p className="text-gray-200 whitespace-pre-line font-mono text-xs sm:text-sm leading-relaxed">
                    {meme.content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleHeartClick(meme.id)}
                      className="flex items-center space-x-1 hover:scale-110 transition-transform duration-200 group"
                    >
                      <Heart 
                        size={14} 
                        className="text-red-500 group-hover:fill-current transition-all duration-200" 
                      />
                      <span className="text-gray-400 text-xs sm:text-sm font-medium">
                        {memeLikes[meme.id]?.toLocaleString()}
                      </span>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => copyToClipboard(meme.content)}
                      className="bg-[#005EB8] hover:bg-[#005EB8]/80 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Copy size={10} />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#FACC15] mb-4">🔥 MEME CREATION TOOLS 🔥</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleCreateTextMeme}
                className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 p-3 sm:p-4 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Plus size={16} />
                <span className="text-sm sm:text-base">📝 Create Text Meme</span>
              </button>
              <button 
                onClick={handleMemeTemplates}
                className="bg-[#005EB8] hover:bg-[#005EB8]/80 p-3 sm:p-4 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span className="text-sm sm:text-base">🎨 Meme Templates</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">⚠️ CORRUPTION EXPOSED ⚠️</h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">
              When the system is rigged, we meme the truth! No corruption goes unnoticed by the $RAT army!
            </p>
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">8</div>
                <div className="text-white text-xs sm:text-sm">Anti-Corruption Memes</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">
                  {Object.values(memeLikes).reduce((a, b) => a + b, 0).toLocaleString()}
                </div>
                <div className="text-white text-xs sm:text-sm">Total Hearts</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">∞</div>
                <div className="text-white text-xs sm:text-sm">Rats Exposed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeFactory;