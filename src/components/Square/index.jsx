import React from 'react';
import clsx from 'clsx';
import styles from "./index.module.scss";

export default function Square(props) {
  const { value, handleClick, isWin, whoWin } = props;
  
    return <button onClick={handleClick} className={clsx(styles.btn,
    {
      [styles.circle]: value === "X" ? false : true,
      [styles.crosswin]: isWin && whoWin === "X",
      [styles.circlewin]: isWin && whoWin === "O",
    })}>
      {
       value === "X" ? <i className="fas fa-times"></i> : value === "O" ? "O" : ""
      }
  </button>;
}
