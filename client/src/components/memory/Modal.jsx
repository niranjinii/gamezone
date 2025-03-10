import React from "react";

const Modal = ({ points, restartGame }) => {
  return (
    <div
      style={{
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
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #6c2173, #9c3b9f)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          color: "#f4e8ff",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          Congratulations!
        </h2>
        <h3
          style={{
            fontSize: "22px",
            marginBottom: "30px",
            color: "#ffe4fa",
          }}
        >
          You earned {points} points this game!
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={restartGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#fff",
              background: "linear-gradient(145deg, #4a0b62, #6c2173)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
              transition: "background 0.3s, transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(145deg, #8c2a90, #c355be)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(145deg, #4a0b62, #6c2173)")
            }
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

