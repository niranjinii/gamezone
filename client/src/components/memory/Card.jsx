import React from "react";
import styles from "../../styles/memory/main.module.css"; 
import cardBackImg from "../../images/memory/card-back.png"; // Import card-back image

const Card = ({ card, isFlipped, onClick }) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front of the card - unique for each card */}
        <div className={styles.cardFront}>
          <img src={card.img} alt={card.name} />
        </div>
        {/* Back of the card - using the imported image */}
        <div className={styles.cardBack}>
          <img src={cardBackImg} alt="Card Back" />
        </div>
      </div>
    </div>
  );
};

export default Card;
