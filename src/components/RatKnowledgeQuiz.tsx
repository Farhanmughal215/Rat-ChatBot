import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Brain, Clock, Star, CheckCircle, X, RotateCcw } from 'lucide-react';

interface RatKnowledgeQuizProps {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const RatKnowledgeQuiz: React.FC<RatKnowledgeQuizProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const baseQuestions: Question[] = [
    {
      id: 1,
      question: "What is $RAT's primary mission?",
      options: [
        "Just making money from crypto",
        "Exposing corruption and challenging the elite",
        "Creating another meme coin",
        "Building a gaming platform"
      ],
      correctAnswer: 1,
      explanation: "$RAT exists to expose corruption, challenge the elite, and spread BASED truth through memes and community action!",
      category: "RAT Mission",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Why is Israel considered a 'RAT' in the geopolitical sense?",
      options: [
        "Because they're a small country",
        "Due to systematic oppression and killing of innocent Palestinians",
        "Because of their technology sector",
        "Due to their military strength"
      ],
      correctAnswer: 1,
      explanation: "Israel has been systematically oppressing Palestinians, killing innocent civilians including children, and violating international law for decades.",
      category: "Corruption Exposure",
      difficulty: "Medium"
    },
    {
      id: 3,
      question: "Which blockchain does $RAT operate on?",
      options: ["Ethereum", "Bitcoin", "Solana", "Binance Smart Chain"],
      correctAnswer: 2,
      explanation: "$RAT operates on Solana for fast, cheap transactions that support our revolutionary activities!",
      category: "Technical",
      difficulty: "Easy"
    },
    {
      id: 4,
      question: "What has Israel done to innocent Palestinian children?",
      options: [
        "Provided them with education",
        "Killed thousands in bombing campaigns and military operations",
        "Given them citizenship",
        "Built them schools"
      ],
      correctAnswer: 1,
      explanation: "Israel has killed thousands of innocent Palestinian children through bombing campaigns, military operations, and systematic violence.",
      category: "Human Rights",
      difficulty: "Hard"
    },
    {
      id: 5,
      question: "What does 'BASED' mean in $RAT terminology?",
      options: [
        "Blockchain-based",
        "Being authentic and speaking truth regardless of consequences",
        "Basic trading strategy",
        "Buying and selling efficiently"
      ],
      correctAnswer: 1,
      explanation: "BASED means being authentic, speaking truth, and not caring about social consequences - exactly what $RAT does!",
      category: "RAT Culture",
      difficulty: "Medium"
    },
    {
      id: 6,
      question: "How does Israel treat Palestinian civilians?",
      options: [
        "With equal rights and dignity",
        "Through apartheid-like policies and systematic oppression",
        "As full citizens",
        "With complete freedom"
      ],
      correctAnswer: 1,
      explanation: "Israel operates an apartheid-like system that systematically oppresses Palestinians, denying them basic rights and freedoms.",
      category: "Human Rights",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "What is the total supply of $RAT tokens?",
      options: ["100 million", "500 million", "1 billion", "10 billion"],
      correctAnswer: 2,
      explanation: "$RAT has a total supply of 1 billion tokens, distributed fairly among the community!",
      category: "Tokenomics",
      difficulty: "Easy"
    },
    {
      id: 8,
      question: "What international laws has Israel violated?",
      options: [
        "None, they follow all laws",
        "Geneva Conventions and UN resolutions regarding occupied territories",
        "Only minor trade regulations",
        "Environmental protection laws"
      ],
      correctAnswer: 1,
      explanation: "Israel has violated numerous Geneva Conventions and UN resolutions, particularly regarding occupied territories and treatment of civilians.",
      category: "International Law",
      difficulty: "Hard"
    },
    {
      id: 9,
      question: "What does $RAT's manifesto promote?",
      options: [
        "Centralized control",
        "Decentralizing power and exposing corruption",
        "Traditional banking",
        "Government oversight"
      ],
      correctAnswer: 1,
      explanation: "The RAT Manifesto promotes decentralizing power, exposing corruption, and giving power back to the people!",
      category: "RAT Mission",
      difficulty: "Easy"
    },
    {
      id: 10,
      question: "Why do many consider Israel's actions as war crimes?",
      options: [
        "Because they defend themselves",
        "Due to disproportionate force against civilians and collective punishment",
        "Because they're a democracy",
        "Due to their economic policies"
      ],
      correctAnswer: 1,
      explanation: "Israel's use of disproportionate force against civilians, collective punishment, and targeting of non-combatants constitutes war crimes under international law.",
      category: "War Crimes",
      difficulty: "Hard"
    }
  ];

  // Function to shuffle array
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to randomize answer positions for each question
  const randomizeQuestions = () => {
    const randomizedQuestions = baseQuestions.map(question => {
      const correctAnswerText = question.options[question.correctAnswer];
      const shuffledOptions = shuffleArray(question.options);
      const newCorrectAnswer = shuffledOptions.indexOf(correctAnswerText);
      
      return {
        ...question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer
      };
    });
    
    setShuffledQuestions(randomizedQuestions);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !showResult && !gameFinished && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, showResult, gameFinished]);

  const startGame = () => {
    randomizeQuestions(); // Randomize questions when starting
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setUserAnswers([]);
    setGameFinished(false);
  };

  const handleTimeUp = () => {
    setUserAnswers(prev => [...prev, -1]); // -1 indicates no answer
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        nextQuestion();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    setUserAnswers(prev => [...prev, answerIndex]);
    
    if (answerIndex === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        nextQuestion();
      } else {
        finishGame();
      }
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const finishGame = () => {
    setGameFinished(true);
    setGameStarted(false);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setGameFinished(false);
    setUserAnswers([]);
    setShuffledQuestions([]);
  };

  const getScoreTitle = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return "🏆 RAT GRANDMASTER";
    if (percentage >= 80) return "🥇 BASED EXPERT";
    if (percentage >= 70) return "🥈 TRUTH SEEKER";
    if (percentage >= 60) return "🥉 SEWER CITIZEN";
    return "🐭 BABY RAT";
  };

  const getReward = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return "500 $RAT + Exclusive NFT";
    if (percentage >= 80) return "400 $RAT";
    if (percentage >= 70) return "300 $RAT";
    if (percentage >= 60) return "200 $RAT";
    return "100 $RAT";
  };

  if (!gameStarted && !gameFinished) {
    return (
      <div className="h-full overflow-y-auto smooth-scroll">
        <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#FACC15] transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Games</span>
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FACC15] rounded-2xl mb-6">
                <Brain size={40} className="text-[#0f172a]" />
              </div>
              <h1 className="text-4xl font-bold text-[#FACC15] mb-4">$RAT Knowledge Quiz</h1>
              <p className="text-xl text-gray-300 mb-8">
                Test your knowledge about $RAT, corruption exposure, and global truth!
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">Quiz Rules</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">1</div>
                  <span>Answer {baseQuestions.length} questions about $RAT and global corruption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">2</div>
                  <span>You have 30 seconds per question</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">3</div>
                  <span>Earn $RAT tokens based on your performance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">4</div>
                  <span>Answer positions are randomized for fairness</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-[#FACC15] mb-1">{baseQuestions.length}</div>
                <div className="text-gray-400 text-sm">Questions</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">30s</div>
                <div className="text-gray-400 text-sm">Per Question</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">500</div>
                <div className="text-gray-400 text-sm">Max $RAT</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">🎲</div>
                <div className="text-gray-400 text-sm">Randomized</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Start Quiz 🧠
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="h-full overflow-y-auto smooth-scroll">
        <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FACC15] rounded-2xl mb-6">
                <Trophy size={40} className="text-[#0f172a]" />
              </div>
              <h1 className="text-4xl font-bold text-[#FACC15] mb-4">Quiz Complete!</h1>
              <div className="text-6xl font-bold text-white mb-4">{score}/{shuffledQuestions.length}</div>
              <div className="text-2xl font-bold text-[#FACC15] mb-2">{getScoreTitle()}</div>
              <div className="text-xl text-gray-300">You earned: {getReward()}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
              <h3 className="text-xl font-bold text-[#FACC15] mb-4">Your Performance</h3>
              <div className="space-y-3">
                {shuffledQuestions.map((question, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300 text-sm">Q{index + 1}: {question.category}</span>
                    <div className="flex items-center space-x-2">
                      {userAnswers[index] === question.correctAnswer ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <X size={20} className="text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        userAnswers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {userAnswers[index] === question.correctAnswer ? 'Correct' : 'Wrong'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-[#1E3A8A] hover:bg-[#1E3A8A]/80 text-[#FACC15] font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>Play Again</span>
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-gray-600 hover:bg-gray-600/80 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Make sure we have shuffled questions before rendering
  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQ = shuffledQuestions[currentQuestion];

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <span className="text-[#FACC15] font-bold">Question {currentQuestion + 1}/{shuffledQuestions.length}</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-400">{currentQ.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-red-500" />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div
              className="bg-[#FACC15] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentQ.difficulty === 'Easy' ? 'bg-green-600 text-white' :
                currentQ.difficulty === 'Medium' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                    showResult
                      ? index === currentQ.correctAnswer
                        ? 'bg-green-600 border-green-500 text-white'
                        : index === selectedAnswer && index !== currentQ.correctAnswer
                        ? 'bg-red-600 border-red-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300'
                      : selectedAnswer === index
                      ? 'bg-[#FACC15] border-[#FACC15] text-[#0f172a]'
                      : 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-[#FACC15]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      showResult && index === currentQ.correctAnswer
                        ? 'bg-white text-green-600'
                        : showResult && index === selectedAnswer && index !== currentQ.correctAnswer
                        ? 'bg-white text-red-600'
                        : selectedAnswer === index
                        ? 'bg-[#0f172a] text-[#FACC15]'
                        : 'bg-gray-600 text-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
                <h3 className="text-[#FACC15] font-bold mb-2">Explanation:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700">
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-[#FACC15]" />
                <span className="text-white font-bold">Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatKnowledgeQuiz;