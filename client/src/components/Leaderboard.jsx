import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/leaderboard.module.css";

function Leaderboard(props) {
 
  function renderBoard(player, index) {
    let username = player.username;
    let score = player.points; 
    let userId = player.userId;

    return (
      <li className={styles.leaderboarditem} key={player.userId}>
        <p>{index + 1}</p>
        <Link to={`/user/${userId}`} className={styles.leaderboardlink}>
          <p>{username}</p>
        </Link>
        <p>{score}</p>
      </li>
    );
  }

  return (
    <div className={styles.leaderboard}>
      <ol className={styles.leaderboardmain}>
        <li className={`${styles.leaderboarditem} ${styles.header}`}>
          <p></p>
          <p>Username</p>
          <p>Score</p>
        </li>
        {(props.leaderboard).map(renderBoard)}
      </ol>
    </div>
  );
}

export default Leaderboard;
