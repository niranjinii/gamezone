import React from "react";
import styles from "../styles/profile-page.module.css";
import temp from "../images/profile.jpg"; // Import your default temp avatar
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar({ selectedIcon, userId, handleLogOut }) {
  // Default to temp avatar if none is selected
  const avatarUrl = selectedIcon === temp ? temp : selectedIcon;

  return (
    <div className={styles.sidebar}>
      {/* Profile Picture Section */}
      <div className={styles["profile-pic"]}>
        <div className={styles.overlay}>
          <img
            id="sidebarProfile"
            src={avatarUrl}
            alt="Profile Avatar"
            className={styles["avatar-img"]}
          />
        </div>
      </div>

      {/* Sidebar Menu */}
      <ul className={styles["sidebar-list"]}>
        <li>
          <button className={styles["sidebar-button"]}>Settings</button>
        </li>
        <li>
          <Link to={`/user/${userId}`} className={styles["sidebar-button"]}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/achievements" className={styles["sidebar-button"]}>
            Achievements
          </Link>
        </li>
        <li>
          <button
            className={styles["sidebar-button"]}
            onClick={() => {
              handleLogOut();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
