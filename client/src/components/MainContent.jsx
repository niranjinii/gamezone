import React from "react";
import styles from "../styles/main-page.module.css";
import { Link } from "react-router-dom";

function MainContent() {
  return (
    <div className={styles.content}>
      <h2>GameZone</h2>
      <Link to="/login" className={styles.link}>
        Create an Account Now!
      </Link>
      <p>Or, login to your account if you already have one.</p>
    </div>
  );
}

export default MainContent;
