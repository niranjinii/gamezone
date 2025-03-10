import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TTBoard from "./TTBoard";
import Header from "../Header";
import styles from "../../styles/tictactoe/main.module.css";

const TicTacToe = () => {
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
      <div className={styles["tictactoe-div"]}>
        <TTBoard />
      </div>
    </div>
  );
};

export default TicTacToe;
