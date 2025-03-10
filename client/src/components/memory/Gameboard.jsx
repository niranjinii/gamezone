import React, { useState, useEffect } from "react";
import Card from "./Card";
import StartGame from "../StartGame";
import Modal from "./Modal";
import axios from "axios";
import styles from "../../styles/memory/main.module.css";
import img1 from "../../images/memory/mem1.png";
import img2 from "../../images/memory/mem2.png";
import img3 from "../../images/memory/mem3.png";
import img4 from "../../images/memory/mem4.png";
import img5 from "../../images/memory/mem5.png";
import img6 from "../../images/memory/mem6.png";
import img7 from "../../images/memory/mem7.png";
import img8 from "../../images/memory/mem8.png";

const cardsArray = [
  { name: "card1", img: img1 },
  { name: "card2", img: img2 },
  { name: "card3", img: img3 },
  { name: "card4", img: img4 },
  { name: "card5", img: img5 },
  { name: "card6", img: img6 },
  { name: "card7", img: img7 },
  { name: "card8", img: img8 },
];

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showStartGame, setShowStartGame] = useState(true);

  useEffect(() => {
    const updatePoints = () => {
      if (isGameOver && points > 0) {
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

    if (isGameOver) {
      updatePoints();
    }
  }, [isGameOver, points]);

  useEffect(() => {
    const shuffledCards = [...cardsArray, ...cardsArray].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (isGameOver || showStartGame) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    if (time >= 360) {
      clearInterval(timer);
      setIsGameOver(true);
      setPoints(0); // End the game and award 0 points
    }

    return () => clearInterval(timer);
  }, [isGameOver, showStartGame, time]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameOver(true);

      let finalPoints = 0;
      if (time <= 120) {
        finalPoints = 50;
      } else if (time > 120 && time <= 360) {
        finalPoints = 30;
      }
      setPoints(finalPoints);
      setTotalPoints((prev) => prev + finalPoints); // Add points to the total
    }
  }, [matchedCards, cards, time]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].name === cards[secondIndex].name) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const resetGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setTime(0);
    setPoints(0);
    setIsGameOver(false);
    const shuffledCards = [...cardsArray, ...cardsArray].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
  };

  const handleExitGame = () => {
    setShowStartGame(true);
    setMatchedCards([]);
    setFlippedCards([]);
    setTime(0);
    setPoints(0);
    setTotalPoints(0);
    setIsGameOver(false);
  };

  const handleStartGame = () => {
    setShowStartGame(false);
  };

  return (
    <div className={styles.gameContainer}>
      {showStartGame && (
        <StartGame
          title="Welcome to the Game"
          description="Match all the pairs of cards in the shortest time possible!"
          onStart={handleStartGame}
        />
      )}

      {!showStartGame && (
        <>
          <h2 className={styles.mainArea}>Mystic Memories</h2>
          <p className={styles.time}>
            ⏰ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </p>

          <p className={styles.totalPoints}>Points: {totalPoints}</p>
          <div className={styles.gameBoard}>
            {cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                isFlipped={
                  flippedCards.includes(index) || matchedCards.includes(index)
                }
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </>
      )}

      {isGameOver && points === 0 && (
        <Modal winner="🧙‍♀️" points={0} restartGame={resetGame} />
      )}

      {isGameOver && points > 0 && (
        <Modal winner="🧙‍♀️" points={points} restartGame={resetGame} />
      )}
    </div>
  );
};

export default GameBoard;
