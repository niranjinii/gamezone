import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/simon/simon.module.css";
import SimonGame from "./SimonGame";
import Header from "../Header";
import axios from "axios";

function Simon() {
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
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>The Sorceror's Sequence</h1>
          <p>Follow the magical sequence to cast your spell!</p>
        </header>
        <SimonGame />
      </div>
    </div>
  );
}

export default Simon;
