import React from 'react';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick }) => {
  const questions = [
    "How to buy $RAT?",
    "What is $RAT?",
    "Show me the manifesto",
    "Join the revolution!"
  ];

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-3 justify-center mb-4 sm:mb-6">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(question)}
          className="px-2 sm:px-4 py-1.5 sm:py-2 bg-[#005EB8]/20 hover:bg-[#005EB8]/30 border border-[#005EB8]/30 rounded-full text-[#005EB8] text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;