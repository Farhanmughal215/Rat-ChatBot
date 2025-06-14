import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const emojis = [
    '🐭', '🔥', '🚀', '💎', '🎯', '⚡', '💯', '🎮', '🏆', '⭐',
    '🤝', '💪', '🎪', '🎭', '🎨', '🎵', '🎸', '🎤', '🎬', '📸'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-[#FACC15] transition-all duration-200 hover:scale-110"
      >
        <Smile size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-[#222] border border-gray-600 rounded-lg p-3 shadow-xl z-50 fade-in">
          <div className="grid grid-cols-5 gap-2 w-48">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onEmojiSelect(emoji);
                  setIsOpen(false);
                }}
                className="text-xl hover:bg-gray-700 rounded p-1 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;