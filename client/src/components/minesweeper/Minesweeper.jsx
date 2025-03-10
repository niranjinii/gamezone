import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/minesweeper/main.module.css";
import StartGame from "../StartGame"; // Import the StartGame component
import Board from "./Board"; // Import the game board
import Header from "../Header";

function Minesweeper() {
  const [gameStarted, setGameStarted] = useState(false); // Track whether the game has started
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/check-auth", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        navigate("/access-denied");
      });
  }, [navigate]);

  const handleStartGame = () => {
    setGameStarted(true); // Start the game
  };

  return (
    <div>
      <Header />
      <div className={styles["main-container"]}>
        {" "}
        {/* Apply the gradient background here */}
        {!gameStarted ? (
          <StartGame
            title="Welcome to the Game!"
            description="Click the button below to start the game and reveal the board."
            onStart={handleStartGame} 
          />
        ) : (
          <Board />
        )}
      </div>
    </div>
  );
}

export default Minesweeper;
