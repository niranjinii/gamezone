import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/memory/main.module.css";
import GameBoard from "./Gameboard";
import Header from "../Header";

function MemoryGame() {
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
  return (
    <div>
      <Header />
      <div className={styles["game-container"]}>
        <GameBoard />
      </div>
    </div>
  );
}

export default MemoryGame;
