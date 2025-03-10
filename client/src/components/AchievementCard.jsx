import React from "react";
import styles from "../styles/achievements.module.css";
import { FaLock } from "react-icons/fa"; 
function AchievementCard(props) {
  const isUnlocked = props.points >= props.achpoints;

  return (
    <li className={isUnlocked ? styles.card : styles["hidden-card"]}>
      {!isUnlocked && <FaLock className={styles["lock-icon"]} />}
      <p className={styles["achievement-item"]}>
        <img src={props.achimg} alt="Achievement" />
        <span className={styles['points-text']}> Points: {props.achpoints}</span>
      </p>
      <h4 className={styles['ach-name']}>{props.achname}</h4>
    </li>
  );
}

export default AchievementCard;
