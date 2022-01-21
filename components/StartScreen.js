import React, { useState, useEffect } from "react";

import styles from "./StartScreen.module.css";

const StartScreen = ({ setCurScreen }) => {
  const [logoStyle, setLogoStyle] = useState({});
  const [ringOneStyle, setRingOneStyle] = useState({});
  const [ringTwoStyle, setRingTwoStyle] = useState({});

  const clickLogo = () => {
    setLogoStyle({ transform: "scale(0.75)", backgroundColor: "gray" });
    setRingOneStyle({ borderWidth: "2px", opacity: "1" });
    setRingTwoStyle({
      transitionDuration: "1.5s",
      height: "150px",
      width: "150px",
      opacity: "0",
    });
  };

  useEffect(() => {
    console.log(logoStyle, ringOneStyle, ringTwoStyle);
  }, [logoStyle, ringOneStyle, ringTwoStyle]);

  return (
    <div className={styles.startScreen}>
      <p>Press the PS button on your controller.</p>
      <div
        onClick={() => {
          clickLogo();
        }}
        className={styles.logoContainer}
        style={logoStyle}
        onTransitionEnd={() => {
          setLogoStyle({ transform: "scale(1.0)", backgroundColor: "#fff" });
        }}
      >
        <img src="/logo.png" />
        <div
          className={styles.ringOne}
          style={ringOneStyle}
          onTransitionEnd={() => {
            setRingOneStyle({ opacity: "0" });
            setCurScreen("login");
          }}
        ></div>
        <div
          className={styles.ringTwo}
          style={ringTwoStyle}
          onTransitionEnd={() => {
            setRingTwoStyle({
              height: "60px",
              width: "60px",
              transitionDuration: "0s",
            });
          }}
        ></div>
      </div>
    </div>
  );
};

export default StartScreen;
