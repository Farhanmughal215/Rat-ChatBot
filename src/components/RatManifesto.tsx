import React from 'react';
import { Target, Zap, Crown, Users } from 'lucide-react';

const RatManifesto: React.FC = () => {
  const principles = [
    {
      icon: Zap,
      title: "Decentralize the Cheese",
      description: "Power and wealth shouldn't sit in the hands of a few rats. $RAT spreads it back to the people — one meme at a time.",
      color: "text-[#FACC15]"
    },
    {
      icon: Target,
      title: "Expose the Rats in Power",
      description: "We're done pretending not to see the corruption. If they hide in boardrooms or behind flags, we drag them into the light.",
      color: "text-red-500"
    },
    {
      icon: Crown,
      title: "No Kings. Just Sewer Citizens.",
      description: "$RAT belongs to no one — and everyone. No leaders, no gatekeepers. Just a swarm with purpose.",
      color: "text-[#005EB8]"
    }
  ];

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#FACC15] mb-4">📜 THE RAT MANIFESTO 📜</h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">OUR MISSION TO EXPOSE THE CRINGE AND SPREAD THE BASED! 💯</p>
            <div className="bg-[#1E3A8A] rounded-xl p-4 sm:p-6 border border-[#005EB8]">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FACC15] mb-4">🔥 WHEN THE SYSTEM IS SUS, SEND IN THE RATS! 🔥</h2>
              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                We're not here to play nice. We're here to meme, mock, and decentralize everything.
                The memecoin revolution has begun. We're exposing corruption, mocking the elite, and unleashing
                meme-fueled chaos — one rat at a time. No borders. No mercy. Just $RAT.
              </p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-[#FACC15] transition-all duration-300">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-full bg-gray-800 ${principle.color} flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${principle.color}`}>{principle.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{principle.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-4">JOIN US IN THE UNDERGROUND</h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">TOGETHER, WE'LL MAKE THE CRINGE RATS SEETHE!</p>
            <div className="flex items-center justify-center space-x-2">
              <Users className="text-[#FACC15]" size={20} />
              <span className="text-[#FACC15] font-bold text-base sm:text-lg">SEWER CITIZENS UNITED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatManifesto;