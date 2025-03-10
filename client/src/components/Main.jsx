import React from "react";
import MainContent from "./MainContent";
import GamesList from "./GameList";
import FeedbackForm from "./Feedback";
import { Link } from "react-router-dom";
import stars from "../images/stars.png";
import styles from "../styles/main-page.module.css";

function Main() {
  return (
    <main>
      <div className={styles.bg}>
        <img
          src={stars}
          alt="Floating stars background"
          className={styles.backgroundstars}
        />
        <MainContent />
        <h4>Browse Our Games</h4>
        <GamesList />
        <p className={styles['leaderboard-text']}><Link to="/leaderboard" className={styles['leaderboard-link']}>Click here to view the leaderboard and see who our top players are!</Link></p>
        <FeedbackForm />
        <p className={styles.space}></p>

      </div>
    </main>
  );
}

export default Main;
