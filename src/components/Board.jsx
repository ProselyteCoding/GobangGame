import "../App.css";
import { useState, useEffect } from "react";
import Judge from "./Judge.jsx"

function Board() {
    const rows = [];
    const [boxes, setBoxes] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [condition, setCondition] = useState("Unfinished");

    const handleClick = (index) => {
        if (boxes[index] == null) {
            const newBoxes = [...boxes];
            newBoxes[index] = xIsNext ? 'X' : 'O';
            setBoxes(newBoxes);
            setXIsNext(!xIsNext);
        }
    };
    useEffect(() => {
        let result = <Judge boxes={boxes} xIsNext={xIsNext}/>;
        if (result === 'X' || result === 'O') {
            setCondition(result);
        } else {
            setCondition("Unfinished");
        }
    }, [boxes, xIsNext]);
    

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
        rows.push(<div id={'r' + i} className="row">{cells}</div>);
    }

    function Notice({ condition, xIsNext }) {
        let notice;
        if (condition === "Unfinished") {
            notice = (
                <div>
                    <div className="condition">State: Unfinished</div>
                    <div className="turn">Next Turn: {xIsNext ? 'X' : 'O'}</div>
                </div>
            );
        } else {
            notice = (
                <div className="winner">
                    Winner: {condition}!<br />Congratulations!
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