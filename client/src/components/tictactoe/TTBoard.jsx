import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/tictactoe/main.module.css"; // Import the module CSS
import Modal from "./Modal"; // Import Modal component
import StartGame from "../StartGame"; // Import StartGame component

const TTBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [points, setPoints] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    const updatePoints = () => {
      if (gameOver && points > 0) {
        axios
          .put(
            "http://localhost:8080/api/update-points",
            { points },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response.data.message);
            // alert("Points updated successfully!");
          })
          .catch((error) => {
            console.error(
              "Error updating points:",
              error.response?.data?.message || error.message
            );
            alert("Failed to update points.");
          });
      }
    };

    if (gameOver) {
      updatePoints();
    }
  }, [gameOver, points]);

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((square) => square !== null)) return "Draw";
    return null;
  };

  const handlePlayerMove = (index) => {
    if (!board[index] && isPlayerTurn && !winner && !gameOver) {
      const newBoard = [...board];
      newBoard[index] = "🧙‍♀️";
      setBoard(newBoard);
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setGameOver(true);
        if (gameWinner === "🧙‍♀️") {
          setPoints((prevPoints) => prevPoints + 50);
        }
      } else {
        setIsPlayerTurn(false);
        setTimeout(() => computerMove(newBoard), 500);
      }
    }
  };

  const computerMove = (currentBoard) => {
    if (winner || gameOver) return;

    const findBestMove = (symbol) => {
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        const values = [currentBoard[a], currentBoard[b], currentBoard[c]];
        if (
          values.filter((v) => v === symbol).length === 2 &&
          values.includes(null)
        ) {
          return combination[values.indexOf(null)];
        }
      }
      return null;
    };

    let move = findBestMove("🪄");
    if (move !== null) {
      currentBoard[move] = "🪄";
      setBoard([...currentBoard]);
      const gameWinner = checkWinner(currentBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setGameOver(true);
      } else {
        setIsPlayerTurn(true);
      }
      return;
    }

    move = findBestMove("🧙‍♀️");
    if (move !== null) {
      currentBoard[move] = "🪄";
      setBoard([...currentBoard]);
      const gameWinner = checkWinner(currentBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setGameOver(true);
      } else {
        setIsPlayerTurn(true);
      }
      return;
    }

    if (currentBoard[4] === null) {
      currentBoard[4] = "🪄";
      setBoard([...currentBoard]);
      setIsPlayerTurn(true);
      return;
    }

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(
      (corner) => currentBoard[corner] === null
    );
    if (availableCorners.length > 0) {
      move =
        availableCorners[Math.floor(Math.random() * availableCorners.length)];
      currentBoard[move] = "🪄";
      setBoard([...currentBoard]);
      setIsPlayerTurn(true);
      return;
    }

    const availableMoves = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);

    move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    currentBoard[move] = "🪄";
    setBoard([...currentBoard]);
    setIsPlayerTurn(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameOver(false);
  };

  const startGame = () => {
    setIsGameStarted(true);
    resetGame();
  };

  return (
    <div className={styles["game-container"]}>
      {!isGameStarted ? (
        <StartGame
          title="Welcome to the Game!"
          description="Click the button below to start the game and reveal the board."
          onStart={startGame}
        />
      ) : (
        <>
          <h1 className={styles["title"]}>The Wizard's Duel</h1>
          <h2 className={styles["points"]}>Points: {points}</h2>
          {winner ? (
            <h2 className={styles["winner"]}>
              {winner === "Draw" ? "It's a Mystical Draw!" : `${winner} Wins!`}
            </h2>
          ) : (
            <h2 className={styles["turn"]}>
              {isPlayerTurn ? "Your Turn" : "Computer's Turn"}
            </h2>
          )}
          <div className={styles["board"]}>
            {board.map((value, index) => (
              <div
                key={index}
                onClick={() => handlePlayerMove(index)}
                className={`${styles["square"]} ${
                  value ? styles["disabled"] : ""
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          {gameOver && (
            <Modal
              winner={winner}
              points={points}
              restartGame={resetGame}
              message="Game Over"
            />
          )}
        </>
      )}
    </div>
  );
};

export default TTBoard;
