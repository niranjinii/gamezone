import React from "react";
import styles from "../styles/user-page.module.css";
import StarRateIcon from "@mui/icons-material/StarRate";

function UserProfile(props) {
  return (
    <div className={styles["profile-container"]}>
      <img
        className={styles["user-img"]}
        src={props.avatar}
        alt="User Avatar"
      />
      <div className={styles["profile-area"]}>
        <h3>{props.username}'s Profile</h3>
        <p>
          Total Points: <StarRateIcon className={styles['star-icon']} />
          {props.points}
        </p>
        <p>Level: {props.achievement}</p>
      </div>
    </div>
  );
}

export default UserProfile;
