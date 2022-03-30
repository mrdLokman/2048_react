import { useState, useEffect } from "react";
import "./styles.css";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function Board(props) {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);

  const [status, setStatus] = useState("Progress");

  useEffect(() => {
    initNewGame();
  }, []);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const initNewGame = () => {
    let newBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var i1 = getRandomInt(3);
    var j1 = getRandomInt(3);
    newBoard[i1][j1] = 2;
    var i2 = getRandomInt(3);
    var j2 = getRandomInt(3);
    if (i1 === i2 && j1 === j2) {
      if (i1 !== 0) i2 = 0;
      else i2 = 3;
    }
    newBoard[i2][j2] = 2;
    setStatus("Progress");
    setBoard(newBoard);
  };

  const getGameStatus = (newBoard) => {
    let isWin = false;
    var i = 0;
    var j = 0;
    while (i < 4 && !isWin) {
      j = 0;
      while (j < 4 && !isWin) {
        isWin = newBoard[i][j] === 2048;
        j++;
      }
      i++;
    }
    if (isWin) return "Win";

    let isLost = true;
    newBoard.forEach((r) => {
      r.forEach((v) => {
        isLost = v !== 0;
      });
    });
    if (isLost) {
      i = 0;
      j = 0;
      while (i < 4 && isLost) {
        j = 0;
        while (j < 4 && isLost) {
          if (i < 3 && isLost) isLost = newBoard[i][j] !== newBoard[i + 1][j];
          if (j < 3 && isLost) isLost = newBoard[i][j] !== newBoard[i][j + 1];
          j++;
        }
        i++;
      }
    }
    if (isLost) return "Lost";

    return "Progress";
  };

  const cloneBoard = (b) => {
    let clone = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var i = 0;
    var j = 0;
    while (i < 4) {
      j = 0;
      while (j < 4) {
        clone[i][j] = b[i][j];
        j++;
      }
      i++;
    }
    return clone;
  };

  const spawnRandom = (newBoard, value) => {
    let emptyCells = [];
    var i = 0;
    var j = 0;
    while (i < 4) {
      j = 0;
      while (j < 4) {
        if (newBoard[i][j] === 0) emptyCells.push(i * 4 + j);
        j++;
      }
      i++;
    }
    const l = emptyCells.length;
    if (l > 0) {
      const random = getRandomInt(l);
      const r = Math.floor(emptyCells[random] / 4);
      const c = emptyCells[random] - r * 4;
      let spawnedBoard = cloneBoard(newBoard);
      spawnedBoard[r][c] = value;
      return spawnedBoard;
    }
    return newBoard;
  };

  const SwipeUp = () => {
    let newBoard = cloneBoard(board);
    newBoard = [
      [0, 4, 8, 2],
      [0, 2, 2, 0],
      [0, 2048, 0, 0],
      [0, 0, 0, 0]
    ];

    const s = getGameStatus(newBoard);
    if (s === "Progress") newBoard = spawnRandom(newBoard, 2);
    setStatus(s);
    setBoard(newBoard);
  };
  const SwipeLeft = () => {
    let newBoard = cloneBoard(board);
    newBoard = [
      [2, 4, 8, 32],
      [4, 16, 2, 16],
      [2, 64, 4, 2],
      [16, 8, 128, 512]
    ];
    const s = getGameStatus(newBoard);
    if (s === "Progress") newBoard = spawnRandom(newBoard, 2);
    setStatus(s);
    setBoard(newBoard);
  };
  const SwipeRight = () => {
    let newBoard = cloneBoard(board);
    newBoard = [
      [2, 8, 8, 32],
      [4, 16, 2, 16],
      [2, 64, 4, 2],
      [16, 8, 128, 512]
    ];
    const s = getGameStatus(newBoard);
    if (s === "Progress") newBoard = spawnRandom(newBoard, 2);
    setStatus(s);
    setBoard(newBoard);
  };
  const SwipeDown = () => {
    let newBoard = cloneBoard(board);

    const s = getGameStatus(newBoard);
    if (s === "Progress") newBoard = spawnRandom(newBoard, 2);
    setStatus(s);
    setBoard(newBoard);
  };

  const handSwipe = (key) => {
    switch (key) {
      case "up":
        SwipeUp();
        break;
      case "left":
        SwipeLeft();
        break;
      case "right":
        SwipeRight();
        break;
      case "down":
        SwipeDown();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          initNewGame();
        }}
        className="newGameButton"
      >
        New Game
      </button>

      <div className="boardContainer">
        <Cell value={board[0][0]} isEmpty={board[0][0] === 0} />
        <Cell value={board[0][1]} isEmpty={board[0][1] === 0} />
        <Cell value={board[0][2]} isEmpty={board[0][2] === 0} />
        <Cell value={board[0][3]} isEmpty={board[0][3] === 0} />
        <Cell value={board[1][0]} isEmpty={board[1][0] === 0} />
        <Cell value={board[1][1]} isEmpty={board[1][1] === 0} />
        <Cell value={board[1][2]} isEmpty={board[1][2] === 0} />
        <Cell value={board[1][3]} isEmpty={board[1][3] === 0} />
        <Cell value={board[2][0]} isEmpty={board[2][0] === 0} />
        <Cell value={board[2][1]} isEmpty={board[2][1] === 0} />
        <Cell value={board[2][2]} isEmpty={board[2][2] === 0} />
        <Cell value={board[2][3]} isEmpty={board[2][3] === 0} />
        <Cell value={board[3][0]} isEmpty={board[3][0] === 0} />
        <Cell value={board[3][1]} isEmpty={board[3][1] === 0} />
        <Cell value={board[3][2]} isEmpty={board[3][2] === 0} />
        <Cell value={board[3][3]} isEmpty={board[3][3] === 0} />
      </div>
      {(status === "Win" && (
        <div className="endGameWin">
          <p className="message">You Have Won</p>
        </div>
      )) ||
        (status === "Lost" && (
          <div className="endGameLost">
            <p className="message">You Have Lost</p>
          </div>
        )) ||
        (status === "Progress" && (
          <KeyboardEventHandler
            handleKeys={["left", "up", "right", "down"]}
            onKeyEvent={(key, e) => handSwipe(key)}
          />
        ))}
    </div>
  );
}

function Cell(props) {
  const { value, isEmpty } = props;
  return (
    <div
      style={
        isEmpty
          ? { ...basicCell, ...emptyCell }
          : { ...basicCell, backgroundColor: coloredValue[value] }
      }
    >
      {!isEmpty && <p className="number">{value}</p>}
    </div>
  );
}

const coloredValue = {
  2: "#B7D4FF",
  4: "#7EB3FF",
  8: "#76FEC5",
  16: "#17F1D7",
  32: "#2398AB",
  64: "#004156",
  128: "#00DC7D",
  256: "#35D073",
  512: "#FED876",
  1024: "#FE9E76",
  2048: "#F85C50"
};

const emptyCell = {
  backgroundColor: "#ece8d7e8"
};

const basicCell = {
  gridColumn: "1fr",
  gridRow: "1fr",
  width: "50px",
  height: "50px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};
