import React from "react";
import { mineColor } from "./util/mineColors";
import styles from "../../styles/minesweeper/main.module.css";
import Circle from "./Circle";

export default function Cell({ details, updateFlag, revealCell }) {
  const cellstyle = {
    background: details.revealed
      ? details.value === "X"
        ? mineColor()
        : bombChexPattern(details.x, details.y)
      : chexPattern(details.x, details.y),
    color: numColorCode(details.value),
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellstyle}
      className={styles.cellStyle}
    >
      {!details.revealed && details.flagged ? (
        "🔮"
      ) : details.revealed && details.value !== 0 ? (
        details.value === "X" ? (
          <Circle />
        ) : (
          details.value
        )
      ) : (
        ""
      )}
    </div>
  );
}

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#d8b6e2"; // Light pale purple
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#cda4dd"; // Slightly darker pale purple
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#cda4dd"; // Matching alternate color
  } else {
    return "#d8b6e2"; // Matching base color
  }
};

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#8650AC"; // Pale lavender
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#8650AC"; // Slightly darker lavender
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#8650AC"; // Matching alternate color
  } else {
    return "#8650AC"; // Matching base color
  }
};


const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2";
  } else if (num === 2) {
    return "#388d3c";
  } else if (num === 3) {
    return "#d33030";
  } else if (num === 4) {
    return "#7c21a2";
  } else if (num === 5) {
    return "#1976d2";
  } else if (num === 6) {
    return "#1976d2";
  } else {
    return "white";
  }
};
