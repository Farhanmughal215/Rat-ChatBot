import React, { useState } from 'react';
import { ArrowLeft, Download, Copy, Eye, Heart, Sparkles, Zap, Target, Crown, Flame, Edit } from 'lucide-react';
import MemeCreator from './MemeCreator';

interface MemeTemplatesProps {
  onBack: () => void;
}

const MemeTemplates: React.FC<MemeTemplatesProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [showMemeCreator, setShowMemeCreator] = useState(false);
  const [selectedTemplateData, setSelectedTemplateData] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Templates', icon: Sparkles },
    { id: 'corruption', name: 'Corruption Exposed', icon: Target },
    { id: 'political', name: 'Political Roast', icon: Crown },
    { id: 'crypto', name: 'Crypto Memes', icon: Zap },
    { id: 'viral', name: 'Viral Energy', icon: Flame }
  ];

  const memeTemplates = [
    {
      id: 1,
      title: "Government Corruption Exposé",
      category: "corruption",
      preview: "When [POLITICIAN] says they're fighting corruption:\n\n*Meanwhile [POLITICIAN] literally taking bribes*\n\n$RAT: 'We see you! 👀'",
      description: "Perfect for exposing corrupt politicians and their hypocrisy",
      likes: 1420,
      uses: 890,
      bgColor: "#DC2626",
      textColor: "#FFFFFF",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Democracy Destruction Speedrun",
      category: "political",
      preview: "[COUNTRY] destroying democracy speedrun:\n- Ignore protests ✅\n- Attack judiciary ✅\n- Silence media ✅\n- Call it 'reform' ✅\n\n$RAT: 'Any% democracy destruction!' 🏃‍♂️💨",
      description: "For when governments destroy democratic institutions",
      likes: 2100,
      uses: 1200,
      bgColor: "#7C2D12",
      textColor: "#FFFFFF",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Crypto Diamond Hands",
      category: "crypto",
      preview: "Me watching [COIN] dump 50%:\n\n'This is fine' 🔥\n\n*Continues HODLing*\n\n$RAT: 'Diamond hands forever!' 💎🙌",
      description: "Classic HODL meme template for crypto volatility",
      likes: 3200,
      uses: 2100,
      bgColor: "#059669",
      textColor: "#FFFFFF",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "System Cringe Alert",
      category: "corruption",
      preview: "[INSTITUTION]: 'We're here to help the people!'\n\nAlso [INSTITUTION]: *Literally oppressing the people*\n\n$RAT: 'The cringe is off the charts!' 🤡📈",
      description: "Mock institutions that claim to help while causing harm",
      likes: 1800,
      uses: 950,
      bgColor: "#7C3AED",
      textColor: "#FFFFFF",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "War Crimes Bingo",
      category: "political",
      preview: "[COUNTRY] War Crimes Bingo:\n- Target civilians ✅\n- Destroy hospitals ✅\n- Block aid ✅\n- Call it 'self-defense' ✅\n\n$RAT: 'BINGO! We have a winner!' 🎯",
      description: "Expose war crimes with dark humor",
      likes: 2800,
      uses: 1500,
      bgColor: "#DC2626",
      textColor: "#FFFFFF",
      difficulty: "Hard"
    },
    {
      id: 6,
      title: "Pump and Dump Classic",
      category: "crypto",
      preview: "Influencer: 'This coin will 100x!'\n\n*Coin pumps 10%*\n\nInfluencer: *Sells everything*\n\n$RAT: 'Classic pump and dump!' 📉💸",
      description: "Call out crypto influencer scams",
      likes: 2400,
      uses: 1800,
      bgColor: "#DC2626",
      textColor: "#FACC15",
      difficulty: "Easy"
    },
    {
      id: 7,
      title: "Media Manipulation Exposed",
      category: "corruption",
      preview: "Media: '[BIASED HEADLINE]'\n\nReality: *Completely different story*\n\nPeople: 'Wait, that's not what happened!'\n\n$RAT: 'Propaganda machine go brrrr!' 📺🤡",
      description: "Expose media bias and manipulation",
      likes: 1900,
      uses: 1100,
      bgColor: "#1E3A8A",
      textColor: "#FACC15",
      difficulty: "Medium"
    },
    {
      id: 8,
      title: "Viral Energy Explosion",
      category: "viral",
      preview: "When your meme hits different:\n\n*Starts trending worldwide*\n\n'I made this' 😎\n\n$RAT: 'VIRAL ENERGY ACTIVATED!' ⚡🚀",
      description: "Celebrate viral content and meme success",
      likes: 4200,
      uses: 3100,
      bgColor: "#FACC15",
      textColor: "#222222",
      difficulty: "Easy"
    },
    {
      id: 9,
      title: "International Law Violation",
      category: "political",
      preview: "[COUNTRY]: 'We follow international law!'\n\nUN: 'You've violated 67 resolutions'\n\n[COUNTRY]: 'Those don't count'\n\n$RAT: 'International law is just a suggestion!' 🤷‍♂️⚖️",
      description: "Call out countries that ignore international law",
      likes: 2600,
      uses: 1400,
      bgColor: "#7C2D12",
      textColor: "#FFFFFF",
      difficulty: "Hard"
    },
    {
      id: 10,
      title: "Rug Pull Warning",
      category: "crypto",
      preview: "New token launches:\n\n'100% safe! Liquidity locked!'\n\n*24 hours later*\n\nDevelopers: *Vanished with funds*\n\n$RAT: 'Another one bites the dust!' 💸👻",
      description: "Warn about crypto rug pulls and scams",
      likes: 1700,
      uses: 890,
      bgColor: "#DC2626",
      textColor: "#FFFFFF",
      difficulty: "Medium"
    },
    {
      id: 11,
      title: "Protest Power",
      category: "political",
      preview: "Government: 'Nobody wants change!'\n\n*Millions protesting in the streets*\n\nGovernment: 'These are just extremists'\n\n$RAT: 'The people have spoken!' 📢✊",
      description: "Support protest movements and people power",
      likes: 3100,
      uses: 2200,
      bgColor: "#059669",
      textColor: "#FFFFFF",
      difficulty: "Easy"
    },
    {
      id: 12,
      title: "BASED Truth Bomb",
      category: "viral",
      preview: "Everyone: 'You can't say that!'\n\nMe: *Says it anyway*\n\n'Sometimes the truth hurts' 💣\n\n$RAT: 'BASED and truth-pilled!' 🔥💯",
      description: "For dropping uncomfortable truths",
      likes: 2900,
      uses: 1900,
      bgColor: "#1E3A8A",
      textColor: "#FACC15",
      difficulty: "Medium"
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? memeTemplates 
    : memeTemplates.filter(template => template.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-600/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-600/20';
      case 'Hard': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const copyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.preview);
    // Show a brief success message (you could add a toast notification here)
  };

  const useTemplate = (template: any) => {
    setSelectedTemplateData(template);
    setShowMemeCreator(true);
  };

  const handleBackToTemplates = () => {
    setShowMemeCreator(false);
    setSelectedTemplateData(null);
  };

  if (showMemeCreator) {
    return <MemeCreator onBack={handleBackToTemplates} templateData={selectedTemplateData} />;
  }

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-[#FACC15] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Meme Factory</span>
            </button>
            <div className="flex items-center space-x-2">
              <Sparkles className="text-[#FACC15]" size={20} />
              <span className="text-[#FACC15] font-bold">Meme Templates</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#FACC15] mb-4">🎨 MEME TEMPLATES 🎨</h1>
            <p className="text-xl text-gray-300">
              Professional meme templates for maximum viral impact!
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[#FACC15] text-[#0f172a]'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-[#FACC15]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-[#FACC15]/50 transition-all duration-300 overflow-hidden group"
              >
                {/* Template Preview */}
                <div 
                  className="p-6 min-h-[200px] flex items-center justify-center text-center"
                  style={{ 
                    backgroundColor: template.bgColor,
                    color: template.textColor
                  }}
                >
                  <div className="text-sm font-mono leading-relaxed whitespace-pre-line">
                    {template.preview}
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6 bg-slate-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[#FACC15] font-bold text-lg">{template.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart size={14} className="text-red-500" />
                        <span className="text-gray-400 text-sm">{template.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} className="text-blue-400" />
                        <span className="text-gray-400 text-sm">{template.uses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyTemplate(template)}
                      className="flex-1 bg-[#005EB8] hover:bg-[#005EB8]/80 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => useTemplate(template)}
                      className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit size={14} />
                      <span>Use</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-[#FACC15] mb-1">{memeTemplates.length}</div>
              <div className="text-gray-400 text-sm">Total Templates</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {memeTemplates.reduce((sum, t) => sum + t.uses, 0).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Times Used</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">
                {memeTemplates.reduce((sum, t) => sum + t.likes, 0).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Total Likes</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">∞</div>
              <div className="text-gray-400 text-sm">Viral Potential</div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-4">🚀 CREATE VIRAL CONTENT 🚀</h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Use these professional templates to create memes that expose corruption, spread truth, and go viral across all platforms!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://t.me/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-bold transition-colors flex items-center space-x-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span>Share on Telegram</span>
              </a>
              <a
                href="https://twitter.com/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg text-white font-bold transition-colors flex items-center space-x-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Share on X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeTemplates;