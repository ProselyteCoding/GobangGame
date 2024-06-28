import "../App.css";
import { useState, useEffect } from "react";

function Board() {
  const rows = [];
  const [boxes, setBoxes] = useState(Array(225).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [condition, setCondition] = useState("Unfinished");
  const [location, setLocation] = useState(0);

  const handleClick = (index) => {
    console.log("a");
    if (boxes[index] === null && condition === "Unfinished") {
      let newBoxes = [...boxes];
      newBoxes[index] = xIsNext ? "X" : "O";
      if (xIsNext) {
        document.getElementById("i" + index).style.backgroundImage =
          "url('../img/black.png')";
        document.getElementById("i" + index).style.backgroundSize = "cover";
        document.getElementById("i" + index).style.position = "relative";
        document.getElementById("i" + index).style.zIndex = "100";
        console.log("i" + index);
      } else {
        document.getElementById("i" + index).style.backgroundImage =
          "url('../img/white.png')";
        document.getElementById("i" + index).style.backgroundSize = "cover";
        document.getElementById("i" + index).style.position = "relative";
        document.getElementById("i" + index).style.zIndex = "100";
        console.log("i" + index);
      }
      setBoxes(newBoxes);
      setXIsNext(!xIsNext);
      setLocation(index);
    }
    console.log(boxes);
  };

  useEffect(() => {
    function Judge() {
      function cal(t) {
        let l = location;
        let req1, req2;
        let n = 0,
          s = 0;
        if (t === 1) {
          //左右
          req1 = l - t >= 0 && Math.floor((l - t) / 15) === Math.floor(l / 15);
        } else if (t === 16) {
          //左上右下
          req1 = l % 15 >= 1 && l - t >= 0;
        } //右上左下
        else {
          req1 = l - t >= 0 && l % 15 <= 13;
        }

        while (boxes[l - t] === boxes[l] && req1) {
          l -= t;
          if (t === 1) {
            //左右
            req1 =
              l - t >= 0 && Math.floor((l - t) / 15) === Math.floor(l / 15);
          } else if (t === 16) {
            //左上右下
            req1 = l % 15 >= 1 && l - t >= 0;
          } //右上左下
          else {
            req1 = l - t >= 0 && l % 15 <= 13;
          }
          n++;
          if (n >= 4) {
            setCondition(boxes[location]);
            return true;
          }
        }

        l = location;

        if (t === 1) {
          //左右
          req2 =
            l + t <= 224 && Math.floor((l + t) / 15) === Math.floor(l / 15);
        } else if (t === 16) {
          //左上右下
          req2 = l % 15 <= 13 && l + t <= 224;
        } //右上左下
        else {
          req2 = l + t <= 224 && l % 15 >= 1;
        }

        while (boxes[l + t] === boxes[l] && req2) {
          l += t;
          if (t === 1) {
            //左右
            req2 =
              l + t <= 224 && Math.floor((l + t) / 15) === Math.floor(l / 15);
          } else if (t === 16) {
            //左上右下
            req2 = l % 15 <= 13 && l + t <= 224;
          } //右上左下
          else {
            req2 = l + t <= 224 && l % 15 >= 1;
          }
          s++;
          if (s >= 4) {
            setCondition(boxes[location]);
            return true;
          }
        }

        if (n + s >= 4) {
          setCondition(boxes[location]);
          return true;
        }
      }
      cal(1);
      cal(16);
      cal(14);

      return;
    }
    if (boxes[location] !== null) Judge();
  }, [boxes, condition, location]);

  for (let i = 0; i < 15; i++) {
    const cells = [];
    for (let j = 0; j < 15; j++) {
      let index = i * 15 + j;
      if (index === 0) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="nw" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (index === 14) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="ne" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (index === 224) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="se" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (index === 210) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="sw" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (i===0) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="n" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (i === 14) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="s" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (j === 0) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="w" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else if (j === 14) {
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="e" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      } else{
        cells.push(
          <>
            <div id={"i" + index}></div>
            <div className="box" id={index} onClick={() => handleClick(index)}>
              {boxes[index]}
            </div>
          </>
        );
      }
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
          <button
            className="reset"
            onClick={() => {
              setBoxes(Array(225).fill(null));
              setCondition("Unfinished");
              setXIsNext(true);
              setLocation(0);
              document.getElementsByClassName("box").backgroundImage =
                "url('../img/box.png')";
            }}
          >
            Reset
          </button>
        </div>
      );
    } else {
      notice = (
        <div>
          <div className="winner">
            Winner: {condition}
            <br />
            Congratulations!
          </div>
          <button
            className="reset"
            onClick={() => {
              setBoxes(Array(225).fill(null));
              setCondition("Unfinished");
              setXIsNext(true);
              setLocation(0);
            }}
          >
            Reset
          </button>
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
    <div>
      <div className="board">{rows}</div>
      <Notice condition={condition} xIsNext={xIsNext} />
    </div>
  );
}

export default Board;
