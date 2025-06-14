import React, { useState } from 'react';
import { Gamepad2, Trophy, Star, Play, Clock, Zap } from 'lucide-react';
import CryptoWordHunt from './CorruptionCodeBreaker';
import RatKnowledgeQuiz from './RatKnowledgeQuiz';
import BlockchainTowerStacker from './BlockchainTowerStacker';

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 1,
      title: "$RAT Knowledge Quiz",
      description: "Test your expertise in rat revolution, blockchain technology, and $RAT tokenomics. Earn prestigious titles based on your performance and become a RAT Grandmaster!",
      icon: "🏆",
      difficulty: "Medium",
      duration: "5-10 min",
      category: "Knowledge",
      rewards: "100-500 $RAT",
      status: "Live",
      bgColor: "from-yellow-600 to-yellow-800",
      players: 1337,
      gameComponent: "rat-knowledge-quiz"
    },
    {
      id: 2,
      title: "Crypto Word Hunt",
      description: "A sleek Wordle-inspired daily puzzle game with crypto terminology. Guess 4-letter crypto words like 'HODL', 'HASH', or 'MINE' and build your streak!",
      icon: "🎯",
      difficulty: "Medium",
      duration: "5-15 min",
      category: "Logic Puzzle",
      rewards: "NFT + $RAT",
      status: "Live",
      bgColor: "from-blue-600 to-blue-800",
      players: 2100,
      gameComponent: "crypto-word-hunt"
    },
    {
      id: 3,
      title: "Blockchain Tower Stacker",
      description: "A fast-paced tap game where you're stacking blocks to build a vertical blockchain tower. Perfect timing is key - miss and watch the chain collapse! Each block exposes Israeli crimes!",
      icon: "🏗️",
      difficulty: "Easy",
      duration: "2-5 min",
      category: "Action",
      rewards: "50-1000 $RAT",
      status: "Live",
      bgColor: "from-orange-600 to-red-700",
      players: 890,
      gameComponent: "blockchain-tower-stacker"
    },
    {
      id: 4,
      title: "Rat Lab",
      description: "A vibrant crypto alchemy game where you mix digital elements like Gold, Zinc, Power, and Blockchain to discover unique NFT items and virtual tools through fusion!",
      icon: "🧪",
      difficulty: "Medium",
      duration: "10-20 min",
      category: "Crafting",
      rewards: "Rare NFTs",
      status: "Coming Soon",
      bgColor: "from-purple-600 to-purple-800",
      players: 0
    },
    {
      id: 5,
      title: "Mining Luck Spin",
      description: "Test your fortune with this engaging spin-the-wheel game! Get mining-related results like 'Golden Motherlode', 'Zinc Bonanza', or 'Slipped on Rock' - purely cosmetic but very engaging!",
      icon: "⚡",
      difficulty: "Easy",
      duration: "2-5 min",
      category: "Luck",
      rewards: "1000+ $RAT",
      status: "Coming Soon",
      bgColor: "from-green-600 to-green-800",
      players: 0
    },
    {
      id: 6,
      title: "Mining Operations Simulator",
      description: "Manage virtual mining operations in Tasmania. Make strategic decisions about resource allocation, environmental impact, and production efficiency.",
      icon: "⚙️",
      difficulty: "Hard",
      duration: "15-30 min",
      category: "Strategy",
      rewards: "Premium NFTs",
      status: "Coming Soon",
      bgColor: "from-gray-600 to-gray-800",
      players: 0
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-[#FACC15]';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Knowledge': return 'bg-blue-600';
      case 'Logic Puzzle': return 'bg-purple-600';
      case 'Action': return 'bg-red-600';
      case 'Crafting': return 'bg-green-600';
      case 'Luck': return 'bg-yellow-600';
      case 'Strategy': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const handlePlayGame = (game: any) => {
    if (game.gameComponent) {
      setActiveGame(game.gameComponent);
    }
  };

  const handleBackToGames = () => {
    setActiveGame(null);
  };

  // Render specific game component
  if (activeGame === 'crypto-word-hunt') {
    return <CryptoWordHunt onBack={handleBackToGames} />;
  }

  if (activeGame === 'rat-knowledge-quiz') {
    return <RatKnowledgeQuiz onBack={handleBackToGames} />;
  }

  if (activeGame === 'blockchain-tower-stacker') {
    return <BlockchainTowerStacker onBack={handleBackToGames} />;
  }

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#FACC15] rounded-2xl mb-4 sm:mb-6">
              <Gamepad2 size={32} className="text-[#0f172a]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#FACC15] mb-4">$RAT Games Hub</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Learn, play, and master the world of rat-backed cryptocurrency through interactive games and challenges
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-slate-700 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-1">3</div>
              <div className="text-gray-400 text-xs sm:text-sm">Live Games</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-slate-700 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">6</div>
              <div className="text-gray-400 text-xs sm:text-sm">Total Games</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-slate-700 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">6</div>
              <div className="text-gray-400 text-xs sm:text-sm">Categories</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-slate-700 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">∞</div>
              <div className="text-gray-400 text-xs sm:text-sm">Learning Fun</div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {games.map((game) => (
              <div
                key={game.id}
                className={`relative bg-gradient-to-br ${game.bgColor} rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-[#FACC15]/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                  game.status === 'Coming Soon' ? 'opacity-75' : ''
                }`}
                onClick={() => setSelectedGame(game.id)}
              >
                {game.status === 'Coming Soon' && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </div>
                )}
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-base sm:text-lg leading-tight">{game.title}</h3>
                  </div>
                </div>

                <p className="text-gray-200 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  {game.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1">
                    <span className={getDifficultyColor(game.difficulty)}>{game.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} className="text-gray-300" />
                    <span className="text-gray-300">{game.duration}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(game.category)}`}>
                    {game.category}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs sm:text-sm">
                    <span className="text-gray-300">Rewards: </span>
                    <span className="text-[#FACC15] font-medium">{game.rewards}</span>
                  </div>
                  {game.players > 0 && (
                    <div className="text-xs sm:text-sm text-gray-300">
                      {game.players.toLocaleString()} players
                    </div>
                  )}
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (game.status === 'Live') {
                      handlePlayGame(game);
                    }
                  }}
                  className={`w-full py-2 sm:py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                    game.status === 'Live' 
                      ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a]' 
                      : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                  disabled={game.status === 'Coming Soon'}
                >
                  <Play size={14} />
                  <span>{game.status === 'Coming Soon' ? 'Coming Soon' : 'Play Now'}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700 text-center hover:border-[#FACC15]/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FACC15]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Trophy className="text-[#FACC15]" size={24} />
              </div>
              <h3 className="text-[#FACC15] font-bold text-lg sm:text-xl mb-3">Leaderboards</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Compete for the top spot and earn exclusive rewards!</p>
              <button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-[#FACC15] font-medium transition-colors text-sm sm:text-base">
                View Rankings
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700 text-center hover:border-[#FACC15]/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FACC15]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="text-[#FACC15]" size={24} />
              </div>
              <h3 className="text-[#FACC15] font-bold text-lg sm:text-xl mb-3">Achievements</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Unlock badges and earn bonus $RAT tokens!</p>
              <button className="bg-[#005EB8] hover:bg-[#005EB8]/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white font-medium transition-colors text-sm sm:text-base">
                My Progress
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700 text-center hover:border-[#FACC15]/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FACC15]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="text-[#FACC15]" size={24} />
              </div>
              <h3 className="text-[#FACC15] font-bold text-lg sm:text-xl mb-3">Tournaments</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Join weekly tournaments for massive $RAT prizes!</p>
              <button className="bg-[#FACC15] hover:bg-[#FACC15]/90 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-[#0f172a] font-medium transition-colors text-sm sm:text-base">
                Join Now
              </button>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-2xl p-6 sm:p-8 text-center border border-slate-600/50">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-4">🎮 PLAY TO EARN REVOLUTION 🎮</h2>
            <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto">
              Every game you play helps spread the $RAT revolution while earning you real rewards! Join thousands of sewer citizens in the ultimate gaming experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-2">10M+</div>
                <div className="text-white text-xs sm:text-sm">$RAT Distributed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-2">50K+</div>
                <div className="text-white text-xs sm:text-sm">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-2">24/7</div>
                <div className="text-white text-xs sm:text-sm">Gaming Action</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;