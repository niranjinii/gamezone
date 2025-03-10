import React from "react";
import styles from "../styles/achievements.module.css";
import AchievementCard from "./AchievementCard";
import first from "../images/1.jpg";
import second from "../images/2.jpg";
import third from "../images/3.jpg";
import fourth from "../images/4.jpg";
import fifth from "../images/5.jpg";

function Achievements(props) {
  return (
    <ul className={styles["achievement-board"]}>
      <AchievementCard
        points={props.points}
        achpoints={200}
        achimg={first}
        achname="Beginner"
      />
      <AchievementCard
        points={props.points}
        achpoints={400}
        achimg={second}
        achname="Amateur"
      />
      <AchievementCard
        points={props.points}
        achpoints={700}
        achimg={third}
        achname="Intermediate"
      />
      <AchievementCard
        points={props.points}
        achpoints={1200}
        achimg={fourth}
        achname="Expert"
      />
      <AchievementCard
        points={props.points}
        achpoints={2000}
        achimg={fifth}
        achname="Game Master"
      />
    </ul>
  );
}
export default Achievements;
