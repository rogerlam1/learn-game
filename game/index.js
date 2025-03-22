// Tetris game constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;
const EMPTY_CELL = 0;
const COLORS = [
  'transparent',  // Empty cell (0)
  '#FF0D72',      // I piece (1)
  '#0DC2FF',      // J piece (2)
  '#0DFF72',      // L piece (3)
  '#F538FF',      // O piece (4)
  '#FF8E0D',      // S piece (5)
  '#FFE138',      // T piece (6)
  '#3877FF'       // Z piece (7)
];

// Tetromino shapes represented as matrices
const TETROMINOS = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  O: [
    [4, 4],
    [4, 4]
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};

// Helper function to create a matrix with specified width and height
const createMatrix = (width, height, fill = 0) => {
  return Array.from({ length: height }, () => Array(width).fill(fill));
};

// Helper function to check for collision
const checkCollision = (board, tetromino, position) => {
  const [pieceMatrix, pos] = [tetromino.matrix, position];
  
  for (let y = 0; y < pieceMatrix.length; y++) {
    for (let x = 0; x < pieceMatrix[y].length; x++) {
      if (pieceMatrix[y][x] !== 0) {
        const boardX = pos.x + x;
        const boardY = pos.y + y;
        
        // Check boundaries
        if (
          boardX < 0 || 
          boardX >= BOARD_WIDTH || 
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX] !== EMPTY_CELL)
        ) {
          return true;
        }
      }
    }
  }
  
  return false;
};

// Helper function to rotate a matrix (tetromino)
const rotateMatrix = (matrix, clockwise = true) => {
  const result = [];
  
  if (clockwise) {
    for (let i = 0; i < matrix[0].length; i++) {
      const row = [];
      for (let j = matrix.length - 1; j >= 0; j--) {
        row.push(matrix[j][i]);
      }
      result.push(row);
    }
  } else {
    for (let i = matrix[0].length - 1; i >= 0; i--) {
      const row = [];
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[j][i]);
      }
      result.push(row);
    }
  }
  
  return result;
};

// Helper function to merge the tetromino into the board
const mergeBoard = (board, tetromino, position) => {
  const boardCopy = JSON.parse(JSON.stringify(board));
  
  tetromino.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = position.y + y;
        if (boardY >= 0) {
          boardCopy[boardY][position.x + x] = value;
        }
      }
    });
  });
  
  return boardCopy;
};

// Helper function to check for completed rows
const checkRows = (board) => {
  const boardCopy = JSON.parse(JSON.stringify(board));
  let lines = 0;
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (boardCopy[y].every(cell => cell !== EMPTY_CELL)) {
      lines += 1;
      
      // Remove the completed row and add a new one at the top
      boardCopy.splice(y, 1);
      boardCopy.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
      y++; // Recheck the same position
    }
  }
  
  return { clearedBoard: boardCopy, lines };
};

// Tetris React Component
const Tetris = () => {
  const [board, setBoard] = React.useState(createMatrix(BOARD_WIDTH, BOARD_HEIGHT));
  const [tetromino, setTetromino] = React.useState(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [dropTime, setDropTime] = React.useState(1000);
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [lines, setLines] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  
  // Reference for the game loop
  const requestRef = React.useRef();
  const lastTimeRef = React.useRef(0);
  const dropCounter = React.useRef(0);
  
  // Generate a random tetromino
  const randomTetromino = () => {
    const shapes = Object.keys(TETROMINOS);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    return {
      type: randomShape,
      matrix: TETROMINOS[randomShape]
    };
  };
  
  // Spawn a new tetromino
  const spawnTetromino = React.useCallback(() => {
    const newTetromino = randomTetromino();
    const startPosition = {
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.matrix[0].length / 2),
      y: 0
    };
    
    // Check if new tetromino collides immediately (game over)
    if (checkCollision(board, newTetromino, startPosition)) {
      setGameOver(true);
      return;
    }
    
    setTetromino(newTetromino);
    setPosition(startPosition);
  }, [board]);
  
  // Reset the game
  const resetGame = React.useCallback(() => {
    setBoard(createMatrix(BOARD_WIDTH, BOARD_HEIGHT));
    setScore(0);
    setLevel(1);
    setLines(0);
    setDropTime(1000);
    setGameOver(false);
    setPaused(false);
    
    // Need to spawn the first tetromino after state updates
    setTimeout(() => {
      const newTetromino = randomTetromino();
      const startPosition = {
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.matrix[0].length / 2),
        y: 0
      };
      setTetromino(newTetromino);
      setPosition(startPosition);
    }, 0);
  }, []);
  
  // Move tetromino
  const moveTetromino = React.useCallback((direction) => {
    if (gameOver || paused || !tetromino) return;
    
    const nextPosition = {
      x: position.x + direction,
      y: position.y
    };
    
    if (!checkCollision(board, tetromino, nextPosition)) {
      setPosition(nextPosition);
    }
  }, [board, tetromino, position, gameOver, paused]);
  
  // Drop tetromino
  const dropTetromino = React.useCallback(() => {
    if (gameOver || paused || !tetromino) return;
    
    const nextPosition = {
      x: position.x,
      y: position.y + 1
    };
    
    if (!checkCollision(board, tetromino, nextPosition)) {
      setPosition(nextPosition);
    } else {
      // Tetromino landed, merge it with the board
      const newBoard = mergeBoard(board, tetromino, position);
      setBoard(newBoard);
      
      // Check for cleared lines
      const { clearedBoard, lines: clearedLines } = checkRows(newBoard);
      if (clearedLines > 0) {
        setBoard(clearedBoard);
        
        // Update score and level
        setLines(prevLines => {
          const newLines = prevLines + clearedLines;
          const newLevel = Math.floor(newLines / 10) + 1;
          
          setScore(prevScore => 
            prevScore + (clearedLines === 1 ? 40 : clearedLines === 2 ? 100 : clearedLines === 3 ? 300 : 1200) * level
          );
          
          if (newLevel > level) {
            setLevel(newLevel);
            setDropTime(1000 / (0.8 + (newLevel - 1) * 0.007));
          }
          
          return newLines;
        });
      }
      
      spawnTetromino();
    }
  }, [board, tetromino, position, gameOver, paused, level, lines, spawnTetromino]);
  
  // Hard drop tetromino
  const hardDropTetromino = React.useCallback(() => {
    if (gameOver || paused || !tetromino) return;
    
    let nextPosition = { ...position };
    
    // Keep moving down until collision
    while (!checkCollision(board, tetromino, { ...nextPosition, y: nextPosition.y + 1 })) {
      nextPosition.y += 1;
    }
    
    setPosition(nextPosition);
    // Immediately merge with the board instead of just calling dropTetromino
    const newBoard = mergeBoard(board, tetromino, nextPosition);
    setBoard(newBoard);
    
    // Check for cleared lines
    const { clearedBoard, lines: clearedLines } = checkRows(newBoard);
    if (clearedLines > 0) {
      setBoard(clearedBoard);
      
      // Update score and level
      setLines(prevLines => {
        const newLines = prevLines + clearedLines;
        const newLevel = Math.floor(newLines / 10) + 1;
        
        setScore(prevScore => 
          prevScore + (clearedLines === 1 ? 40 : clearedLines === 2 ? 100 : clearedLines === 3 ? 300 : 1200) * level
        );
        
        if (newLevel > level) {
          setLevel(newLevel);
          setDropTime(1000 / (0.8 + (newLevel - 1) * 0.007));
        }
        
        return newLines;
      });
    }
    
    spawnTetromino();
  }, [board, tetromino, position, gameOver, paused, level, spawnTetromino]);
  
  // Rotate tetromino
  const rotateTetromino = React.useCallback(() => {
    if (gameOver || paused || !tetromino) return;
    
    const rotated = {
      ...tetromino,
      matrix: rotateMatrix(tetromino.matrix)
    };
    
    // Check if rotation is possible (with wall kicks)
    const wallKickOffsets = [0, 1, -1, 2, -2]; // Try original position, right, left, far right, far left
    
    for (const xOffset of wallKickOffsets) {
      const testPosition = {
        x: position.x + xOffset,
        y: position.y
      };
      
      if (!checkCollision(board, rotated, testPosition)) {
        setTetromino(rotated);
        setPosition(testPosition);
        return;
      }
    }
  }, [board, tetromino, position, gameOver, paused]);
  
  // Game loop using useCallback so it can be referenced in dependency arrays
  const gameLoop = React.useCallback((timestamp) => {
    if (gameOver || paused || !tetromino) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    dropCounter.current += deltaTime;
    
    if (dropCounter.current > dropTime) {
      dropTetromino();
      dropCounter.current = 0;
    }
    
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, paused, tetromino, dropTime, dropTetromino]);
  
  // Handle keyboard controls
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver) {
        if (event.key === 'Enter') {
          resetGame();
        }
        return;
      }
      
      if (event.key === 'p') {
        setPaused(!paused);
        return;
      }
      
      if (paused) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          moveTetromino(-1);
          break;
        case 'ArrowRight':
          moveTetromino(1);
          break;
        case 'ArrowDown':
          dropTetromino();
          break;
        case 'ArrowUp':
          rotateTetromino();
          break;
        case ' ':
          hardDropTetromino();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, paused, moveTetromino, dropTetromino, rotateTetromino, hardDropTetromino, resetGame]);
  
  // Start game loop
  React.useEffect(() => {
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameLoop]);
  
  // Initialize the game
  React.useEffect(() => {
    resetGame();
  }, [resetGame]);
  
  // Render functions
  const renderBoard = () => {
    const boardWithTetromino = JSON.parse(JSON.stringify(board));
    
    // Merge the current tetromino into the board for rendering
    if (tetromino) {
      tetromino.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              boardWithTetromino[boardY][boardX] = value;
            }
          }
        });
      });
    }
    
    // Create cells
    return boardWithTetromino.map((row, y) => (
      row.map((cell, x) => (
        <div 
          key={`${y}-${x}`} 
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: COLORS[cell],
            border: cell === 0 ? '1px solid #111' : '1px solid rgba(255, 255, 255, 0.1)',
            position: 'absolute',
            top: y * CELL_SIZE,
            left: x * CELL_SIZE
          }}
        />
      ))
    ));
  };
  
  // Render ghost piece (preview of where tetromino will land)
  const renderGhostPiece = () => {
    if (!tetromino || gameOver || paused) return null;
    
    let ghostPosition = { ...position };
    
    // Find the lowest possible position for the tetromino
    while (!checkCollision(board, tetromino, { ...ghostPosition, y: ghostPosition.y + 1 })) {
      ghostPosition.y += 1;
    }
    
    // Don't render ghost if it's at the same position as the actual tetromino
    if (ghostPosition.y === position.y) return null;
    
    return tetromino.matrix.map((row, y) => (
      row.map((cell, x) => {
        if (cell !== 0) {
          const boardY = ghostPosition.y + y;
          const boardX = ghostPosition.x + x;
          
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            return (
              <div 
                key={`ghost-${y}-${x}`} 
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: 'transparent',
                  border: '1px dashed rgba(255, 255, 255, 0.3)',
                  position: 'absolute',
                  top: boardY * CELL_SIZE,
                  left: boardX * CELL_SIZE
                }}
              />
            );
          }
        }
        return null;
      })
    ));
  };
  
  // Preview next tetromino
  const renderNextTetromino = () => {
    const nextPiece = randomTetromino();
    
    return (
      <div style={{
        width: nextPiece.matrix[0].length * CELL_SIZE,
        height: nextPiece.matrix.length * CELL_SIZE,
        position: 'relative',
        margin: '0 auto'
      }}>
        {nextPiece.matrix.map((row, y) => (
          row.map((cell, x) => (
            cell !== 0 ? (
              <div 
                key={`next-${y}-${x}`} 
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: COLORS[cell],
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'absolute',
                  top: y * CELL_SIZE,
                  left: x * CELL_SIZE
                }}
              />
            ) : null
          ))
        ))}
      </div>
    );
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>TETRIS</h2>
        
        <div style={{ 
          width: BOARD_WIDTH * CELL_SIZE, 
          height: BOARD_HEIGHT * CELL_SIZE, 
          position: 'relative',
          border: '2px solid white',
          backgroundColor: '#000',
          marginBottom: '20px'
        }}>
          {!gameOver && renderBoard()}
          {!gameOver && renderGhostPiece()}
          
          {gameOver && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h2>GAME OVER</h2>
              <p>Press ENTER to restart</p>
            </div>
          )}
          
          {paused && !gameOver && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h2>PAUSED</h2>
              <p>Press P to continue</p>
            </div>
          )}
        </div>
        
        <div style={{ fontSize: '14px', marginBottom: '30px' }}>
          <p>←/→: Move | ↑: Rotate | ↓: Soft Drop</p>
          <p>SPACE: Hard Drop | P: Pause</p>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minWidth: '150px'
      }}>
        <div>
          <h3>Score</h3>
          <div style={{ border: '1px solid white', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
            {score}
          </div>
        </div>
        
        <div>
          <h3>Level</h3>
          <div style={{ border: '1px solid white', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
            {level}
          </div>
        </div>
        
        <div>
          <h3>Lines</h3>
          <div style={{ border: '1px solid white', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
            {lines}
          </div>
        </div>
        
        <div>
          <h3>Next</h3>
          <div style={{ 
            border: '1px solid white', 
            borderRadius: '5px', 
            padding: '10px',
            marginTop: '5px',
            width: 'fit-content',
            minHeight: '100px',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {renderNextTetromino()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the game
ReactDOM.render(
  <Tetris />,
  document.getElementById('root')
); 