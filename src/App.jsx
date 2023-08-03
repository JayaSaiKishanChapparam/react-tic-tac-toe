import { useState } from "react";

const App = () => {
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // Initialize the board with empty cells based on dimensions
  const initializeBoard = (dimensions) => {
    const newBoard = [];
    for (let i = 0; i < dimensions; i++) {
      const row = [];
      for (let j = 0; j < dimensions; j++) {
        row.push(null);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };

  // Check for a winner
  const checkWinner = () => {
    const dimensions = board.length;

    // Check rows
    for (let i = 0; i < dimensions; i++) {
      if (board[i].every((cell) => cell === currentPlayer)) {
        return true;
      }
    }

    // Check columns
    for (let j = 0; j < dimensions; j++) {
      if (board.every((row) => row[j] === currentPlayer)) {
        return true;
      }
    }

    // Check diagonals
    let diagonal1 = true;
    let diagonal2 = true;
    for (let k = 0; k < dimensions; k++) {
      diagonal1 = diagonal1 && board[k][k] === currentPlayer;
      diagonal2 = diagonal2 && board[k][dimensions - k - 1] === currentPlayer;
    }
    if (diagonal1 || diagonal2) {
      return true;
    }

    return false;
  };

  // Handle cell click
  const handleCellClick = (rowIndex, colIndex) => {
    if (winner || board[rowIndex][colIndex]) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner()) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Render the board
  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                className="cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Render the game
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      {!board.length ? (
        <div>
          <p>Enter the dimensions of the board:</p>
          <input
            type="number"
            onChange={(e) => initializeBoard(Number(e.target.value))}
          />
        </div>
      ) : (
        <>
          {winner ? (
            <p>Winner: {winner}</p>
          ) : (
            <p>Current Player: {currentPlayer}</p>
          )}
          {renderBoard()}
        </>
      )}
    </div>
  );
};

export default App;
