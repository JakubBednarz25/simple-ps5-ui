import React from "react";

import styles from "./GameDescription.module.css";

const GameDescription = ({ icon }) => {
  return (
    <div className={styles.descriptContainer}>
      <img src={icon.gameText} />
      <p>{icon.name}</p>
      <div className={styles.buttonContainer}>
        <a className={styles.playButton}>Play</a>
        <a className={styles.ellipsesButton}>...</a>
      </div>
    </div>
  );
};

export default GameDescription;
