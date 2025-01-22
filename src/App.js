import Board from "./components/Board";
import clsx from "clsx";
import styles from "./index.module.scss";
import { useState } from "react";
import Square from "./components/Square";
import Winner from "./components/Winner";

function App() {
  const [values, setValues] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState("");
  const [lstWin, setLstWin] = useState([]);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [point, setPoint] = useState({
    you: 0,
    ties: 0,
    cpu: 0,
    count: 0,
  });



  const handleClick = (item, index) => {
    if (winner === "" && !values[index]) {
      const newValues = [...values]; // Tạo bản sao mới của values
      newValues[index] = isNext ? "X" : "O";

      setValues(newValues);
      setHistory((prevHistory) => [...prevHistory, newValues]); // Lưu trạng thái mới vào lịch sử
      setIsNext(!isNext);

      setPoint((prev) => ({
        ...prev,
        count: prev.count + 1,
      }));

      const isWin = calculatorWinner(newValues);
      if (isWin === "X" || isWin === "O") {
        setTimeout(() => {
          setWinner(isWin);
          setPoint((prev) => ({
            ...prev,
            [isWin === "X" ? "you" : "cpu"]: prev[isWin === "X" ? "you" : "cpu"] + 1,
            count: 0,
          }));
          setHistory([Array(9).fill(null)]);
        }, 200);
      }

      if (point.count === 8 && calculatorWinner(newValues) == null) {
        setTimeout(() => {
          setPoint((prev) => ({
            ...prev,
            ties: prev.ties + 1,
            count: 0,
          }));
          setValues(Array(9).fill(null));
          setLstWin([]);
          setHistory([Array(9).fill(null)]);
        }, 200);
      }
    }
  };

  const calculatorWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setLstWin([a, b, c]);
        return squares[a];
      }
    }
    return null;
  };

  const toggleWinner = () => {
    setWinner("");
    setValues(Array(9).fill(null));
    setLstWin([]);
    setHistory([Array(9).fill(null)]);
  };
  const unDo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1); // Loại bỏ bước cuối
      setValues(newHistory[newHistory.length - 1]); // Quay lại trạng thái trước đó
      setHistory(newHistory); // Cập nhật lịch sử
      setIsNext(!isNext);
      setPoint((prev) => ({
        ...prev,
        count: prev.count - 1,
      }));
    } else {
      // Khi không còn lịch sử, reset trạng thái
      setHistory([Array(9).fill(null)]);
      setValues(Array(9).fill(null));
      setIsNext(true);
      setPoint((prev) => ({
        ...prev,
        count: 0,
      }));
    }
  };

  return (
    <div className={clsx(styles.App)}>
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.header__left)}>
          <span>
            <i className="fas fa-times"></i>
          </span>
          <span>O</span>
        </div>
        <div className={clsx(styles.header__center)}>
          <strong>{isNext ? <i className="fas fa-times"></i> : "O"}</strong>
          <span>TURN</span>
        </div>
        <div onClick={unDo} className={clsx(styles.header__right)}>
          <i className="fas fa-redo-alt"></i>
        </div>
      </div>
      <Board>
        {values.map((item, index) => {
          const [a, b, c] = lstWin;
          return (
            <Square
              key={index}
              isWin={index === a || index === b || index === c ? true : false}
              value={values[index]}
              whoWin={winner}
              handleClick={() => handleClick(item, index)}
            />
          );
        })}
      </Board>{" "}
      {winner !== "" && <Winner whoWin={winner} toggleWinner={toggleWinner} />}
      <div className={clsx(styles.footer)}>
        <div className={clsx(styles.footer__left)}>
          <p>X (YOU)</p>
          <strong>{point.you}</strong>
        </div>
        <div className={clsx(styles.footer__center)}>
          <p>TIES</p>
          <strong>{point.ties}</strong>
        </div>
        <div className={clsx(styles.footer__right)}>
          <p>O (CPU)</p>
          <strong>{point.cpu}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
