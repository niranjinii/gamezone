import React from "react";
import styles from "../styles/StartGame.module.css"; // Relative path to the CSS file

function StartGame(props) {
    return (
        <div className={styles.startgamecontainer}>
            <div className={styles.startgamebox}>
                <h2 className={styles.titleArea}>{props.title}</h2>
                <p>{props.description}</p>
                <button type="button" onClick={props.onStart}>
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default StartGame;
