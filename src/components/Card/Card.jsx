import React from "react";
import styles from "./Card.module.css";

export function Card({ name, species, gender, image }) {
  return (
    <div className={styles.divCards}>
      <div className={styles.divCard}>
        <img className={styles.img} src={image} alt={name} />
        <div className={styles.divImg}>
          <h2 className={styles.name}>{name}</h2>
        </div>
        <div className={styles.divProps}>
          <h2 className={styles.cardProps}>{species}</h2>
          <h2 className={styles.cardProps}> |</h2>
          <h2 className={styles.cardProps}>{gender}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
