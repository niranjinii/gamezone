import React from "react";
import Header from "./Header";
import styles from "../styles/not-found.module.css";

function NotFound() {
  return (
    <div>
      <Header />
      <div className={styles.bg}>
        <div className={styles['nf-container']}>
        <h3>404 Page Not Found</h3>
        <p>Uh Oh! Looks like this page does not exist.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
