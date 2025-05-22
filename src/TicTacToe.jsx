import React, { useState, useEffect } from 'react';

const EMPTY = '';
const HUMAN = 'O';
const ROBOT = 'X';

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return board.includes(EMPTY) ? null : { winner: 'draw', line: [] };
}

function minimax(board, isMaximizing) {
  const result = calculateWinner(board);
  if (result?.winner === ROBOT) return { score: 1 };
  if (result?.winner === HUMAN) return { score: -1 };
  if (result?.winner === 'draw') return { score: 0 };

  let best = isMaximizing ? { score: -Infinity } : { score: Infinity };

  for (let i = 0; i < board.length; i++) {
    if (board[i] === EMPTY) {
      board[i] = isMaximizing ? ROBOT : HUMAN;
      const result = minimax(board, !isMaximizing);
      board[i] = EMPTY;
      result.index = i;

      if (isMaximizing) {
        if (result.score > best.score) best = result;
      } else {
        if (result.score < best.score) best = result;
      }
    }
  }
  return best;
}

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(EMPTY));
  const [turn, setTurn] = useState(HUMAN);
  const [robotWins, setRobotWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winningLine, setWinningLine] = useState([]);
  const [isResetting, setIsResetting] = useState(false);

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)?.winner || turn !== HUMAN || isResetting) return;

    const newBoard = [...board];
    newBoard[i] = HUMAN;
    setBoard(newBoard);
    setTurn(ROBOT);

    setTimeout(() => {
      const bestMove = minimax(newBoard, true).index;
      if (bestMove !== undefined) {
        newBoard[bestMove] = ROBOT;
        setBoard([...newBoard]);
      }
      setTurn(HUMAN);
    }, 500);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result?.winner) {
      if (result.winner === ROBOT) setRobotWins(w => w + 1);
      else if (result.winner === 'draw') setDraws(d => d + 1);
      setWinningLine(result.line || []);
      setIsResetting(true);
      const timer = setTimeout(() => {
        resetGame();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(EMPTY));
    setTurn(HUMAN);
    setWinningLine([]);
    setIsResetting(false);
  };

  const result = calculateWinner(board);
  const status = result?.winner
    ? result.winner === 'draw'
      ? "It's a draw!"
      : `${result.winner} wins!`
    : `Turn: ${turn}`;

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <p>{status}</p>
      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`cell ${winningLine.includes(i) ? 'highlight' : ''}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="scoreboard">
        <p> Number of Robot Wins: {robotWins}</p>
        <p> Number of Draws: {draws}</p>
        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>
    </div>
  );
};

export default TicTacToe;
