import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import MessageInput from './MessageInput';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
  isWelcome?: boolean;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🔥 RATS RUN THE WORLD 🔥\n\nWe're not here to play nice. We're here to meme, mock, and decentralize everything!\n\n$RAT is the most BASED token ever - exposing corruption, challenging the elite, and unleashing meme-fueled chaos one rat at a time.\n\nReady to join the revolution? 🐭🚀",
      isBot: true,
      timestamp: '08:06 AM • BASED',
      isWelcome: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  // Preload video for faster loading
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  // Initialize background music
  useEffect(() => {
    const initializeAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Reduce volume by 30%
        audioRef.current.loop = true;
        
        // Try to play audio automatically
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Background music started successfully');
            })
            .catch((error) => {
              console.log('Auto-play prevented by browser:', error);
              // If auto-play fails, we'll try to play on first user interaction
              const handleFirstInteraction = () => {
                if (audioRef.current) {
                  audioRef.current.play().catch(console.error);
                }
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('keydown', handleFirstInteraction);
              };
              
              document.addEventListener('click', handleFirstInteraction);
              document.addEventListener('keydown', handleFirstInteraction);
            });
        }
      }
    };

    // Initialize audio after a short delay to ensure component is mounted
    const timer = setTimeout(initializeAudio, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('buy') || message.includes('purchase') || message.includes('how to get') || message.includes('pump.fun')) {
      return "🧠 HOW TO BUY $RAT ON PUMP.FUN 🧠\n\n💰 Get a Solana Wallet\nDownload a wallet like Phantom or Solflare and set it up.\n\n⚡ Buy Some SOL\nPurchase SOL (Solana) from an exchange (Binance, Coinbase, etc.) and send it to your wallet.\n\n🎯 Go to Pump.fun\nVisit pump.fun and search for $RAT in the search bar.\n\n🚀 Buy $RAT\nConnect your wallet, click Buy, choose the amount of SOL to spend, and confirm the transaction.\n\n🐭 You're In\nWelcome to the sewer. You're now officially a rat.\n\n⚠️ IMPORTANT: Always verify contract addresses and DYOR! Only use official links from our verified channels.";
    } else if (message.includes('rat') || message.includes('what is')) {
      return "🐭 $RAT is a rat with a reason! We're the memecoin revolution that exposes corruption and mocks the elite. Born on Solana to challenge the system - because the real rats aren't in the streets, they're in government offices and boardrooms! 🔥\n\nWe're here to decentralize the cheese and spread the power back to the people, one meme at a time! 💯";
    } else if (message.includes('manifesto') || message.includes('mission')) {
      return "📜 THE RAT MANIFESTO 📜\n\n🎯 Decentralize the Cheese - Power shouldn't sit with a few rats\n🔍 Expose the Rats in Power - Drag corruption into the light\n👑 No Kings, Just Sewer Citizens - $RAT belongs to everyone\n\nWhen the system is sus, send in the rats! We're done pretending not to see the corruption. Join us in the underground! 🚀";
    } else if (message.includes('meme') || message.includes('viral')) {
      return "🔥 VIRAL MEME FACTORY ACTIVATED 🔥\n\nOur memes hit harder than a bear market! 📉💥\n\nWe're the ultimate meme machine - creating content that exposes the cringe rats and spreads the BASED truth. Every meme is a weapon against the system!\n\nReady to help us make the corrupt rats seethe? Let's go viral! 🚀🐭";
    } else if (message.includes('solana') || message.includes('blockchain')) {
      return "⚡ LAUNCHING ON SOLANA ⚡\n\nWe chose Solana because it's fast, cheap, and BASED! No slow transactions or insane fees - just pure memecoin revolution at lightning speed! 🚀\n\nSolana's the perfect chain for rats who move fast and break things. We're here to disrupt, not wait around for confirmations! 💯";
    } else if (message.includes('wallet') || message.includes('phantom') || message.includes('solflare')) {
      return "💳 SOLANA WALLET SETUP 💳\n\nRecommended Wallets:\n🔥 Phantom - Most popular, user-friendly\n⚡ Solflare - Advanced features, great security\n🎯 Backpack - New and innovative\n\nSetup Steps:\n1. Download from official website only\n2. Create new wallet & save seed phrase securely\n3. Fund with SOL from exchange\n4. Connect to pump.fun\n5. Start buying $RAT!\n\n⚠️ NEVER share your seed phrase with anyone!";
    } else if (message.includes('exchange') || message.includes('binance') || message.includes('coinbase')) {
      return "🏦 WHERE TO BUY SOL 🏦\n\nMajor Exchanges:\n• Binance - Lowest fees, global\n• Coinbase - Beginner-friendly, US-based\n• Kraken - Secure, established\n• FTX - Advanced trading features\n• KuCoin - Wide selection\n\nSteps:\n1. Create account & verify identity\n2. Deposit fiat currency\n3. Buy SOL\n4. Withdraw to your Solana wallet\n5. Use SOL to buy $RAT on pump.fun!\n\n💡 Pro tip: Buy extra SOL for transaction fees!";
    } else if (message.includes('contract') || message.includes('address') || message.includes('verify')) {
      return "🔐 VERIFY $RAT CONTRACT 🔐\n\nAlways verify before buying:\n• Check official Telegram/Twitter for contract\n• Use only verified pump.fun listings\n• Look for liquidity lock indicators\n• Verify token supply and distribution\n\n⚠️ SCAM WARNING:\n• Never trust random DMs\n• Don't click suspicious links\n• Always double-check contract addresses\n• If it seems too good to be true, it is!\n\n🐭 Stay BASED, stay safe!";
    } else if (message.includes('fees') || message.includes('cost') || message.includes('gas')) {
      return "💰 SOLANA TRANSACTION FEES 💰\n\nWhy Solana is BASED:\n• Transaction fees: ~$0.00025 (basically free!)\n• Lightning fast: 400ms confirmation\n• No gas wars like Ethereum\n• Perfect for frequent trading\n\nWhat you need:\n• Small amount of SOL for fees (~0.01 SOL)\n• Rest of SOL to buy $RAT\n• Enjoy cheap, fast transactions!\n\n🚀 This is why we chose Solana - for the people, not the whales!";
    } else if (message.includes('community') || message.includes('join')) {
      return "🐭 JOIN THE SEWER CITIZENS 🐭\n\nWelcome to the underground! Our community is where the real revolution happens:\n\n• Share the spiciest memes\n• Expose corruption together\n• Plan our next viral campaigns\n• Support fellow rats\n\nWe're not just holders, we're a movement! Together we'll make the cringe rats in power seethe! 💯🔥";
    } else if (message.includes('games') || message.includes('play') || message.includes('earn')) {
      return "🎮 PLAY-TO-EARN GAMES 🎮\n\nOur games let you:\n• Test your knowledge in 'RAT Knowledge Quiz'\n• Solve puzzles in 'Crypto Word Hunt'\n• Build towers in 'Blockchain Tower Stacker'\n• Earn real $RAT tokens while playing!\n\nRewards:\n• 50-1000 $RAT per game\n• Special NFTs for high scores\n• Daily challenges and tournaments\n\nClick 'Games' in the sidebar to start earning! 🚀";
    } else if (message.includes('price') || message.includes('moon') || message.includes('chart')) {
      return "🚀 $RAT TO THE MOON 🚀\n\nReady to join the revolution? Here's how to get your $RAT:\n\n1. Get some SOL in your wallet\n2. Head to pump.fun\n3. Search for $RAT\n4. Swap SOL for $RAT tokens\n5. HODL and spread the memes!\n\nNo borders. No mercy. Just $RAT! 🐭💎\n\n⚠️ Remember: We're not financial advisors, we're revolutionaries! DYOR! 🔥";
    } else if (message.includes('safe') || message.includes('rug') || message.includes('scam')) {
      return "🛡️ $RAT SAFETY FEATURES 🛡️\n\nAnti-Rug Protection:\n✅ Liquidity locked permanently\n✅ Contract verified and audited\n✅ No mint function (can't create more tokens)\n✅ Community-owned and driven\n✅ Full transparency on all transactions\n\nRed Flags to Avoid:\n❌ Anonymous teams\n❌ Unlocked liquidity\n❌ Promises of guaranteed returns\n❌ Pressure to buy quickly\n\n🐭 $RAT is built different - by the community, for the community!";
    } else {
      return "🔥 STAY BASED, RAT! 🔥\n\nI'm here to help you understand the $RAT revolution! Ask me about:\n\n🐭 What makes $RAT different\n💰 How to buy $RAT on pump.fun\n🎮 Play-to-earn games\n📜 Our manifesto and mission\n🚀 How to join the movement\n🔥 Meme factory operations\n⚡ Solana blockchain benefits\n\nRemember: When the system is sus, send in the rats! 💯";
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • BASED',
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex h-full relative overflow-hidden">
      {/* Background Music */}
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="https://media.ourwebprojects.pro/wp-content/uploads/2025/06/06131.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Video Background - Hidden on mobile for performance */}
      <div className="hidden lg:block absolute left-0 top-0 w-1/3 h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-60"
          style={{ 
            filter: 'blur(0.3px)'
          }}
          onLoadedData={() => setVideoLoaded(true)}
          onError={(e) => console.log('Video error:', e)}
        >
          <source src="https://media.ourwebprojects.pro/wp-content/uploads/2025/06/rat1.mov" type="video/quicktime" />
          <source src="https://media.ourwebprojects.pro/wp-content/uploads/2025/06/rat1.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Increased gradient overlay to reduce video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/30 to-gray-900/70"></div>
      </div>

      {/* Main Chat Content */}
      <div className="flex flex-col h-full w-full relative z-10">
        {/* Increased background overlay for content area */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-[#1a1a1a]/70 to-gray-900/60"></div>
        
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto smooth-scroll p-3 sm:p-6 space-y-4"
            style={{ 
              scrollBehavior: 'smooth',
              overscrollBehavior: 'contain'
            }}
          >
            <div className="max-w-4xl mx-auto">
              {messages.map((message, index) => (
                <div key={message.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ChatMessage message={message} />
                </div>
              ))}
              
              {isTyping && (
                <div className="flex space-x-4 justify-start mb-6 fade-in">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FACC15] rounded-full flex items-center justify-center">
                      <img 
                        src="https://rat.ourwebprojects.pro/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-13-at-00.33.41_ea137fcd.jpg" 
                        alt="RAT" 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="bg-[#1E3A8A] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#FACC15] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#FACC15] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#FACC15] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-3 sm:px-6 pb-4 fade-in">
              <div className="max-w-4xl mx-auto">
                <SuggestedQuestions onQuestionClick={handleQuestionClick} />
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="max-w-4xl mx-auto w-full">
            <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>

          {/* Footer with Pump.fun notification */}
          <div className="text-center py-3 sm:py-4 border-t border-gray-800 bg-[#222] bg-opacity-90">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-2">
              <p className="text-gray-500 text-xs sm:text-sm">
                Powered by BASED AI • <span className="text-[#FACC15]">$RAT Revolution Engine</span>
              </p>
              <div className="text-xs px-2 py-1 bg-[#FACC15] text-[#0f172a] rounded-full font-medium animate-pulse">
                🚀 $RAT launching on Pump.fun soon!
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-500 text-xs">BASED</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#FACC15] rounded-full"></div>
                <span className="text-[#FACC15] text-xs">VIRAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;