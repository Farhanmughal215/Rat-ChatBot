import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const HelpFAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What is $RAT and why should I care?",
      answer: "$RAT is more than just a memecoin - it's a movement! We're exposing corruption, mocking the elite, and spreading BASED truth through memes. If you're tired of watching corrupt politicians and corporate rats get away with everything, $RAT is your voice!"
    },
    {
      question: "How do I buy $RAT tokens?",
      answer: "1. Get some SOL in your Solana wallet (Phantom, Solflare, etc.)\n2. Go to a Solana DEX like Jupiter or Raydium\n3. Swap SOL for $RAT using our contract address\n4. HODL and join the revolution!\n\nAlways verify the contract address on our official channels!"
    },
    {
      question: "Is $RAT safe? How do I know it's not a rug pull?",
      answer: "We're 100% community-driven with these safety features:\n• Liquidity locked permanently\n• Contract verified and audited\n• No mint function (can't create more tokens)\n• Team tokens locked\n• Full transparency on all transactions"
    },
    {
      question: "What makes $RAT different from other memecoins?",
      answer: "We're not just here for laughs - we have a mission! $RAT exposes corruption, challenges the system, and gives power back to the people. Our memes have purpose, our community has values, and our revolution is real!"
    },
    {
      question: "How can I earn $RAT tokens?",
      answer: "Multiple ways to earn:\n• Play our games and win rewards\n• Create viral memes and get tipped\n• Participate in community events\n• Refer friends to join the revolution\n• Complete daily challenges\n• Hold $RAT and earn from reflections"
    },
    {
      question: "What are the games about?",
      answer: "Our play-to-earn games let you:\n• Test your knowledge in 'RAT Knowledge Quiz'\n• Solve puzzles in 'Crypto Word Hunt'\n• Build towers in 'Blockchain Tower Stacker'\n• Battle corruption in upcoming games\n\nAll games reward real $RAT tokens!"
    },
    {
      question: "How do I join the community?",
      answer: "Join our underground network:\n• Telegram: Real-time chat and alerts\n• Twitter/X: Latest memes and updates\n• Discord: Main hub for sewer citizens\n• Reddit: Deep discussions and DD\n\nAll links are in our official channels!"
    },
    {
      question: "What's the roadmap for $RAT?",
      answer: "We're currently in Phase 3 (The Revolution):\n• Phase 1 & 2: Completed ✅\n• Phase 3: Major listings, advanced gaming (ACTIVE)\n• Phase 4: Global marketing, mobile app\n• Phase 5: DeFi protocol, world domination\n\nCheck the Revolution Map for full details!"
    },
    {
      question: "Can I create my own $RAT memes?",
      answer: "Absolutely! We encourage all sewer citizens to create memes:\n• Use our meme templates\n• Share in community channels\n• Tag us on social media\n• Best memes get featured and rewarded\n• Help expose corruption through humor!"
    },
    {
      question: "What if I need technical support?",
      answer: "Our support team is here 24/7:\n• Telegram support group\n• Twitter/X direct messages\n• Community moderators\n• Technical documentation\n• Video tutorials\n\nNo rat left behind! 🐭"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <HelpCircle className="text-[#FACC15]" size={24} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FACC15]">HELP & FAQ</h1>
              <p className="text-gray-400 text-sm sm:text-base">Everything you need to know about the $RAT revolution! 🐭</p>
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700 text-center hover:border-[#FACC15]/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <h3 className="text-[#FACC15] font-bold text-base sm:text-lg mb-2">Telegram Support</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Get instant help from our community</p>
              <a
                href="https://t.me/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-colors inline-block text-sm sm:text-base"
              >
                Join Telegram
              </a>
            </div>

            <div className="bg-[#222] rounded-xl p-4 sm:p-6 border border-gray-700 text-center hover:border-[#FACC15]/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <h3 className="text-[#FACC15] font-bold text-base sm:text-lg mb-2">Twitter/X Support</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Follow us for updates and support</p>
              <a
                href="https://twitter.com/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-colors inline-block text-sm sm:text-base"
              >
                Follow on X
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-[#222] rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FACC15]">Frequently Asked Questions</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">Click on any question to see the answer</p>
            </div>
            
            <div className="divide-y divide-gray-700">
              {faqItems.map((item, index) => (
                <div key={index} className="p-4 sm:p-6">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left hover:text-[#FACC15] transition-colors"
                  >
                    <span className="font-semibold text-white pr-4 text-sm sm:text-base">{item.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="text-[#FACC15] flex-shrink-0" size={16} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0" size={16} />
                    )}
                  </button>
                  
                  {openFAQ === index && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FACC15] mb-4">🐭 STILL NEED HELP? 🐭</h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">
              Our sewer citizens are always ready to help fellow rats!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="https://t.me/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FACC15] hover:bg-[#FACC15]/80 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-[#222] font-bold transition-colors w-full sm:w-auto text-center"
              >
                Contact on Telegram
              </a>
              <a
                href="https://twitter.com/ratcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-[#FACC15] hover:bg-[#FACC15]/10 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-[#FACC15] font-bold transition-colors w-full sm:w-auto text-center"
              >
                Message on X
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;