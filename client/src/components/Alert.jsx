import React from "react";
import styles from "../styles/alert-box.module.css";

function Alert(props) {
  return (
    <div className={styles.alertcontainer}>
      <div className={styles.alertbox}>
        <h2>{props.title}</h2>
        <p>{props.alertContent}</p>
        <button type="button" onClick={()=>{props.clicked()}}>OK</button>
      </div>
    </div>
  );
}

export default Alert;
