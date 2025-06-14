import React from 'react';
import { Map, CheckCircle, Clock, Zap } from 'lucide-react';

const RevolutionMap: React.FC = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "The Awakening",
      status: "active",
      date: "Q4 2024",
      items: [
        "Launch $RAT on Solana",
        "Build initial community",
        "Create viral meme campaigns",
        "Establish social media presence"
      ]
    },
    {
      phase: "Phase 2",
      title: "The Uprising",
      status: "upcoming",
      date: "Q1 2025",
      items: [
        "Launch RAT Assistant chatbot",
        "Deploy first games",
        "NFT collection drop",
        "Community governance launch"
      ]
    },
    {
      phase: "Phase 3",
      title: "The Revolution",
      status: "upcoming",
      date: "Q2 2025",
      items: [
        "Major exchange listings",
        "Advanced gaming platform",
        "Cross-chain expansion",
        "Partnership announcements"
      ]
    },
    {
      phase: "Phase 4",
      title: "World Domination",
      status: "upcoming",
      date: "Q3 2025",
      items: [
        "Global marketing campaign",
        "Institutional partnerships",
        "Mobile app launch",
        "Metaverse integration"
      ]
    },
    {
      phase: "Phase 5",
      title: "The New Order",
      status: "upcoming",
      date: "Q4 2025",
      items: [
        "DeFi protocol launch",
        "DAO governance expansion",
        "Real-world utility integration",
        "Legacy system disruption"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'active':
        return <Zap className="text-[#FACC15]" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-500/10';
      case 'active':
        return 'border-[#FACC15] bg-[#FACC15]/10';
      default:
        return 'border-gray-600 bg-gray-800/50';
    }
  };

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <Map className="text-[#FACC15]" size={24} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FACC15]">REVOLUTION ROADMAP</h1>
              <p className="text-gray-400 text-sm sm:text-base">Our path to world domination 🌍🚀</p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 sm:p-6 border-2 transition-all duration-300 ${getStatusColor(item.status)}`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[#FACC15]">{item.phase}</h3>
                      <span className="text-gray-400 hidden sm:inline">•</span>
                      <h4 className="text-base sm:text-lg font-semibold text-white">{item.title}</h4>
                      <span className="text-xs sm:text-sm text-gray-400 sm:ml-auto">{item.date}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.items.map((subItem, subIndex) => (
                        <div key={subIndex} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.status === 'completed' ? 'bg-green-500' :
                            item.status === 'active' ? 'bg-[#FACC15]' : 'bg-gray-500'
                          }`}></div>
                          <span className={`text-xs sm:text-sm ${
                            item.status === 'completed' ? 'text-green-400' :
                            item.status === 'active' ? 'text-[#FACC15]' : 'text-gray-400'
                          }`}>
                            {subItem}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-4">🔥 THE REVOLUTION IS JUST BEGINNING 🔥</h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">
              Every milestone brings us closer to exposing the system and spreading the BASED truth!
            </p>
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-500">0/5</div>
                <div className="text-white text-xs sm:text-sm">Phases Complete</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#FACC15]">PHASE 1</div>
                <div className="text-white text-xs sm:text-sm">Currently Active</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-500">∞</div>
                <div className="text-white text-xs sm:text-sm">Revolution Potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevolutionMap;