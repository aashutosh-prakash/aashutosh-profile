import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./game.module.scss";
import { useInterval } from "../../../customHooks/useInterval";
import Button from "../../atoms/Button";
import Heading from "../../atoms/Heading";
import BackButton from "../../atoms/BackButton";
import { throttleFunction } from "../../../jsUtils";
import { useDarkMode } from "../../../customHooks/useDarkMode";

const content = {
  heading: "Brain Feast",
  description: "This game is developed in ReactJS.",
  instruction: "Play using the arrow keys OR touch & drag.🎮",
  startBtn: "START GAME",
  stopBtn: "PAUSE GAME",
};

const getRandomInt = (max) => Math.floor(Math.random() * max);
const PLAYER_MOVEMENT_INTERNAL = 55;

const maxPosition = 94;
const minPosition = 0;
export const getValidPosition = (position) => {
  const intPosition = parseInt(position);
  if (intPosition >= maxPosition) {
    return minPosition;
  }
  if (intPosition <= minPosition) {
    return maxPosition;
  }
  if (!intPosition) {
    return 50;
  }
  return intPosition;
};

const Game = () => {
  const [moveDirection, setMoveDirection] = useState("right");
  const [gameSpeed, setGameSpeed] = useState(null);
  const [score, setScore] = useState(0);
  const [foodPosition, setFoodPosition] = useState({ top: "10%", left: "90%" });
  const [lastTouchAxis, setLastTouchAxis] = useState({ x: 0, y: 0 });
  const myStateRef = React.useRef(lastTouchAxis);
  const isDarkTheme = useDarkMode();

  const setLastTouchAxisOutSideListener = (data) => {
    myStateRef.current = data;
    setLastTouchAxis(data);
  };

  const setNewFood = () => {
    // food emoji should between 95% max and 1% min
    const newTop = `${getRandomInt(maxPosition) + 1}%`;
    const newLeft = `${getRandomInt(maxPosition) + 1}%`;
    const foodElm = document.getElementById("food");
    foodElm.style.top = newTop;
    foodElm.style.left = newLeft;
    setFoodPosition({ top: newTop, left: newLeft });
  };
  const checkFood = () => {
    const playerElm = document.getElementById("player");
    const playerTop = parseInt(playerElm.style.top);
    const playerLeft = parseInt(playerElm.style.left);
    const foodTop = parseInt(foodPosition.top);
    const foodLeft = parseInt(foodPosition.left);
    if (
      playerTop >= foodTop - 3 &&
      playerTop <= foodTop + 3 &&
      playerLeft >= foodLeft - 3 &&
      playerLeft <= foodLeft + 3
    ) {
      setNewFood();
      setScore(score + 1);
    }
  };
  const movePlayer = ({ direction, isIncrement }) => {
    const val = isIncrement ? 1 : -1;
    const playerElm = document.getElementById("player");
    if (playerElm) {
      checkFood();
      if (direction === "top") {
        const currentPosition = playerElm.style.top;
        const validPosition = getValidPosition(currentPosition);
        playerElm.style.top = `${validPosition + val}%`;
      } else {
        const currentPosition = playerElm.style.left;
        const validPosition = getValidPosition(currentPosition);
        playerElm.style.left = `${validPosition + val}%`;
      }
    }
  };
  useEffect(() => {
    const gamePlayground = document.getElementById("game-playground");
    document.addEventListener("keydown", handleController);
    gamePlayground.addEventListener("touchmove", throttledTouchEvent, {
      passive: false,
    });
    gamePlayground.addEventListener("touchcancel", handleTouchCancel);
    setNewFood();
    return () => {
      document.removeEventListener("keydown", handleController);
      gamePlayground.removeEventListener("touchmove", throttledTouchEvent);
      gamePlayground.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, []);

  const handleTouchCancel = () => {
    alert("Something went wrong!! Please refresh the page.");
  };

  useInterval(() => {
    switch (moveDirection) {
      case "top":
        movePlayer({ direction: "top", isIncrement: false });
        break;
      case "bottom":
        movePlayer({ direction: "top", isIncrement: true });
        break;
      case "left":
        movePlayer({ direction: "left", isIncrement: false });
        break;
      case "right":
        movePlayer({ direction: "left", isIncrement: true });
        break;
    }
  }, gameSpeed);

  const startGame = () => {
    setGameSpeed(PLAYER_MOVEMENT_INTERNAL);
  };

  const pauseGame = () => {
    setGameSpeed(null);
  };

  const startAndSetMoveDir = (dir) => {
    if (!gameSpeed) {
      startGame();
    }
    setMoveDirection(dir);
  };

  const handleTouch = (e) => {
    if (e.touches) {
      const { x, y } = myStateRef.current;
      const userX = Math.floor(e.touches[0].clientX);
      const userY = Math.floor(e.touches[0].clientY);
      const xDiff = userX - x;
      const yDiff = userY - y;
      const moveAxisVal = Math.abs(xDiff) > Math.abs(yDiff) ? xDiff : yDiff;
      const isXAxis = Math.abs(xDiff) > Math.abs(yDiff);
      const isIncrement = Math.sign(moveAxisVal) > 0;
      if (isXAxis && isIncrement) {
        startAndSetMoveDir("right");
      } else if (isXAxis && !isIncrement) {
        startAndSetMoveDir("left");
      } else if (!isXAxis && isIncrement) {
        startAndSetMoveDir("bottom");
      } else if (!isXAxis && !isIncrement) {
        startAndSetMoveDir("top");
      }
      setLastTouchAxisOutSideListener({ x: userX, y: userY });
    }
  };

  const throttledTouchEvent = throttleFunction(handleTouch, 30);

  const handleController = (e) => {
    if (e.keyCode) {
      switch (e.keyCode) {
        case 38:
          startAndSetMoveDir("top");
          break;
        case 40:
          startAndSetMoveDir("bottom");
          break;
        case 37:
          startAndSetMoveDir("left");
          break;
        case 39:
          startAndSetMoveDir("right");
          break;
      }
    }
  };
  return (
    <div
      id="game-container"
      className={
        isDarkTheme ? styles.gameContainer__dark : styles.gameContainer__light
      }
    >
      <Head>
        <title>Brain Feast | Aashutosh Prakash</title>
        <meta
          name="description"
          content="Brain Feast — a small ReactJS game on Aashutosh Prakash's profile."
        />
      </Head>
      <BackButton isDarkTheme={isDarkTheme} />
      <Heading content={content.heading} Type="h1" />
      <p className={styles.description}>{content.description}</p>
      <p className={styles.instruction}>{content.instruction}</p>
      <output className={styles.result}>🏆 Score: {score}</output>
      <div className={styles.screen} id="game-playground">
        <div id="player" className={styles.player}>
          🧠
        </div>
        <div id="food" className={styles.food}>
          📚
        </div>
      </div>
      <div className={styles.playControl}>
        <Button
          content={content.stopBtn}
          type="button"
          handler={pauseGame}
          variant="game"
          addClasses={styles.pauseBtn}
        />
      </div>
    </div>
  );
};

export default Game;
