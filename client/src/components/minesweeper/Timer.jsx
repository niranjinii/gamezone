import React, { useState, useEffect, useRef } from "react";

export default function Timer({ resetTrigger }) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    stopTimer(); // Clear existing timer
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setTime(0); // Reset time to 0
    startTimer(); // Restart timer
    return () => stopTimer(); // Cleanup on unmount
  }, [resetTrigger]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return (
    <div style={{ color: "white", fontSize: 20 }}>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {time}
    </div>
  );
}
