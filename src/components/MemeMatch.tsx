import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Target, Zap, Play, Pause, Star, Crown, HelpCircle } from 'lucide-react';

interface MemeMatchProps {
  onBack: () => void;
}

interface Tile {
  id: string;
  type: string;
  emoji: string;
  x: number;
  y: number;
  isMatched: boolean;
  isSelected: boolean;
  isFalling: boolean;
  isHint: boolean;
}

interface Match {
  tiles: Tile[];
  type: string;
  length: number;
}

const MemeMatch: React.FC<MemeMatchProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete' | 'dailyChallenge'>('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(50);
  const [board, setBoard] = useState<Tile[][]>([]);
  const [selectedTile, setSelectedTile] = useState<{x: number, y: number} | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [combo, setCombo] = useState(0);
  const [targetScore, setTargetScore] = useState(500);
  const [revealedMemes, setRevealedMemes] = useState<string[]>([]);
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [playerTitle, setPlayerTitle] = useState('Meme Rookie');
  const [showHints, setShowHints] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints] = useState(3);
  const [showTutorial, setShowTutorial] = useState(false);
  const [autoHint, setAutoHint] = useState(true);
  const [noMovesLeft, setNoMovesLeft] = useState(false);
  const [levelCompleteShown, setLevelCompleteShown] = useState(false);
  
  const boardSize = 6;
  const tileTypes = [
    { type: 'cheese', emoji: '🧀', name: 'Cheese' },
    { type: 'rat', emoji: '🐀', name: 'Rats' },
    { type: 'lies', emoji: '📢', name: 'Lies' },
    { type: 'sewer', emoji: '🕳️', name: 'Sewer Holes' },
    { type: 'corruption', emoji: '💰', name: 'Corruption' }
  ];

  const funnyMemes = [
    "Netanyahu: 'I'm not corrupt!' *Gets indicted for corruption* 🤡",
    "Israeli Gov: 'We're the only democracy!' *Ignores 500k protesters* 📢",
    "Bibi's corruption speedrun: Any% glitchless 🏃‍♂️💨",
    "Israeli Democracy Status: 404 Not Found 🔍",
    "When you're so corrupt even the rats are embarrassed 🐭",
    "Netanyahu's judicial reform = Rat takeover confirmed 🏛️",
    "Breaking: Local rat exposes more truth than mainstream media 📰",
    "Israeli apartheid so obvious even Helen Keller could see it 👀"
  ];

  const gameRef = useRef<HTMLDivElement>(null);

  // Initialize board with guaranteed matches
  const createBoard = useCallback(() => {
    const newBoard: Tile[][] = [];
    
    // Create initial random board
    for (let y = 0; y < boardSize; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < boardSize; x++) {
        const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
        row.push({
          id: `${x}-${y}-${Date.now()}`,
          type: randomType.type,
          emoji: randomType.emoji,
          x,
          y,
          isMatched: false,
          isSelected: false,
          isFalling: false,
          isHint: false
        });
      }
      newBoard.push(row);
    }
    
    // Ensure no initial matches
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        let attempts = 0;
        while (attempts < 10) {
          const hasMatch = checkForMatchAtPosition(newBoard, x, y);
          if (!hasMatch) break;
          
          const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
          newBoard[y][x] = {
            ...newBoard[y][x],
            type: randomType.type,
            emoji: randomType.emoji
          };
          attempts++;
        }
      }
    }
    
    return newBoard;
  }, []);

  // Check for match at specific position
  const checkForMatchAtPosition = (board: Tile[][], x: number, y: number): boolean => {
    const tile = board[y][x];
    
    // Check horizontal
    let horizontalCount = 1;
    // Check left
    for (let i = x - 1; i >= 0 && board[y][i].type === tile.type; i--) {
      horizontalCount++;
    }
    // Check right
    for (let i = x + 1; i < boardSize && board[y][i].type === tile.type; i++) {
      horizontalCount++;
    }
    
    // Check vertical
    let verticalCount = 1;
    // Check up
    for (let i = y - 1; i >= 0 && board[i][x].type === tile.type; i--) {
      verticalCount++;
    }
    // Check down
    for (let i = y + 1; i < boardSize && board[i][x].type === tile.type; i++) {
      verticalCount++;
    }
    
    return horizontalCount >= 3 || verticalCount >= 3;
  };

  // Find all possible moves
  const findPossibleMoves = useCallback((board: Tile[][]) => {
    const possibleMoves = [];
    
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        // Check right swap
        if (x < boardSize - 1) {
          const testBoard = board.map(row => [...row]);
          // Swap tiles
          const temp = testBoard[y][x];
          testBoard[y][x] = testBoard[y][x + 1];
          testBoard[y][x + 1] = temp;
          
          if (checkForMatchAtPosition(testBoard, x, y) || checkForMatchAtPosition(testBoard, x + 1, y)) {
            possibleMoves.push([{x, y}, {x: x + 1, y}]);
          }
        }
        
        // Check down swap
        if (y < boardSize - 1) {
          const testBoard = board.map(row => [...row]);
          // Swap tiles
          const temp = testBoard[y][x];
          testBoard[y][x] = testBoard[y + 1][x];
          testBoard[y + 1][x] = temp;
          
          if (checkForMatchAtPosition(testBoard, x, y) || checkForMatchAtPosition(testBoard, x, y + 1)) {
            possibleMoves.push([{x, y}, {x, y: y + 1}]);
          }
        }
      }
    }
    
    return possibleMoves;
  }, []);

  // Show hint
  const showHint = useCallback(() => {
    if (hintsUsed >= maxHints) return;
    
    const possibleMoves = findPossibleMoves(board);
    if (possibleMoves.length === 0) {
      setNoMovesLeft(true);
      return;
    }
    
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    
    setBoard(prev => {
      const newBoard = prev.map(row => [...row]);
      // Clear previous hints
      newBoard.forEach(row => row.forEach(tile => tile.isHint = false));
      
      // Set hint tiles
      randomMove.forEach(pos => {
        newBoard[pos.y][pos.x].isHint = true;
      });
      
      return newBoard;
    });
    
    setHintsUsed(prev => prev + 1);
    setShowHints(true);
    
    // Clear hints after 3 seconds
    setTimeout(() => {
      setBoard(prev => {
        const newBoard = prev.map(row => [...row]);
        newBoard.forEach(row => row.forEach(tile => tile.isHint = false));
        return newBoard;
      });
      setShowHints(false);
    }, 3000);
  }, [board, hintsUsed, maxHints, findPossibleMoves]);

  // Auto-hint when no moves for 10 seconds
  useEffect(() => {
    if (!autoHint || gameState !== 'playing' || isAnimating) return;
    
    const timer = setTimeout(() => {
      if (hintsUsed < maxHints) {
        showHint();
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [autoHint, gameState, isAnimating, hintsUsed, maxHints, showHint]);

  // Check for matches
  const findMatches = useCallback((board: Tile[][]): Match[] => {
    const matches: Match[] = [];
    
    // Check horizontal matches
    for (let y = 0; y < boardSize; y++) {
      let count = 1;
      let currentType = board[y][0].type;
      let matchTiles = [board[y][0]];
      
      for (let x = 1; x < boardSize; x++) {
        if (board[y][x].type === currentType) {
          count++;
          matchTiles.push(board[y][x]);
        } else {
          if (count >= 3) {
            matches.push({ tiles: [...matchTiles], type: currentType, length: count });
          }
          count = 1;
          currentType = board[y][x].type;
          matchTiles = [board[y][x]];
        }
      }
      if (count >= 3) {
        matches.push({ tiles: [...matchTiles], type: currentType, length: count });
      }
    }
    
    // Check vertical matches
    for (let x = 0; x < boardSize; x++) {
      let count = 1;
      let currentType = board[0][x].type;
      let matchTiles = [board[0][x]];
      
      for (let y = 1; y < boardSize; y++) {
        if (board[y][x].type === currentType) {
          count++;
          matchTiles.push(board[y][x]);
        } else {
          if (count >= 3) {
            matches.push({ tiles: [...matchTiles], type: currentType, length: count });
          }
          count = 1;
          currentType = board[y][x].type;
          matchTiles = [board[y][x]];
        }
      }
      if (count >= 3) {
        matches.push({ tiles: [...matchTiles], type: currentType, length: count });
      }
    }
    
    return matches;
  }, []);

  // Remove matches and calculate score
  const removeMatches = useCallback((board: Tile[][], matches: Match[]) => {
    let newScore = 0;
    let comboMultiplier = 1 + (combo * 0.2);
    
    matches.forEach(match => {
      match.tiles.forEach(tile => {
        board[tile.y][tile.x].isMatched = true;
      });
      
      // More generous scoring
      if (match.length === 4) {
        newScore += 150 * comboMultiplier;
        // Truth Bomb effect
        if (Math.random() < 0.5) {
          const randomMeme = funnyMemes[Math.floor(Math.random() * funnyMemes.length)];
          setRevealedMemes(prev => [...prev, randomMeme]);
        }
      } else if (match.length === 5) {
        newScore += 300 * comboMultiplier;
        // Exposed Plan effect
        const randomMeme = funnyMemes[Math.floor(Math.random() * funnyMemes.length)];
        setRevealedMemes(prev => [...prev, randomMeme]);
      } else if (match.length >= 6) {
        newScore += 500 * comboMultiplier;
        // Mega exposure
        const randomMeme = funnyMemes[Math.floor(Math.random() * funnyMemes.length)];
        setRevealedMemes(prev => [...prev, randomMeme]);
      } else {
        newScore += 50 * comboMultiplier;
      }
    });
    
    setScore(prev => prev + newScore);
    setCombo(prev => prev + 1);
    
    return board;
  }, [combo, funnyMemes]);

  // Drop tiles down
  const dropTiles = useCallback((board: Tile[][]) => {
    const newBoard = board.map(row => [...row]);
    
    for (let x = 0; x < boardSize; x++) {
      let writeIndex = boardSize - 1;
      
      for (let y = boardSize - 1; y >= 0; y--) {
        if (!newBoard[y][x].isMatched) {
          if (writeIndex !== y) {
            newBoard[writeIndex][x] = { ...newBoard[y][x], y: writeIndex };
            newBoard[y][x] = {
              id: `new-${x}-${y}-${Date.now()}`,
              type: tileTypes[Math.floor(Math.random() * tileTypes.length)].type,
              emoji: tileTypes[Math.floor(Math.random() * tileTypes.length)].emoji,
              x,
              y,
              isMatched: false,
              isSelected: false,
              isFalling: true,
              isHint: false
            };
          }
          writeIndex--;
        }
      }
      
      // Fill empty spaces at top
      for (let y = writeIndex; y >= 0; y--) {
        const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
        newBoard[y][x] = {
          id: `new-${x}-${y}-${Date.now()}`,
          type: randomType.type,
          emoji: randomType.emoji,
          x,
          y,
          isMatched: false,
          isSelected: false,
          isFalling: true,
          isHint: false
        };
      }
    }
    
    return newBoard;
  }, []);

  // Check if two tiles are adjacent
  const areAdjacent = (tile1: {x: number, y: number}, tile2: {x: number, y: number}) => {
    const dx = Math.abs(tile1.x - tile2.x);
    const dy = Math.abs(tile1.y - tile2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  // Swap tiles
  const swapTiles = useCallback((board: Tile[][], pos1: {x: number, y: number}, pos2: {x: number, y: number}) => {
    const newBoard = board.map(row => [...row]);
    const temp = newBoard[pos1.y][pos1.x];
    newBoard[pos1.y][pos1.x] = { ...newBoard[pos2.y][pos2.x], x: pos1.x, y: pos1.y };
    newBoard[pos2.y][pos2.x] = { ...temp, x: pos2.x, y: pos2.y };
    return newBoard;
  }, []);

  // Handle tile click
  const handleTileClick = useCallback((x: number, y: number) => {
    if (isAnimating || gameState !== 'playing') return;
    
    // Clear hints when user makes a move
    setBoard(prev => {
      const newBoard = prev.map(row => [...row]);
      newBoard.forEach(row => row.forEach(tile => tile.isHint = false));
      return newBoard;
    });
    
    if (!selectedTile) {
      setSelectedTile({ x, y });
      setBoard(prev => {
        const newBoard = prev.map(row => [...row]);
        newBoard[y][x].isSelected = true;
        return newBoard;
      });
    } else {
      if (selectedTile.x === x && selectedTile.y === y) {
        // Deselect
        setSelectedTile(null);
        setBoard(prev => {
          const newBoard = prev.map(row => [...row]);
          newBoard[y][x].isSelected = false;
          return newBoard;
        });
      } else if (areAdjacent(selectedTile, { x, y })) {
        // Valid swap
        setIsAnimating(true);
        setMoves(prev => prev - 1);
        
        const swappedBoard = swapTiles(board, selectedTile, { x, y });
        const matches = findMatches(swappedBoard);
        
        if (matches.length > 0) {
          // Valid move
          setBoard(swappedBoard);
          setTimeout(() => {
            processMatches(swappedBoard);
          }, 300);
        } else {
          // Invalid move - swap back but don't lose a move
          setMoves(prev => prev + 1);
          setTimeout(() => {
            setBoard(prev => {
              const newBoard = prev.map(row => [...row]);
              newBoard.forEach(row => row.forEach(tile => tile.isSelected = false));
              return newBoard;
            });
            setIsAnimating(false);
          }, 300);
        }
        
        setSelectedTile(null);
      } else {
        // Select new tile
        setBoard(prev => {
          const newBoard = prev.map(row => [...row]);
          newBoard[selectedTile.y][selectedTile.x].isSelected = false;
          newBoard[y][x].isSelected = true;
          return newBoard;
        });
        setSelectedTile({ x, y });
      }
    }
  }, [selectedTile, isAnimating, gameState, board, swapTiles, findMatches]);

  // Process matches recursively
  const processMatches = useCallback((currentBoard: Tile[][]) => {
    const matches = findMatches(currentBoard);
    
    if (matches.length > 0) {
      const boardWithRemovedMatches = removeMatches(currentBoard, matches);
      
      setTimeout(() => {
        const droppedBoard = dropTiles(boardWithRemovedMatches);
        setBoard(droppedBoard);
        
        setTimeout(() => {
          processMatches(droppedBoard);
        }, 500);
      }, 300);
    } else {
      setCombo(0);
      setIsAnimating(false);
      
      // Check for level completion FIRST
      if (score >= targetScore && !levelCompleteShown) {
        setLevelCompleteShown(true);
        setGameState('levelComplete');
        updatePlayerTitle();
        return;
      }
      
      // Then check for game over conditions
      if (moves <= 0) {
        // Check if there are possible moves
        const possibleMoves = findPossibleMoves(currentBoard);
        if (possibleMoves.length === 0) {
          setNoMovesLeft(true);
        }
        setGameState('gameOver');
        if (score > highScore) {
          setHighScore(score);
        }
      }
    }
  }, [findMatches, removeMatches, dropTiles, moves, score, targetScore, highScore, findPossibleMoves, levelCompleteShown]);

  // Update player title based on score
  const updatePlayerTitle = useCallback(() => {
    if (score >= 5000) setPlayerTitle('GigaRat');
    else if (score >= 3000) setPlayerTitle('Sewer Sniper');
    else if (score >= 1500) setPlayerTitle('Truth Seeker');
    else if (score >= 750) setPlayerTitle('Meme Apprentice');
    else setPlayerTitle('Meme Rookie');
  }, [score]);

  // Continue to next level
  const continueToNextLevel = () => {
    setLevel(prev => prev + 1);
    setMoves(50);
    setTargetScore(prev => Math.floor(prev * 1.3));
    setLevelCompleteShown(false);
    setHintsUsed(0);
    setNoMovesLeft(false);
    setBoard(createBoard());
    setGameState('playing');
  };

  // Start game
  const startGame = useCallback((daily = false) => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setMoves(50);
    setCombo(0);
    setTargetScore(500);
    setRevealedMemes([]);
    setIsDailyChallenge(daily);
    setHintsUsed(0);
    setNoMovesLeft(false);
    setLevelCompleteShown(false);
    setBoard(createBoard());
  }, [createBoard]);

  // Initialize board on mount
  useEffect(() => {
    setBoard(createBoard());
  }, [createBoard]);

  const getReward = () => {
    if (score >= 5000) return "1000 $RAT + Legendary NFT";
    if (score >= 3000) return "750 $RAT + Rare NFT";
    if (score >= 1500) return "500 $RAT";
    if (score >= 750) return "300 $RAT";
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FACC15] to-[#e6b800] rounded-2xl mb-6 relative">
                <div className="text-4xl">🧀</div>
                <div className="absolute -top-1 -right-1 text-2xl animate-bounce">🐀</div>
              </div>
              <h1 className="text-4xl font-bold text-[#FACC15] mb-4">Meme Match</h1>
              <p className="text-xl text-gray-300 mb-8">
                Easy-to-play Match-3 puzzle! Match corruption, expose lies, and reveal hidden memes!
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">🎮 Easy Mode Features 🎮</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span>Smaller 6x6 board for easier gameplay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span>50 moves per level (was 30)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span>Lower target scores to reach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span>3 free hints per game + auto-hints</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span>Invalid moves don't cost you a turn</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <span>Visual feedback and helpful tutorials</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl mb-2">🧀</div>
                <div className="text-gray-400 text-sm">Cheese</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl mb-2">🐀</div>
                <div className="text-gray-400 text-sm">Rats</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl mb-2">📢</div>
                <div className="text-gray-400 text-sm">Lies</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl mb-2">🕳️</div>
                <div className="text-gray-400 text-sm">Sewer</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-gray-400 text-sm">Corruption</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => startGame(false)}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105"
              >
                Start Easy Game 🎮
              </button>
              
              <button
                onClick={() => setShowTutorial(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <HelpCircle size={24} />
                <span>How to Play Tutorial</span>
              </button>
            </div>

            {highScore > 0 && (
              <div className="mt-6 bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-6 text-center">
                <h3 className="text-[#FACC15] font-bold text-lg mb-2">🏆 Your Best Score 🏆</h3>
                <div className="text-3xl font-bold text-white">{highScore.toLocaleString()}</div>
                <div className="text-[#FACC15]">{playerTitle}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showTutorial) {
    return (
      <div className="h-full overflow-y-auto smooth-scroll">
        <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setShowTutorial(false)}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#FACC15] transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Menu</span>
              </button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#FACC15] mb-4">📚 How to Play</h1>
              <p className="text-xl text-gray-300">Master the art of meme matching!</p>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-[#FACC15] font-bold text-lg mb-4">🎯 Basic Gameplay</h3>
                <div className="space-y-3 text-gray-300">
                  <p>1. <strong>Tap a tile</strong> to select it (it will glow yellow)</p>
                  <p>2. <strong>Tap an adjacent tile</strong> (up, down, left, right) to swap them</p>
                  <p>3. <strong>Match 3 or more</strong> identical tiles in a row or column</p>
                  <p>4. <strong>Reach the target score</strong> before running out of moves</p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-[#FACC15] font-bold text-lg mb-4">💡 Pro Tips</h3>
                <div className="space-y-3 text-gray-300">
                  <p>• <strong>Look for 4+ matches</strong> - they give bonus points and reveal memes!</p>
                  <p>• <strong>Chain combos</strong> - matches that create new matches give multipliers</p>
                  <p>• <strong>Use hints wisely</strong> - you get 3 free hints per game</p>
                  <p>• <strong>Invalid swaps don't cost moves</strong> - experiment freely!</p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-[#FACC15] font-bold text-lg mb-4">🏆 Scoring System</h3>
                <div className="space-y-3 text-gray-300">
                  <p>• <strong>3 tiles:</strong> 50 points</p>
                  <p>• <strong>4 tiles:</strong> 150 points + possible meme reveal</p>
                  <p>• <strong>5 tiles:</strong> 300 points + guaranteed meme reveal</p>
                  <p>• <strong>6+ tiles:</strong> 500 points + mega meme reveal</p>
                  <p>• <strong>Combo multiplier:</strong> Each chain reaction increases your score!</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowTutorial(false);
                  startGame(false);
                }}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105"
              >
                Got it! Let's Play 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'levelComplete') {
    return (
      <div className="h-full overflow-y-auto smooth-scroll">
        <div className="min-h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-6">
                <Crown size={40} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-green-500 mb-4">Level {level} Complete! 🎉</h1>
              <div className="text-6xl font-bold text-white mb-4">{score.toLocaleString()}</div>
              <div className="text-2xl font-bold text-[#FACC15] mb-2">{playerTitle}</div>
              <div className="text-xl text-gray-300">Target reached: {targetScore.toLocaleString()} points!</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
              <h3 className="text-xl font-bold text-[#FACC15] mb-4">Level {level} Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{50 - moves}</div>
                  <div className="text-gray-400 text-sm">Moves Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{revealedMemes.length}</div>
                  <div className="text-gray-400 text-sm">Memes Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FACC15]">{hintsUsed}/{maxHints}</div>
                  <div className="text-gray-400 text-sm">Hints Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{moves}</div>
                  <div className="text-gray-400 text-sm">Moves Left</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-center mb-8">
              <h3 className="text-white font-bold text-lg mb-2">🚀 Next Level Preview 🚀</h3>
              <p className="text-white mb-4">
                Level {level + 1} • Target: {Math.floor(targetScore * 1.3).toLocaleString()} points • 50 moves
              </p>
              <div className="text-[#FACC15] font-bold">
                Reward: {getReward()}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={continueToNextLevel}
                className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <Star size={20} />
                <span>Continue to Level {level + 1}</span>
              </button>
              <button
                onClick={() => setGameState('menu')}
                className="flex-1 bg-gray-600 hover:bg-gray-600/80 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Main Menu
              </button>
            </div>
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
              <h1 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h1>
              <div className="text-6xl font-bold text-white mb-4">{score.toLocaleString()}</div>
              <div className="text-2xl font-bold text-[#FACC15] mb-2">{playerTitle}</div>
              <div className="text-xl text-gray-300">You earned: {getReward()}</div>
              
              {noMovesLeft && (
                <div className="mt-4 bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-400 text-sm">
                    💡 No more possible moves were available. Try using hints earlier next time!
                  </p>
                </div>
              )}
            </div>

            {revealedMemes.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
                <h3 className="text-xl font-bold text-[#FACC15] mb-4">🔥 Memes Revealed ({revealedMemes.length}) 🔥</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {revealedMemes.map((meme, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3 text-gray-200 text-sm">
                      {meme}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
              <h3 className="text-xl font-bold text-[#FACC15] mb-4">Game Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{level}</div>
                  <div className="text-gray-400 text-sm">Level Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{50 - moves}</div>
                  <div className="text-gray-400 text-sm">Moves Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{revealedMemes.length}</div>
                  <div className="text-gray-400 text-sm">Memes Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FACC15]">{hintsUsed}/{maxHints}</div>
                  <div className="text-gray-400 text-sm">Hints Used</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => startGame(isDailyChallenge)}
                className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0f172a] font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>Play Again</span>
              </button>
              <button
                onClick={() => setGameState('menu')}
                className="flex-1 bg-gray-600 hover:bg-gray-600/80 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Main Menu
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
              <span className="text-white font-bold">Score: {score.toLocaleString()}</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-400">Moves: {moves}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={showHint}
                disabled={hintsUsed >= maxHints}
                className={`p-2 rounded-lg text-white transition-colors flex items-center space-x-1 ${
                  hintsUsed >= maxHints 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#FACC15] hover:bg-[#FACC15]/80 text-[#0f172a]'
                }`}
              >
                <HelpCircle size={16} />
                <span className="text-xs">{maxHints - hintsUsed}</span>
              </button>
              <button
                onClick={() => setGameState(gameState === 'paused' ? 'playing' : 'paused')}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
              >
                {gameState === 'paused' ? <Play size={16} /> : <Pause size={16} />}
              </button>
              <button
                onClick={() => setGameState('menu')}
                className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress to next level</span>
              <span>{score.toLocaleString()} / {targetScore.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#FACC15] to-[#e6b800] h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((score / targetScore) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Game Board */}
            <div className="relative">
              {gameState === 'paused' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-xl">
                  <div className="text-white text-2xl font-bold">PAUSED</div>
                </div>
              )}

              <div
                ref={gameRef}
                className="grid grid-cols-6 gap-2 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-4 border-slate-600"
                style={{ width: '360px', height: '360px' }}
              >
                {board.map((row, y) =>
                  row.map((tile, x) => (
                    <div
                      key={tile.id}
                      onClick={() => handleTileClick(x, y)}
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-2xl cursor-pointer
                        transition-all duration-200 transform hover:scale-110 active:scale-95
                        ${tile.isSelected ? 'ring-4 ring-[#FACC15] bg-[#FACC15]/20 shadow-lg' : 'bg-slate-700 hover:bg-slate-600'}
                        ${tile.isHint ? 'ring-4 ring-green-400 bg-green-400/20 animate-pulse' : ''}
                        ${tile.isMatched ? 'opacity-0' : 'opacity-100'}
                        ${tile.isFalling ? 'animate-bounce' : ''}
                      `}
                    >
                      {tile.emoji}
                    </div>
                  ))
                )}
              </div>

              {combo > 0 && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[#FACC15] font-bold text-lg animate-pulse">
                  COMBO x{combo}! 🔥
                </div>
              )}

              {showHints && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 font-bold text-sm animate-pulse">
                  💡 Hint: Try swapping the glowing tiles!
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm mb-2">
              {selectedTile 
                ? "Now tap an adjacent tile to swap!" 
                : "Tap a tile to select it, then tap an adjacent tile to swap"
              }
            </p>
            <p className="text-gray-400 text-xs">
              Match 3+ identical tiles • Invalid swaps don't cost moves • Use hints if stuck!
            </p>
          </div>

          {/* Side Panel */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-[#FACC15] font-bold text-lg mb-4">Game Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Score:</span>
                  <span className="text-white font-bold">{targetScore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Title:</span>
                  <span className="text-[#FACC15] font-bold">{playerTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hints Left:</span>
                  <span className="text-green-400 font-bold">{maxHints - hintsUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memes Found:</span>
                  <span className="text-purple-400 font-bold">{revealedMemes.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-[#FACC15] font-bold text-lg mb-4">Latest Meme</h3>
              {revealedMemes.length > 0 ? (
                <div className="bg-gray-700 rounded-lg p-3 text-gray-200 text-sm">
                  {revealedMemes[revealedMemes.length - 1]}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Match 4+ tiles to reveal corruption memes! 🔥
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeMatch;