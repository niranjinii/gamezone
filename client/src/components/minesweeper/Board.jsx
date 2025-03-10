import React, { useState, useEffect } from "react";
import createBoard from "./util/createBoard";
import styles from "../../styles/minesweeper/main.module.css";
import Cell from "./Cell";
import { revealed } from "./util/reveal";
import Modal from "./Modal";
import axios from "axios";
import Timer from "./Timer";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [resetKey, setResetKey] = useState(0); // State to trigger timer reset
  const [points, setPoints] = useState(0);
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

  // ComponentDidMount
  useEffect(() => {
    freshBoard();
  }, []);

  const freshBoard = () => {
    const newBoard = createBoard(10, 15, 15); // Create a board with 10 rows, 15 columns, and 15 mines
    setNonMineCount(10 * 15 - 15); // Set non-mine cell count
    setMineLocations(newBoard.mineLocation); // Set mine locations
    setGrid(newBoard.board); // Set board grid
  };

  const restartGame = () => {
    freshBoard(); // Reset the board
    setGameOver(false); // Reset game state
    setResetKey((prev) => prev + 1); // Reset the timer
    setPoints(0); // Reset points
    console.log("Game restarted");
  };

  const updateFlag = (e, x, y) => {
    e.preventDefault();

    let newGrid = JSON.parse(JSON.stringify(grid));
    let isFlagged = newGrid[x][y].flagged;

    // Toggle flagged state
    newGrid[x][y].flagged = !isFlagged;
    setGrid(newGrid);

    // Check if the tile is a mine
    if (newGrid[x][y].value === "X") {
      if (!isFlagged) {
        // Add points for correctly flagged mine
        setPoints((prev) => prev + 5);
      } else {
        // Optionally, subtract points for removing a flag on a mine
        setPoints((prev) => prev - 5);
      }
    } else {
      if (!isFlagged) {
        // Optionally, subtract points for incorrectly flagging a non-mine
        setPoints((prev) => prev - 5); // or some other penalty
      }
      // No points are added for flagging a non-mine correctly
    }
  };

  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      // Player loses
      let minesFound = 0;
      for (let i = 0; i < mineLocations.length; i++) {
        if (newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed) {
          minesFound++;
        }
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setPoints((prev) => prev + minesFound * 10); // Add 10 points per mine found
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);

      console.log(
        "Remaining non-mine count:",
        newRevealedBoard.newNonMinesCount
      ); // Debugging log

      if (newRevealedBoard.newNonMinesCount === 0) {
        console.log("Player wins! Adding 75 points..."); // Debugging log
        setPoints((prev) => prev + 20); // Add 75 points for winning
        setGameOver(true);
      }
    }
  };

  return (
    <div className={styles["main-board"]}>
      <div className={styles["header"]}>
        <p className={styles["title"]}>Dragon's Treasure</p>
        <Timer resetTrigger={resetKey} className={styles["timer"]} />
        <div className={styles["points"]}>Points: {points}</div>
      </div>
      <div
        className={styles["grid-container"]}
      >
        {/* Pass gameStatus based on win/loss */}
        {gameOver && (
          <Modal
            restartGame={restartGame}
            gameStatus={nonMineCount === 0 ? "win" : "lose"}
          />
        )}
        {grid.map((singleRow, index1) => {
          return (
            <div className={styles["row"]} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}  

export default Board;
