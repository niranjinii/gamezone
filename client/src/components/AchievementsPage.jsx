import React from "react";
import Achievements from "./Achievements";
import Header from "./Header";
import Alert from "./Alert";
import styles from "../styles/achievements.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AchievementsPage() {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/achievements", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        const { username, points } = response.data;
        setUsername(username);
        setPoints(points);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          navigate("/access-denied");
        } else {
          setError(true);
        }
      });
  }, [navigate]);

  function handleClick() {
    setError(false);
  }
  if (loading) {
    return (
      <div>
        <Header />
        <section className={styles.bg}>
          <h2 className={styles["ach-header"]}>Achievements</h2>
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section className={styles.bg}>
        <h2 className={styles["ach-header"]}>Achievements</h2>
        {error ? (
          <Alert
            title="Error!"
            alertContent="There was an error loading the page. Please try again!"
            clicked={handleClick}
          />
        ) : (
          <>
            <p className={styles["tot-points"]}>
              {username}'s Total Points: <span><StarRateIcon /></span> {points}
            </p>
            <Achievements points={points} />
          </>
        )}
      </section>
    </div>
  );
}

export default AchievementsPage;