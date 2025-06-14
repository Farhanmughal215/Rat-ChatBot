import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120; // Maximum height in pixels
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="border-t border-gray-800 bg-[#222] p-3 sm:p-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-2 sm:space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the $RAT revolution..."
              disabled={disabled}
              rows={1}
              className="w-full bg-gray-800 border border-gray-600 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15] resize-none transition-all duration-200 smooth-scroll hide-scrollbar text-sm sm:text-base"
              style={{ 
                minHeight: '48px',
                maxHeight: '120px',
                lineHeight: '1.5'
              }}
            />
            <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="p-3 sm:p-4 bg-[#FACC15] hover:bg-[#FACC15]/90 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <Send size={16} className="text-[#222] sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;