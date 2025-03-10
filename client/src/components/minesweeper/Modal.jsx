import React, { useState, useEffect } from "react";

export default function Modal({ restartGame, gameStatus }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);

  const modalMessage =
    gameStatus === "win"
      ? "✨ Congratulations! You won! ✨"
      : "⚡ Game Over! Better luck next time. ⚡";

  return (
    <div
      style={{
        opacity: render ? 1 : 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.5s ease",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #6c2173, #9c3b9f)",
          padding: "30px 40px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.8)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "15px",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          {modalMessage}
        </h2>
        <button
          onClick={() => restartGame()}
          style={{
            cursor: "pointer",
            marginTop: "20px",
            borderRadius: "10px",
            background: "linear-gradient(145deg, #6c2173, #9c3b9f)",
            color: "#fff",
            padding: "12px 25px",
            fontWeight: "700",
            textTransform: "uppercase",
            fontSize: "18px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            transition: "transform 0.3s ease, background 0.3s ease",
            border: "none",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(145deg, #8c2a90, #c355be)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(145deg, #6c2173, #9c3b9f)")
          }
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
