import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import styles from "../styles/access.module.css";

function AccessDenied() {
  return (
    <div>
      <Header />
      <div className={styles.bg}>
        <div className={styles['na-container']}>
        <h3>Access Denied</h3>
        <p>Please login or create an account to view this page!</p>
        <Link to="/login" className={styles.link}>Login/Create an Account now.</Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
