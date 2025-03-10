import React from 'react';
import styles from '../styles/memory-game.module.css';

function Card({ card, index, isFlipped, onClick }) {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.cardFlipped : ''}`}
      onClick={() => onClick(index)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img src="./memoryimg/card-back.png" alt="card back" />
        </div>
        <div className={styles.cardBack}>
          <img src={card.img} alt={card.name} />
        </div>
      </div>
    </div>
  );
}

export default Card;
