import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Target, Zap, HelpCircle } from 'lucide-react';

interface CryptoWordHuntProps {
  onBack: () => void;
}

const CryptoWordHunt: React.FC<CryptoWordHuntProps> = ({ onBack }) => {
  const cryptoWords = [
    'HODL', 'HASH', 'MINE', 'PUMP', 'DUMP', 'BULL', 'BEAR', 'MOON', 'FOMO',
    'SWAP', 'POOL', 'FARM', 'MINT', 'BURN', 'MEME', 'BOTS', 'DOGE', 'PEPE',
    'SHIB', 'LUNA', 'BUSD', 'MESH', 'DAPP', 'DEFI',
    'NFTS', 'DYOR', 'RARE'
  ];

  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [currentRow, setCurrentRow] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0
  });

  const maxGuesses = 6;

  const initializeGame = useCallback(() => {
    // Filter to ensure only 4-letter words
    const fourLetterWords = cryptoWords.filter(word => word.length === 4);
    const randomWord = fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)];
    setTargetWord(randomWord);
    setCurrentGuess('');
    setGuesses([]);
    setGameStatus('playing');
    setCurrentRow(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const getLetterStatus = (letter: string, position: number, word: string) => {
    if (targetWord[position] === letter) {
      return 'correct';
    } else if (targetWord.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length === 4) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        
        if (currentGuess === targetWord) {
          setGameStatus('won');
          setStats(prev => ({
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
            gamesWon: prev.gamesWon + 1,
            currentStreak: prev.currentStreak + 1,
            maxStreak: Math.max(prev.maxStreak, prev.currentStreak + 1)
          }));
        } else if (newGuesses.length >= maxGuesses) {
          setGameStatus('lost');
          setStats(prev => ({
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
            currentStreak: 0
          }));
        }
        
        setCurrentGuess('');
        setCurrentRow(prev => prev + 1);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && /[A-Z]/.test(key) && currentGuess.length < 4) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, guesses, gameStatus, targetWord]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /[A-Z]/.test(key)) {
        event.preventDefault();
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const renderGrid = () => {
    const rows = [];
    
    for (let i = 0; i < maxGuesses; i++) {
      const guess = i < guesses.length ? guesses[i] : (i === currentRow ? currentGuess : '');
      const isCurrentRow = i === currentRow && gameStatus === 'playing';
      
      rows.push(
        <div key={i} className="flex space-x-2 justify-center">
          {[0, 1, 2, 3].map(j => {
            const letter = guess[j] || '';
            const isSubmitted = i < guesses.length;
            let cellClass = 'w-14 h-14 border-2 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300';
            
            if (isSubmitted && letter) {
              const status = getLetterStatus(letter, j, guesses[i]);
              if (status === 'correct') {
                cellClass += ' bg-green-600 border-green-600 text-white';
              } else if (status === 'present') {
                cellClass += ' bg-yellow-600 border-yellow-600 text-white';
              } else {
                cellClass += ' bg-gray-600 border-gray-600 text-white';
              }
            } else if (isCurrentRow && letter) {
              cellClass += ' border-[#FACC15] bg-[#FACC15]/10 text-[#FACC15]';
            } else {
              cellClass += ' border-gray-600 bg-gray-800 text-gray-400';
            }
            
            return (
              <div key={j} className={cellClass}>
                {letter}
              </div>
            );
          })}
        </div>
      );
    }
    
    return rows;
  };

  const renderKeyboard = () => {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
    ];

    const getKeyStatus = (key: string) => {
      if (key === 'ENTER' || key === 'BACKSPACE') return 'special';
      
      for (const guess of guesses) {
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === key) {
            const status = getLetterStatus(key, i, guess);
            if (status === 'correct') return 'correct';
            if (status === 'present') return 'present';
            if (status === 'absent') return 'absent';
          }
        }
      }
      return 'unused';
    };

    return (
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center space-x-1">
            {row.map(key => {
              const status = getKeyStatus(key);
              let keyClass = 'px-3 py-4 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95';
              
              if (key === 'ENTER' || key === 'BACKSPACE') {
                keyClass += ' px-4 bg-gray-600 hover:bg-gray-500 text-white';
              } else if (status === 'correct') {
                keyClass += ' bg-green-600 text-white';
              } else if (status === 'present') {
                keyClass += ' bg-yellow-600 text-white';
              } else if (status === 'absent') {
                keyClass += ' bg-gray-700 text-gray-400';
              } else {
                keyClass += ' bg-gray-600 hover:bg-gray-500 text-white';
              }
              
              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={keyClass}
                  disabled={gameStatus !== 'playing'}
                >
                  {key === 'BACKSPACE' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-[#FACC15] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Games</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 text-gray-400 hover:text-[#FACC15] transition-colors"
              >
                <HelpCircle size={20} />
              </button>
              <button
                onClick={initializeGame}
                className="p-2 text-gray-400 hover:text-[#FACC15] transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Game Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FACC15] rounded-2xl mb-4">
              <Target size={32} className="text-[#0f172a]" />
            </div>
            <h1 className="text-3xl font-bold text-[#FACC15] mb-2">Crypto Word Hunt</h1>
            <p className="text-gray-400">Guess the 4-letter crypto word in 6 tries!</p>
          </div>

          {/* Help Panel */}
          {showHelp && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
              <h3 className="text-[#FACC15] font-bold text-lg mb-4">How to Play</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Guess the 4-letter crypto word in 6 tries</p>
                <p>• Each guess must be a valid 4-letter word</p>
                <p>• After each guess, the color of the tiles will change:</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold">H</div>
                  <span>Green = Correct letter in correct position</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center text-white font-bold">O</div>
                  <span>Yellow = Correct letter in wrong position</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white font-bold">D</div>
                  <span>Gray = Letter not in the word</span>
                </div>
              </div>
            </div>
          )}

          {/* Game Status */}
          {gameStatus !== 'playing' && (
            <div className="text-center mb-6">
              <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold ${
                gameStatus === 'won' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}>
                {gameStatus === 'won' ? (
                  <>
                    <Trophy size={20} />
                    <span>Word Found! The word was {targetWord}</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Game Over! The word was {targetWord}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Game Grid */}
          <div className="space-y-2 mb-8">
            {renderGrid()}
          </div>

          {/* Keyboard */}
          <div className="mb-8">
            {renderKeyboard()}
          </div>

          {/* Stats */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-[#FACC15] font-bold text-lg mb-4 text-center">Statistics</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{stats.gamesPlayed}</div>
                <div className="text-gray-400 text-sm">Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%
                </div>
                <div className="text-gray-400 text-sm">Win Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-gray-400 text-sm">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.maxStreak}</div>
                <div className="text-gray-400 text-sm">Max Streak</div>
              </div>
            </div>
          </div>

          {/* Rewards Info */}
          <div className="mt-6 bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 text-center">
            <h3 className="text-[#FACC15] font-bold text-lg mb-2">🎯 Daily Rewards 🎯</h3>
            <p className="text-white mb-4">Complete daily puzzles to earn $RAT tokens and NFT rewards!</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-[#FACC15] font-bold">50-200 $RAT</div>
                <div className="text-gray-300">Per Game</div>
              </div>
              <div className="text-center">
                <div className="text-[#FACC15] font-bold">Bonus NFT</div>
                <div className="text-gray-300">7-Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWordHunt;