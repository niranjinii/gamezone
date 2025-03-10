import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import Header from "./Header";
import Alert from "./Alert";
import styles from "../styles/leaderboard.module.css";
import TrophyIcon from "./TrophyIcon";
import axios from "axios";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");
  const [isEmpty, setEmpty] = useState(false);

  // Fetch leaderboard data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/leaderboard", {withCredentials: true}) // Endpoint to fetch leaderboard data
      .then((response) => {
        if (response.data.length === 0) {
          setEmpty(true);
        } else {
          const sortedLeaderboard = response.data.sort(
            (a, b) => b.points - a.points
          );
          setLeaderboard(sortedLeaderboard);
        }
      })
      .catch((error) => {
        error("There was an error fetching leaderboard data!");
      });
  }, []);

  function handleClick() {
    setError("");
  }

  return (
    <div>
      <Header />
      <div className={styles.lbg}>
        <div className={styles["leaderboard-container"]}>
          <h2 className={styles.leaderboardheader}>
            {" "}
            <TrophyIcon />
            Leaderboard
          </h2>
          {isEmpty ? (
            <p className={styles.empty}>No leaderboard data available yet.</p>
          ) : (
            <Leaderboard leaderboard={leaderboard} />
          )}
        </div>
        <p className={styles.space}></p>
      </div>
      {error && (
        <Alert title="Error!" alertContent={error} onClick={handleClick} />
      )}
    </div>
  );
}

export default LeaderboardPage;
