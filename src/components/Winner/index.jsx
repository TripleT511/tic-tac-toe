import React from 'react';
import clsx from 'clsx';
import styles from "./index.module.scss";

export default function Winner(props) {
    const { toggleWinner, whoWin } = props
    return (
    <>
        <div className={clsx(styles.overlay)}>
        </div>
        <div className={clsx(styles.winner)}>
            <div className={clsx(styles.winner__top)}>
                    <p> { whoWin === "X" ? "YOU WON": "CPU WON" }</p>
            </div>
                <div className={clsx(styles.winner__center, {
                [styles.crosswin]: whoWin === "X" ? true : false,
            })}>
                    <strong>{ whoWin === "X" ? <i className="fas fa-times"></i> : whoWin === "O" ? "O" : "" }</strong>
                    <p>TAKE THE ROUND</p> 
            </div>
            <div onClick={toggleWinner} className={clsx(styles.winner__bottom)}>
                <div className={clsx(styles.btn__quit)}>
                    <p>QUIT</p>
                </div>  
                <div className={clsx(styles.btn__next)}>
                     <p>NEXT ROUND</p> 
                </div>         
            </div>
        </div>
    </>)
    ;
}
