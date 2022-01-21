import { useState, useEffect } from "react";

import StartScreen from "../components/StartScreen";
import Login from "../components/Login";
import Main from "../components/Main";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [bg, setBg] = useState("/start-background.gif");
  const [curScreen, setCurScreen] = useState("start");

  const [user, setUser] = useState(undefined);

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bg})` }}>
      {curScreen === "start" ? (
        <StartScreen setCurScreen={setCurScreen} />
      ) : curScreen === "login" ? (
        <Login setCurScreen={setCurScreen} setUser={setUser} />
      ) : curScreen === "main" ? (
        <Main user={user} setBg={setBg} />
      ) : (
        ""
      )}
    </div>
  );
}
