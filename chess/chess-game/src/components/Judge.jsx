import { useState } from "react";

function Judge({ boxes, xIsNext }) {
    const [condition, setCondition] = useState("Unfinished");

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
            return finalCondition;
        }
    }
    return xIsNext;
}
export default Judge;