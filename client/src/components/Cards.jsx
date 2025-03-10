import React, { useState } from 'react';
import Card from './Card';
import styles from '../styles/memory-game.module.css';
import one from "../images/mem1.png";
import two from "../images/mem2.png";
import three from "../images/mem3.png";
import four from "../images/mem4.png";
import five from "../images/mem5.png";
import six from "../images/mem6.png";
import seven from "../images/mem7.png";
import eight from "../images/mem8.png";
import back from "../images/card-back.png"; // The backside image for all cards

function Cards() {
  const [items, setItems] = useState(
    [
      { id: 1, img: one, stat: "back" },
      { id: 1, img: one, stat: "back" },
      { id: 2, img: two, stat: "back" },
      { id: 2, img: two, stat: "back" },
      { id: 3, img: three, stat: "back" },
      { id: 3, img: three, stat: "back" },
      { id: 4, img: four, stat: "back" },
      { id: 4, img: four, stat: "back" },
      { id: 5, img: five, stat: "back" },
      { id: 5, img: five, stat: "back" },
      { id: 6, img: six, stat: "back" },
      { id: 6, img: six, stat: "back" },
      { id: 7, img: seven, stat: "back" },
      { id: 7, img: seven, stat: "back" },
      { id: 8, img: eight, stat: "back" },
      { id: 8, img: eight, stat: "back" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "back"; // Flip back to the backside image
        items[prev].stat = "back";   // Flip back to the backside image
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (items[id].stat === "back" && prev === -1) {
      items[id].stat = "active"; // Flip card to front when clicked
      setItems([...items]);
      setPrev(id);
    } else if (items[id].stat === "back") {
      items[id].stat = "active"; // Flip card to front when clicked
      setItems([...items]);
      check(id);
    }
  }

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <Card
          key={index}
          item={item}
          id={index}
          handleClick={handleClick}
          backImage={back} // Pass the back image to the card
        />
      ))}
    </div>
  );
}

export default Cards;
