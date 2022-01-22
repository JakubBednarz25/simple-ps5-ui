import React, { useState, useEffect } from "react";

import styles from "./Login.module.css";

const users = [
  {
    add_user: true,
    id: 1,
  },
  {
    add_user: false,
    name: "User 1",
    imgUrl: "/pfp1.jpg",
    id: 2,
  },
  {
    add_user: false,
    name: "User 2",
    imgUrl: "/pfp2.jpg",
    id: 3,
  },
];

const Login = ({ setCurScreen, setUser }) => {
  const min = users[0].id;
  const max = users[users.length - 1].id;
  const [active, setActive] = useState(2);
  const [transform, setTransform] = useState("0");
  const [controllerOptions, setControllerOptions] = useState({
    animationDelay: "2s",
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        if (active > min) {
          setControllerOptions({ animationDelay: "0.25s" });
          setActive(--active);
        }
      } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        if (active < max) {
          setControllerOptions({ animationDelay: "0.25s" });
          setActive(++active);
        }
      } else if (e.code === "Enter" && active > 1) {
        setCurScreen("main");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    console.log("State changed: ", active);
    let diff = active - 2;
    diff *= -1;
    console.log(diff);
    let width = 125;
    let padding = 3;
    let margin = 40;
    let user_width = width + 2 * padding + 2 * margin;
    setTransform(diff * user_width);
    setUser(users[active - 1]);
  }, [active]);

  //.controllerImage
  //.optionsContainer img
  return (
    <div className={styles.loginContainer}>
      <h1>Welcome Back to PlayStation</h1>
      <p>Who's using this controller ?</p>
      <div
        className={styles.users}
        style={{ transform: `translateX(${transform}px)` }}
      >
        {users.map((u) => (
          <div
            className={`${styles.user} ${
              active === u.id ? styles.activeUser : ""
            }`}
          >
            {u.add_user ? (
              <>
                <h1>+</h1>
                <h2>Add user</h2>
              </>
            ) : (
              <>
                {active === u.id ? (
                  <img
                    src={"/controller.png"}
                    className={styles.controllerImage}
                    style={controllerOptions}
                  />
                ) : (
                  ""
                )}
                <img src={u.imgUrl} />
                <h2>{u.name}</h2>
                {active === u.id ? (
                  <div className={styles.optionsContainer}>
                    <img src={"/options.png"} style={controllerOptions} />
                    <p style={controllerOptions}>Options</p>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
