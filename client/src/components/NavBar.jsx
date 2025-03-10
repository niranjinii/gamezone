import React from "react";
import styles from "../styles/shared.module.css";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function NavBar() {
  return (
    <nav>
      <ul className={styles.navbar}>
        <HashLink smooth to="/#games-list" className={styles.link}>
          <li>Games</li>
        </HashLink>
        <Link to="/profile" className={styles.link}>
          <li>Config</li>
        </Link>
        <Link to="/achievements" className={styles.link}>
          <li>Achievements</li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
