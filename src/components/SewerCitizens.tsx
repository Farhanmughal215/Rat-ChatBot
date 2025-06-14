import React from 'react';
import { Users, MessageSquare, Trophy, Star } from 'lucide-react';

const SewerCitizens: React.FC = () => {
  const communityStats = [
    { label: "Total Citizens", value: "50,000+", icon: Users, color: "text-[#FACC15]" },
    { label: "Daily Active", value: "12,500", icon: MessageSquare, color: "text-[#005EB8]" },
    { label: "Memes Created", value: "25,000+", icon: Star, color: "text-red-500" },
    { label: "Games Played", value: "100K+", icon: Trophy, color: "text-green-500" }
  ];

  const topCitizens = [
    { rank: 1, name: "RatKing420", points: 15420, badge: "🏆", level: "DIAMOND RAT" },
    { rank: 2, name: "SewerLord", points: 12800, badge: "🥈", level: "GOLD RAT" },
    { rank: 3, name: "MemeQueen", points: 11200, badge: "🥉", level: "GOLD RAT" },
    { rank: 4, name: "BasedRat", points: 9800, badge: "⭐", level: "SILVER RAT" },
    { rank: 5, name: "CryptoRodent", points: 8500, badge: "⭐", level: "SILVER RAT" }
  ];

  const communityChannels = [
    { name: "General Chat", members: "15,420", activity: "🔥 Very Active", description: "Main discussion for all sewer citizens" },
    { name: "Meme Factory", members: "8,200", activity: "🚀 Viral", description: "Share and create the spiciest memes" },
    { name: "Trading Den", members: "12,100", activity: "📈 Active", description: "Discuss $RAT trading strategies" },
    { name: "Gaming Lounge", members: "6,800", activity: "🎮 Active", description: "Coordinate gaming sessions and tournaments" },
    { name: "Revolution HQ", members: "3,500", activity: "🎯 Strategic", description: "Plan our next moves against the system" }
  ];

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <Users className="text-[#FACC15]" size={24} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FACC15]">SEWER CITIZENS</h1>
              <p className="text-gray-400 text-sm sm:text-base">United we stand, divided we fall 🐭🤝</p>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-[#222] rounded-xl p-3 sm:p-4 border border-gray-700 text-center">
                  <Icon className={`mx-auto mb-2 ${stat.color}`} size={20} />
                  <div className={`text-lg sm:text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Top Citizens Leaderboard */}
            <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700">
              <h2 className="text-lg sm:text-xl font-bold text-[#FACC15] mb-4 flex items-center space-x-2">
                <Trophy size={20} />
                <span>Top Sewer Citizens</span>
              </h2>
              <div className="space-y-3">
                {topCitizens.map((citizen) => (
                  <div key={citizen.rank} className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg">
                    <div className="text-lg sm:text-2xl">{citizen.badge}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm sm:text-base">{citizen.name}</span>
                        <span className="text-xs px-2 py-1 bg-[#1E3A8A] text-[#FACC15] rounded-full">
                          {citizen.level}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">{citizen.points.toLocaleString()} points</div>
                    </div>
                    <div className="text-[#FACC15] font-bold text-sm sm:text-base">#{citizen.rank}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Channels */}
            <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700">
              <h2 className="text-lg sm:text-xl font-bold text-[#FACC15] mb-4 flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>Community Channels</span>
              </h2>
              <div className="space-y-3">
                {communityChannels.map((channel, index) => (
                  <div key={index} className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm sm:text-base">#{channel.name}</span>
                      <span className="text-xs text-gray-400">{channel.members} members</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xs sm:text-sm text-gray-300">{channel.description}</span>
                      <span className="text-xs px-2 py-1 bg-[#005EB8] text-white rounded-full mt-1 sm:mt-0 self-start sm:self-auto">
                        {channel.activity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-[#FACC15] mb-4">🐭 Sewer Citizen Code 🐭</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Stay BASED, avoid CRINGE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Share memes, spread the revolution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Help fellow rats in need</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Expose corruption when you see it</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">No kings, just sewer citizens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Diamond hands, diamond hearts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-4">🤝 JOIN THE UNDERGROUND 🤝</h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">
              Together we're stronger than any corrupt system. Join thousands of fellow rats in the revolution!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="https://t.me/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-bold transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span>Join Telegram</span>
              </a>
              <a
                href="https://twitter.com/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-bold transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Follow on X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SewerCitizens;