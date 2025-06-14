import React from 'react';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    isBot: boolean;
    timestamp: string;
    isWelcome?: boolean;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex space-x-2 sm:space-x-4 ${message.isBot ? 'justify-start' : 'justify-end'} mb-4 sm:mb-6`}>
      {message.isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FACC15] rounded-full flex items-center justify-center">
            <img 
              src="https://rat.ourwebprojects.pro/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-13-at-00.33.41_ea137fcd.jpg" 
              alt="RAT" 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />
          </div>
        </div>
      )}
      
      <div className={`max-w-[85%] sm:max-w-[70%] ${message.isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 sm:px-6 py-3 sm:py-4 ${
            message.isBot
              ? 'bg-[#1E3A8A] text-white'
              : 'bg-[#FACC15] text-[#222]'
          } shadow-lg`}
        >
          {message.isWelcome && (
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-[#FACC15] text-base sm:text-lg">🐭</span>
              <span className="font-semibold text-[#FACC15] text-sm sm:text-base">RAT Revolution HQ!</span>
            </div>
          )}
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          {message.isBot && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#005EB8]/30">
              <span className="text-xs text-[#FACC15]/70 flex items-center space-x-1">
                <span className="w-1 h-1 bg-[#FACC15] rounded-full animate-pulse"></span>
                <span>$RAT Response</span>
              </span>
            </div>
          )}
        </div>
        <div className={`text-xs text-gray-500 mt-2 ${message.isBot ? 'text-left' : 'text-right'}`}>
          {message.timestamp}
        </div>
      </div>
      
      {!message.isBot && (
        <div className="flex-shrink-0 order-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#005EB8] rounded-full flex items-center justify-center">
            <User size={16} className="text-white sm:w-5 sm:h-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;