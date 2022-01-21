import React, { useState, useEffect } from "react";

import styles from "./Main.module.css";

import GameDescription from "./GameDescription";

const sections = [
  {
    icon: "/storeicon.png",
    name: "PlayStation Store",
    bg: "/storebg.jpg",
    id: 1,
  },
  {
    icon: "/explore_icon.png",
    name: "Explore",
    bg: "/explore-bg.jpg",
    id: 2,
  },
  {
    icon: "/spidermanicon.png",
    name: "Spider Man - Miles Morales",
    bg: "/spidermanbg.png",
    game: true,
    gameText: "/spidermantextimg.png",
    id: 3,
  },
  {
    icon: "/demonsoulsicon.jpg",
    name: "Demon Souls",
    bg: "/demonsoulsbg.jpg",
    game: true,
    gameText: "/demonsoulstextimg.png",
    id: 4,
  },
  {
    icon: "/saicon.jpg",
    name: "GTA: San Andreas",
    game: true,
    gameText: "satextimg.png",
    bg: "/sabg.jpg",
    id: 5,
  },
];

const Main = ({ user, setBg }) => {
  let min = sections[0].id;
  let max = sections[sections.length - 1].id;

  const [curSec, setCurSec] = useState(sections[1]);
  const [active, setActive] = useState(2);
  const [transform, setTransform] = useState("0");

  useEffect(() => {
    setBg(sections[1].bg);
    const listener = (e) => {
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        if (active > min) {
          setActive(--active);
        }
      } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        if (active < max) {
          setActive(++active);
        }
      } else if (e.code === "Enter") {
        setCurScreen("main");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    let diff = active - 1;
    diff *= -1;
    let width = 100;
    let padding = 3;
    let margin = 15;
    let user_width = width + 2 * padding + 2 * margin;
    setTransform(diff * user_width);
    console.log(sections[active - 1], sections[active - 1].bg);
    setBg(sections[active - 1].bg);
    setCurSec(sections[active - 1]);
  }, [active]);
  console.log(user);
  return (
    <div className={styles.mainContainer}>
      <img className={styles.batteryController} src={"/battery.png"} />
      <div className={styles.mainHeader}>
        <div className={styles.gamesMedia}>
          <b>Games</b>
          <p>Media</p>
        </div>
        <div className={styles.iconsContainer}>
          <img src={"/search.png"} />
          <img src={"/settings.png"} />
          <div className={styles.profileIcon}>
            <img src={user.imgUrl ? user.imgUrl : ""} />
            <div className={styles.onlineSymbol}></div>
          </div>
          <p>
            {new Date().getHours()}:{new Date().getMinutes()}
          </p>
        </div>
      </div>
      <div
        className={styles.sections}
        style={{ transform: `translateX(${transform}px)` }}
      >
        {sections.map((sec) => (
          <div
            className={`${styles.sect} ${
              active === sec.id ? styles.activeSect : ""
            }`}
          >
            <img src={sec.icon} />
            {active === sec.id ? <p>{sec.name}</p> : ""}
          </div>
        ))}
      </div>
      {curSec.game ? (
        <GameDescription icon={curSec} />
      ) : curSec.id === 2 ? (
        <div className={styles.exploreDescription}>
          <p>Official news from PlayStation | 21/01/2022</p>
          <h1>Ready for a PS5 adventure ?</h1>
          <p className={styles.tallLine}>
            Spiderman Miles Morales is pre-loaded and waiting for you!
          </p>
          <p className={styles.tallLine}>
            Explore the new capabilites of PS5 and feel the world t...
          </p>
          <div className={styles.exploreImages}>
            <img src={"/explore1.png"} />
            <img src={"/explore2.png"} />
            <img src={"/explore3.png"} />
            <img src={"/explore4.png"} />
          </div>
        </div>
      ) : curSec.id === 1 ? (
        <div className={styles.storeDescription}>
          <h1>Welcome to the next generation</h1>
          <p>From the freshest releases to curated collections, there's</p>
          <p>something for everyone.</p>
          <span>Must see</span>
          <div className={styles.gameList}>
            <img src={"/game1.png"} />
            <img src={"/game2.png"} />
            <img src={"/game3.png"} />
            <img src={"/game4.png"} />
            <img src={"/game5.png"} />
            <img src={"/game6.png"} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
