import React from "react";
import castle from "../images/castle.svg";
import styles from "../styles/shared.module.css";
import { Link } from "react-router-dom";

function HomeIcon() {
  return (
    <div>
      <Link to="/" className={styles.mainlogo}>
        <img height={"80px"} width={"80px"} src={castle} alt="Castle" />
      </Link>
    </div>
  );
}

export default HomeIcon;
