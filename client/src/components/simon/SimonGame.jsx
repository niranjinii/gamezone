import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/simon/simon.module.css";
import axios from "axios";

// Import sound effects
import cauldronSound from "../../audio/boiling.mp3";
import potionSound from "../../audio/potion1.mp3";
import spellSound from "../../audio/spell1.mp3";
import wandSound from "../../audio/wand1.mp3";

// Import images
import pauseImg from "../../images/simon/cauldron1.png";
import poisonImg from "../../images/simon/poison1.png";
import spellsImg from "../../images/simon/spells1.png";
import wandImg from "../../images/simon/wand1.png";

const BUTTONS = [
  { id: 1, color: "green", sound: cauldronSound, image: pauseImg },
  { id: 2, color: "red", sound: potionSound, image: poisonImg },
  { id: 3, color: "blue", sound: spellSound, image: spellsImg },
  { id: 4, color: "yellow", sound: wandSound, image: wandImg },
];

const SimonGame = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    const updatePoints = () => {
      if (gameOver && points > 0) {
        let newPoints = points*5;
        axios
          .put(
            "http://localhost:8080/api/update-points",
            { newPoints },
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

  const sounds = BUTTONS.reduce((acc, button) => {
    acc[button.id] = new Audio(button.sound);
    return acc;
  }, {});

  const playSound = (buttonId) => {
    sounds[buttonId].currentTime = 0;
    sounds[buttonId].play();
  };

  const lightUpButton = (buttonId, duration = 500) => {
    const button = document.querySelector(`[data-button-id="${buttonId}"]`);
    button.classList.add(styles.active);
    playSound(buttonId);
    setTimeout(() => {
      button.classList.remove(styles.active);
    }, duration);
  };

  const showSequence = useCallback(async () => {
    setIsShowingSequence(true);
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      lightUpButton(sequence[i]);
    }
    setIsShowingSequence(false);
  }, [sequence]);

  const handleButtonClick = (buttonId) => {
    if (isShowingSequence || !isPlaying || gameOver) return;

    const newPlayerSequence = [...playerSequence, buttonId];
    setPlayerSequence(newPlayerSequence);
    lightUpButton(buttonId, 200);

    if (
      newPlayerSequence[newPlayerSequence.length - 1] !==
      sequence[newPlayerSequence.length - 1]
    ) {
      setGameOver(true);
      endGame();
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      const newPoints = points + 1;
      setPoints(newPoints);
      if (newPoints > highScore) {
        setHighScore(newPoints);
      }
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  };

  const startGame = () => {
    setSequence([Math.floor(Math.random() * 4) + 1]);
    setPlayerSequence([]);
    setIsPlaying(true);
    setGameOver(false);
    setPoints(0);
  };

  const nextRound = () => {
    const newSequence = [...sequence, Math.floor(Math.random() * 4) + 1];
    setSequence(newSequence);
    setPlayerSequence([]);
  };

  const endGame = () => {
    setIsPlaying(false);
    setSequence([]);
    setPlayerSequence([]);
  };

  useEffect(() => {
    if (sequence.length > 0 && isPlaying) {
      showSequence();
    }
  }, [sequence, isPlaying, showSequence]);

  return (
    <div className={styles.simonGame}>
      <div className={styles.gameInfo}>
        <p>Points: {points}</p>
        <p>High Score: {highScore}</p>
      </div>

      <div className={styles.gameBoard}>
        {BUTTONS.map((button) => (
          <button
            key={button.id}
            className={`${styles.gameButton} ${styles[button.color]}`}
            data-button-id={button.id}
            onClick={() => handleButtonClick(button.id)}
            disabled={isShowingSequence || !isPlaying || gameOver}
          >
            <img src={button.image} alt={`${button.color} button`} />
          </button>
        ))}
      </div>

      {gameOver ? (
        <div className={styles.gameOverMessage}>
          <h2>Game Over!</h2>
          <button className={styles["start-button"]} onClick={startGame}>
            Try Again
          </button>
        </div>
      ) : (
        <button
          className={styles["start-button"]}
          onClick={startGame}
          disabled={isPlaying}
        >
          {isPlaying ? "Game In Progress" : "Start Game"}
        </button>
      )}
    </div>
  );
};

export default SimonGame;
