import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2, Copy, Palette, Type, Image, Sparkles } from 'lucide-react';

interface MemeCreatorProps {
  onBack: () => void;
  templateData?: any;
}

const MemeCreator: React.FC<MemeCreatorProps> = ({ onBack, templateData }) => {
  const [memeText, setMemeText] = useState('');
  const [memeTitle, setMemeTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('corruption-exposed');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [backgroundColor, setBgColor] = useState('#1E3A8A');
  const [fontSize, setFontSize] = useState(16);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [showPreview, setShowPreview] = useState(false);

  // Load template data if provided
  useEffect(() => {
    if (templateData) {
      setMemeTitle(templateData.title);
      setMemeText(templateData.preview);
      setBgColor(templateData.bgColor);
      setTextColor(templateData.textColor);
    }
  }, [templateData]);

  const memeTemplates = [
    {
      id: 'corruption-exposed',
      name: 'Corruption Exposed',
      bgColor: '#DC2626',
      textColor: '#FFFFFF',
      icon: '⚠️',
      description: 'Perfect for exposing corrupt politicians and systems'
    },
    {
      id: 'based-truth',
      name: 'BASED Truth',
      bgColor: '#1E3A8A',
      textColor: '#FACC15',
      icon: '🔥',
      description: 'For spreading BASED facts and reality'
    },
    {
      id: 'rat-revolution',
      name: 'RAT Revolution',
      bgColor: '#FACC15',
      textColor: '#222222',
      icon: '🐭',
      description: 'Classic $RAT revolutionary memes'
    },
    {
      id: 'system-cringe',
      name: 'System Cringe',
      bgColor: '#7C2D12',
      textColor: '#FFFFFF',
      icon: '🤡',
      description: 'Mock the cringe establishment'
    },
    {
      id: 'diamond-hands',
      name: 'Diamond Hands',
      bgColor: '#059669',
      textColor: '#FFFFFF',
      icon: '💎',
      description: 'For HODL and diamond hands content'
    },
    {
      id: 'viral-energy',
      name: 'Viral Energy',
      bgColor: '#7C3AED',
      textColor: '#FFFFFF',
      icon: '⚡',
      description: 'High-energy viral meme format'
    }
  ];

  const predefinedMemes = [
    {
      title: "Netanyahu's Democracy Speedrun",
      text: "Netanyahu destroying Israeli democracy:\n- Judicial coup ✅\n- Ignore protests ✅\n- Corruption charges ✅\n- Still in power ✅\n$RAT: 'Any% democracy destruction run!' 🏃‍♂️💨"
    },
    {
      title: "Israeli Government Logic",
      text: "Israeli Gov: 'We're the only democracy in the Middle East!'\nAlso Israeli Gov: *Literally dismantling democratic institutions*\n$RAT: 'The cognitive dissonance is real!' 🤡"
    },
    {
      title: "Bibi's Greatest Hits",
      text: "Netanyahu's corruption playlist:\n🎵 'Money for Nothing' (taxpayer funds)\n🎵 'I Will Survive' (corruption charges)\n🎵 'Another One Bites the Dust' (democratic norms)\n$RAT: 'Time to change the tune!' 🎶"
    },
    {
      title: "Protest Season Never Ends",
      text: "Israelis protesting for 50+ weeks:\n'Please stop destroying our democracy!'\nNetanyahu: 'No ❤️'\n$RAT: 'The people vs. the rats - we know who we support!' 📢🐭"
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setBgColor(template.bgColor);
    setTextColor(template.textColor);
  };

  const handlePredefinedMeme = (meme: any) => {
    setMemeTitle(meme.title);
    setMemeText(meme.text);
    setShowPreview(true);
  };

  const generateMeme = () => {
    if (!memeText.trim()) return;
    setShowPreview(true);
  };

  const copyMemeText = () => {
    const fullMeme = `${memeTitle}\n\n${memeText}`;
    navigator.clipboard.writeText(fullMeme);
  };

  const downloadMeme = () => {
    // Create a canvas element to generate an image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = textAlign;
    const titleX = textAlign === 'center' ? canvas.width / 2 : textAlign === 'right' ? canvas.width - 40 : 40;
    ctx.fillText(memeTitle, titleX, 80);

    // Main text
    ctx.font = `${fontSize + 4}px Arial`;
    const lines = memeText.split('\n');
    let y = 150;
    
    lines.forEach(line => {
      ctx.fillText(line, titleX, y);
      y += fontSize + 10;
    });

    // Download
    const link = document.createElement('a');
    link.download = `${memeTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_meme.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (showPreview) {
    return (
      <div className="h-full overflow-y-auto smooth-scroll">
        <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#FACC15] transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Editor</span>
              </button>
              <div className="flex items-center space-x-4">
                <button
                  onClick={copyMemeText}
                  className="flex items-center space-x-2 bg-[#005EB8] hover:bg-[#005EB8]/80 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                >
                  <Copy size={16} />
                  <span>Copy Text</span>
                </button>
                <button
                  onClick={downloadMeme}
                  className="flex items-center space-x-2 bg-[#FACC15] hover:bg-[#FACC15]/90 px-4 py-2 rounded-lg text-[#0f172a] font-medium transition-colors"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Meme Preview */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">Meme Preview</h2>
              
              <div 
                className="rounded-xl p-8 border-4 border-gray-600 mx-auto max-w-2xl"
                style={{ 
                  backgroundColor: backgroundColor,
                  color: textColor,
                  textAlign: textAlign
                }}
              >
                <h3 className="text-2xl font-bold mb-6">{memeTitle}</h3>
                <div 
                  className="leading-relaxed whitespace-pre-line"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {memeText}
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-[#FACC15] mb-4">Share Your Meme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://t.me/ratcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
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
                  className="bg-black hover:bg-gray-800 p-4 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
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
  }

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-[#FACC15] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to {templateData ? 'Templates' : 'Meme Factory'}</span>
            </button>
            <div className="flex items-center space-x-2">
              <Sparkles className="text-[#FACC15]" size={20} />
              <span className="text-[#FACC15] font-bold">
                {templateData ? `Editing: ${templateData.title}` : 'Meme Creator'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Creation Tools */}
            <div className="space-y-6">
              {/* Template Selection */}
              {!templateData && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-[#FACC15] mb-4 flex items-center space-x-2">
                    <Palette size={20} />
                    <span>Choose Template</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {memeTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedTemplate === template.id
                            ? 'border-[#FACC15] bg-[#FACC15]/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-2xl mb-2">{template.icon}</div>
                        <div className="text-white font-medium text-sm">{template.name}</div>
                        <div className="text-gray-400 text-xs mt-1">{template.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Input */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-[#FACC15] mb-4 flex items-center space-x-2">
                  <Type size={20} />
                  <span>Create Your Meme</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Meme Title</label>
                    <input
                      type="text"
                      value={memeTitle}
                      onChange={(e) => setMemeTitle(e.target.value)}
                      placeholder="Enter a catchy title..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Meme Content</label>
                    <textarea
                      value={memeText}
                      onChange={(e) => setMemeText(e.target.value)}
                      placeholder="Write your BASED meme content here..."
                      rows={8}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Styling Options */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-[#FACC15] mb-4">Styling Options</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Text Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-10 rounded-lg border border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Background</label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full h-10 rounded-lg border border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Font Size</label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-400 text-sm">{fontSize}px</span>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Text Align</label>
                    <select
                      value={textAlign}
                      onChange={(e) => setTextAlign(e.target.value as 'left' | 'center' | 'right')}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={generateMeme}
                disabled={!memeText.trim() || !memeTitle.trim()}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-[#0f172a] font-bold py-4 rounded-xl transition-all duration-200 hover:scale-105"
              >
                Generate Meme 🔥
              </button>
            </div>

            {/* Right Panel - Quick Templates or Live Preview */}
            <div className="space-y-6">
              {templateData ? (
                // Show live preview when editing a template
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-[#FACC15] mb-4">Live Preview</h3>
                  <div 
                    className="rounded-xl p-6 border-2 border-gray-600"
                    style={{ 
                      backgroundColor: backgroundColor,
                      color: textColor,
                      textAlign: textAlign,
                      minHeight: '300px'
                    }}
                  >
                    <h4 className="text-xl font-bold mb-4">{memeTitle}</h4>
                    <div 
                      className="leading-relaxed whitespace-pre-line"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {memeText}
                    </div>
                  </div>
                </div>
              ) : (
                // Show quick templates when creating from scratch
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-[#FACC15] mb-4">Quick Start Templates</h3>
                  <p className="text-gray-400 mb-6">Click any template to use it as a starting point</p>
                  
                  <div className="space-y-4">
                    {predefinedMemes.map((meme, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-[#FACC15] transition-all duration-200 cursor-pointer"
                        onClick={() => handlePredefinedMeme(meme)}
                      >
                        <h4 className="text-[#FACC15] font-bold mb-2">{meme.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line line-clamp-4">
                          {meme.text.substring(0, 150)}...
                        </p>
                        <button className="mt-3 text-[#FACC15] text-sm font-medium hover:underline">
                          Use This Template →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6">
                <h3 className="text-[#FACC15] font-bold text-lg mb-4">🔥 Meme Creation Tips</h3>
                <div className="space-y-2 text-white text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FACC15] rounded-full"></div>
                    <span>Keep it BASED and authentic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FACC15] rounded-full"></div>
                    <span>Expose corruption with humor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FACC15] rounded-full"></div>
                    <span>Use emojis for extra impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FACC15] rounded-full"></div>
                    <span>Make it shareable and viral</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeCreator;