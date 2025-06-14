import React from 'react';
import { TrendingUp, PieChart, Coins, Lock } from 'lucide-react';

const Tokenomics: React.FC = () => {
  const tokenData = [
    { label: "Community & Rewards", percentage: 40, color: "bg-[#FACC15]", description: "For the sewer citizens who HODL and spread the revolution" },
    { label: "Liquidity Pool", percentage: 30, color: "bg-[#005EB8]", description: "Ensuring smooth trading on Solana DEXs" },
    { label: "Marketing & Memes", percentage: 20, color: "bg-red-500", description: "Funding our viral meme campaigns and exposure" },
    { label: "Team & Development", percentage: 10, color: "bg-green-500", description: "Building the future of BASED finance" }
  ];

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <TrendingUp className="text-[#FACC15]" size={24} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FACC15]">$RAT TOKENOMICS</h1>
              <p className="text-gray-400 text-sm sm:text-base">Revolutionary economics for the BASED revolution 🚀</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <PieChart className="text-[#FACC15]" size={20} />
                <h2 className="text-lg sm:text-xl font-bold text-[#FACC15]">Token Distribution</h2>
              </div>
              <div className="space-y-4">
                {tokenData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium text-sm sm:text-base">{item.label}</span>
                      <span className="text-[#FACC15] font-bold text-sm sm:text-base">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-2 sm:h-3 rounded-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <Coins className="text-[#FACC15]" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold text-[#FACC15]">Token Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Total Supply:</span>
                    <span className="text-white font-bold text-sm sm:text-base">1,000,000,000 $RAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Network:</span>
                    <span className="text-[#005EB8] font-bold text-sm sm:text-base">Solana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Decimals:</span>
                    <span className="text-white font-bold text-sm sm:text-base">9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm sm:text-base">Launch:</span>
                    <span className="text-green-500 font-bold text-sm sm:text-base">LIVE 🔥</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <Lock className="text-red-500" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold text-red-500">Anti-Rug Features</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm sm:text-base">Liquidity Locked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm sm:text-base">Contract Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm sm:text-base">No Mint Function</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm sm:text-base">Community Owned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-4">🚀 $RAT TO THE MOON 🚀</h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">Built for the community, by the community. No VCs, no insider trading - just pure BASED tokenomics!</p>
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">100%</div>
                <div className="text-white text-xs sm:text-sm">Community Driven</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">0%</div>
                <div className="text-white text-xs sm:text-sm">Team Allocation</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">∞</div>
                <div className="text-white text-xs sm:text-sm">Meme Potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;