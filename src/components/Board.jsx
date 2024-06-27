import "../App.css";
import { useState, useEffect } from "react";

function Board() {
  const rows = [];
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [condition, setCondition] = useState("Unfinished");

  const handleClick = (index) => {
    if (boxes[index] == null && condition === "Unfinished") {
      const newBoxes = [...boxes];
      newBoxes[index] = xIsNext ? "X" : "O";
      setBoxes(newBoxes);
      setXIsNext(!xIsNext);
    }
  };

  useEffect(() => {
    function Judge() {
      let finalCondition = condition;

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
        if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
          finalCondition = boxes[a];
          setCondition(finalCondition);
          return;
        }
      }
      return;
    }
    Judge();
  }, [boxes,condition]);

  for (let i = 0; i < 3; i++) {
    const cells = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      cells.push(
        <button className="box" id={index} onClick={() => handleClick(index)}>
          {boxes[index]}
        </button>
      );
    }
    rows.push(
      <div id={"r" + i} className="row">
        {cells}
      </div>
    );
  }

  function Notice() {
    let notice;
    if (condition === "Unfinished") {
      notice = (
        <div>
          <div className="condition">State: Unfinished</div>
          <div className="turn">Next Turn: {xIsNext ? "X" : "O"}</div>
        </div>
      );
    } else {
      notice = (
        <div className="winner">
          Winner: {condition}
          <br />
          Congratulations!
        </div>
      );
    }

    return (
      <div className="notice">
        <div className="boundary">{notice}</div>
      </div>
    );
  }

  return (
    <>
      <div className="board">{rows}</div>
      <Notice condition={condition} xIsNext={xIsNext} />
    </>
  );
}

export default Board;
