import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import mysmem from "../images/mysmem.jpg";
import dragtrea from "../images/dragtrea.jpg";
import wizduel from "../images/wizduel.jpg";
import sorsseq from "../images/sorsseq.jpg";
import RenderImg from "./RenderImg";
import styles from "../styles/main-page.module.css";

function GamesList() {
  return (
    <div className={styles.gameslist} id="games-list">
      <Carousel className={styles.carousel}>
        <Carousel.Item interval={1000} className={styles['carousel-item']}>
          <RenderImg
            src={mysmem}
            alt="Mystic Memories"
            text="First slide"
            className={styles['carousel-img']}
          />
          <Carousel.Caption>
            <p className={styles['carousel-caption']}>
              <Link to="/mystic-memories" className={styles.glink}>
                Play now
              </Link>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000} className={styles['carousel-item']}>
          <RenderImg
            src={wizduel}
            alt="Wizard's Duel"
            text="Second slide"
            className={styles['carousel-img']}
          />
          <Carousel.Caption>
          <p className={styles['carousel-caption']}>
              <Link to="/wizards-duel" className={styles.glink}>
                Play now
              </Link>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles['carousel-item']}>
          <RenderImg
            src={sorsseq}
            alt="Sorcerer's Sequence"
            text="Third slide"
            className={styles['carousel-img']}
          />
          <Carousel.Caption>
          <p className={styles['carousel-caption']}>
              <Link to="/sorcerors-sequence" className={styles.glink}>
                Play now
              </Link>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles['carousel-item']}>
          <RenderImg
            src={dragtrea}
            alt="Dragon's Treasure"
            text="Fourth slide"
            className={styles['carousel-img']}
          />
          <Carousel.Caption>
          <p className={styles['carousel-caption']}>
              <Link to="/dragons-treasure" className={styles.glink}>
                Play now
              </Link>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default GamesList;
