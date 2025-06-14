import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Target, Zap, Play, Pause } from 'lucide-react';

interface BlockchainTowerStackerProps {
  onBack: () => void;
}

interface Block {
  id: number;
  x: number;
  width: number;
  text: string;
  color: string;
  speed: number;
}

const BlockchainTowerStacker: React.FC<BlockchainTowerStackerProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [perfectStacks, setPerfectStacks] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const gameWidth = 400;
  const gameHeight = 600;
  const blockHeight = 40;
  const initialBlockWidth = 120;

  // Anti-Israel messages for blocks
  const blockMessages = [
    "Stop Israeli Apartheid",
    "Free Palestine Now",
    "End Israeli Occupation", 
    "Israel Kills Children",
    "Stop Gaza Genocide",
    "Israeli War Crimes",
    "Boycott Israeli Goods",
    "Palestine Will Be Free",
    "End Israeli Terrorism",
    "Stop Ethnic Cleansing",
    "Israeli Illegal Settlements",
    "Justice for Palestine",
    "End Israeli Blockade",
    "Stop Israeli Bombing",
    "Palestinian Lives Matter",
    "Israel Violates UN Law",
    "Stop Israeli Oppression",
    "End Israeli Colonialism",
    "Free Gaza Strip",
    "Stop Israeli Racism",
    "End Israeli Brutality",
    "Palestine Resistance",
    "Israeli State Terror",
    "Stop Home Demolitions",
    "End Israeli Siege",
    "Palestinian Human Rights",
    "Stop Israeli Aggression",
    "End Military Occupation",
    "Free West Bank",
    "Stop Israeli Violence"
  ];

  const blockColors = [
    '#DC2626', '#7C2D12', '#B91C1C', '#991B1B', '#7F1D1D',
    '#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2'
  ];

  const getRandomMessage = () => {
    return blockMessages[Math.floor(Math.random() * blockMessages.length)];
  };

  const getRandomColor = () => {
    return blockColors[Math.floor(Math.random() * blockColors.length)];
  };

  const createNewBlock = useCallback((previousBlock?: Block) => {
    const width = previousBlock ? Math.max(previousBlock.width - 10, 60) : initialBlockWidth;
    const speed = Math.min(gameSpeed + (level - 1) * 0.5, 8);
    
    return {
      id: Date.now(),
      x: 0,
      width: width,
      text: getRandomMessage(),
      color: getRandomColor(),
      speed: speed
    };
  }, [gameSpeed, level]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setBlocks([]);
    setPerfectStacks(0);
    setGameSpeed(2);
    
    // Create first block (base)
    const baseBlock: Block = {
      id: 1,
      x: gameWidth / 2 - initialBlockWidth / 2,
      width: initialBlockWidth,
      text: "Israeli Apartheid State",
      color: '#DC2626',
      speed: 0
    };
    
    setBlocks([baseBlock]);
    setCurrentBlock(createNewBlock(baseBlock));
  };

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setLevel(1);
    setBlocks([]);
    setCurrentBlock(null);
    setPerfectStacks(0);
    setGameSpeed(2);
  };

  const stackBlock = useCallback(() => {
    if (!currentBlock || blocks.length === 0) return;

    const lastBlock = blocks[blocks.length - 1];
    const overlap = Math.min(
      lastBlock.x + lastBlock.width,
      currentBlock.x + currentBlock.width
    ) - Math.max(lastBlock.x, currentBlock.x);

    if (overlap <= 0) {
      // Game over - no overlap
      setGameState('gameOver');
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    // Calculate new block position and width
    const newX = Math.max(lastBlock.x, currentBlock.x);
    const newWidth = overlap;
    
    const stackedBlock: Block = {
      ...currentBlock,
      x: newX,
      width: newWidth
    };

    const newBlocks = [...blocks, stackedBlock];
    setBlocks(newBlocks);

    // Check for perfect stack
    const isPerfect = Math.abs(lastBlock.x - currentBlock.x) < 5;
    if (isPerfect) {
      setPerfectStacks(prev => prev + 1);
      setScore(prev => prev + 100); // Bonus for perfect stack
    } else {
      setScore(prev => prev + 50);
    }

    // Level up every 10 blocks
    if (newBlocks.length % 10 === 0) {
      setLevel(prev => prev + 1);
      setGameSpeed(prev => prev + 0.5);
    }

    // Create next block
    setCurrentBlock(createNewBlock(stackedBlock));
  }, [currentBlock, blocks, score, highScore, createNewBlock]);

  // Game loop for moving current block
  useEffect(() => {
    if (gameState !== 'playing' || !currentBlock) return;

    const moveBlock = () => {
      setCurrentBlock(prev => {
        if (!prev) return null;
        
        let newX = prev.x + prev.speed;
        let newSpeed = prev.speed;

        // Bounce off walls
        if (newX <= 0 || newX + prev.width >= gameWidth) {
          newSpeed = -newSpeed;
          newX = Math.max(0, Math.min(newX, gameWidth - prev.width));
        }

        return {
          ...prev,
          x: newX,
          speed: newSpeed
        };
      });
    };

    const interval = setInterval(moveBlock, 16); // ~60fps
    return () => clearInterval(interval);
  }, [gameState, currentBlock]);

  // Handle spacebar for stacking
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && gameState === 'playing') {
        event.preventDefault();
        stackBlock();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, stackBlock]);

  const getScoreTitle = () => {
    if (score >= 2000) return "🏆 LIBERATION HERO";
    if (score >= 1500) return "🥇 RESISTANCE FIGHTER";
    if (score >= 1000) return "🥈 TRUTH WARRIOR";
    if (score >= 500) return "🥉 JUSTICE SEEKER";
    return "🐭 FREEDOM RAT";
  };

  const getReward = () => {
    if (score >= 2000) return "1000 $RAT + NFT";
    if (score >= 1500) return "750 $RAT";
    if (score >= 1000) return "500 $RAT";
    if (score >= 500) return "300 $RAT";
    return "100 $RAT";
  };

  if (gameState === 'menu') {
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
                <Target size={40} className="text-[#0f172a]" />
              </div>
              <h1 className="text-4xl font-bold text-[#FACC15] mb-4">Blockchain Tower Stacker</h1>
              <p className="text-xl text-gray-300 mb-8">
                Stack blocks to build the ultimate truth tower! Each block exposes Israeli crimes!
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">How to Play</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">1</div>
                  <span>Watch the moving block and time your tap perfectly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">2</div>
                  <span>Press SPACEBAR or tap to stack the block</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">3</div>
                  <span>Perfect alignment gives bonus points and maintains width</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0f172a] font-bold">4</div>
                  <span>Each block reveals truth about Israeli crimes</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-[#FACC15] mb-1">∞</div>
                <div className="text-gray-400 text-sm">Levels</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">30+</div>
                <div className="text-gray-400 text-sm">Truth Messages</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">1K</div>
                <div className="text-gray-400 text-sm">Max $RAT</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{highScore}</div>
                <div className="text-gray-400 text-sm">High Score</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Start Stacking 🏗️
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="h-full overflow-y-auto smooth-scroll">
        <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl mb-6">
                <Zap size={40} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-red-500 mb-4">Tower Collapsed!</h1>
              <div className="text-6xl font-bold text-white mb-4">{score}</div>
              <div className="text-2xl font-bold text-[#FACC15] mb-2">{getScoreTitle()}</div>
              <div className="text-xl text-gray-300">You earned: {getReward()}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
              <h3 className="text-xl font-bold text-[#FACC15] mb-4">Final Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{blocks.length}</div>
                  <div className="text-gray-400 text-sm">Blocks Stacked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{level}</div>
                  <div className="text-gray-400 text-sm">Level Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{perfectStacks}</div>
                  <div className="text-gray-400 text-sm">Perfect Stacks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FACC15]">{highScore}</div>
                  <div className="text-gray-400 text-sm">High Score</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={startGame}
                className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
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

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-[#FACC15] font-bold">Level {level}</span>
              <span className="text-gray-400">•</span>
              <span className="text-white font-bold">Score: {score}</span>
              <span className="text-gray-400">•</span>
              <span className="text-green-400">Perfect: {perfectStacks}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={pauseGame}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
              >
                {gameState === 'paused' ? <Play size={16} /> : <Pause size={16} />}
              </button>
              <button
                onClick={resetGame}
                className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Game Area */}
            <div className="relative">
              <div
                ref={gameAreaRef}
                className="relative bg-slate-900 border-4 border-slate-700 rounded-xl overflow-hidden"
                style={{ width: gameWidth, height: gameHeight }}
                onClick={stackBlock}
              >
                {gameState === 'paused' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="text-white text-2xl font-bold">PAUSED</div>
                  </div>
                )}

                {/* Stacked Blocks */}
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="absolute transition-all duration-200 flex items-center justify-center text-white font-bold text-xs text-center px-2"
                    style={{
                      left: block.x,
                      bottom: index * blockHeight,
                      width: block.width,
                      height: blockHeight,
                      backgroundColor: block.color,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '4px',
                      fontSize: Math.max(8, Math.min(12, block.width / 10))
                    }}
                  >
                    <span className="leading-tight">{block.text}</span>
                  </div>
                ))}

                {/* Current Moving Block */}
                {currentBlock && gameState === 'playing' && (
                  <div
                    className="absolute transition-all duration-75 flex items-center justify-center text-white font-bold text-xs text-center px-2 animate-pulse"
                    style={{
                      left: currentBlock.x,
                      bottom: blocks.length * blockHeight,
                      width: currentBlock.width,
                      height: blockHeight,
                      backgroundColor: currentBlock.color,
                      border: '2px solid #FACC15',
                      borderRadius: '4px',
                      boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)',
                      fontSize: Math.max(8, Math.min(12, currentBlock.width / 10))
                    }}
                  >
                    <span className="leading-tight">{currentBlock.text}</span>
                  </div>
                )}

                {/* Guidelines */}
                <div className="absolute inset-x-0 bottom-0 border-t-2 border-dashed border-gray-600 opacity-30"></div>
                {blocks.length > 0 && (
                  <div
                    className="absolute border-l-2 border-dashed border-[#FACC15] opacity-50"
                    style={{
                      left: blocks[blocks.length - 1].x,
                      top: 0,
                      bottom: 0
                    }}
                  ></div>
                )}
                {blocks.length > 0 && (
                  <div
                    className="absolute border-l-2 border-dashed border-[#FACC15] opacity-50"
                    style={{
                      left: blocks[blocks.length - 1].x + blocks[blocks.length - 1].width,
                      top: 0,
                      bottom: 0
                    }}
                  ></div>
                )}
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center">
                <p className="text-gray-300 text-sm mb-2">
                  Press <kbd className="bg-slate-700 px-2 py-1 rounded text-[#FACC15]">SPACEBAR</kbd> or 
                  <span className="text-[#FACC15]"> TAP</span> to stack the block
                </p>
                <p className="text-gray-400 text-xs">
                  Perfect timing maintains block width and gives bonus points!
                </p>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-[#FACC15] font-bold text-lg mb-4">Current Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Blocks:</span>
                  <span className="text-white font-bold">{blocks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-white font-bold">{gameSpeed.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Perfect:</span>
                  <span className="text-green-400 font-bold">{perfectStacks}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-[#FACC15] font-bold text-lg mb-4">Truth Exposed</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {blocks.slice(-5).reverse().map((block, index) => (
                  <div key={block.id} className="text-xs text-gray-300 p-2 bg-slate-700 rounded">
                    {block.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-[#FACC15] font-bold text-lg mb-4">Rewards</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current:</span>
                  <span className="text-[#FACC15] font-bold">{getReward()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">High Score:</span>
                  <span className="text-white font-bold">{highScore}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Stack higher for better rewards!
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-8 bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 text-center">
            <h3 className="text-white font-bold text-lg mb-2">🏗️ BUILDING TRUTH TOWER 🏗️</h3>
            <p className="text-white">
              Each block you stack exposes another Israeli crime! Build the ultimate tower of truth!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTowerStacker;