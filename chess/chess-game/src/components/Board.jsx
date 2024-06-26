import "../App.css";
import { useState } from "react";
import Judge from "./Judge.jsx"
import Notice from "./Notice.jsx";

function Board() {
    const rows = []; // 用于存储每一行的元素
    const [boxes, setBoxes] = useState(Array(9).fill(null)); // 使用useState来存储每个box的状态
    const [xIsNext,setXIsNext]=useState(true); //   使用useState来存储棋子类型的状态

    // 点击box时更新相应box的状态
    const handleClick = (index) => {
        if(boxes[index]==null) {
        const newBoxes = [...boxes]; // 创建一个新的boxes数组，并复制当前的状态
        if(xIsNext)
        newBoxes[index] = 'X'; // 更新点击的box的状态为'X'
        else
        newBoxes[index] = 'O'; // 更新点击的box的状态为'O'
        setBoxes(newBoxes); // 更新boxes数组的状态
        setXIsNext(!xIsNext); // 棋子类型更新
        if(<Judge boxes={boxes} xIsNext={xIsNext}/>){
            return <Notice condition={<Judge boxes={boxes} xIsNext={xIsNext}/>} xIsNext={null}/>
        }
        else {
            return <Notice condition={"Unfinished"} xIsNext={<Judge boxes={boxes} xIsNext={xIsNext}/>}/>
        }
        }
    };

    // 遍历创建3x3的格子
    for (let i = 0; i < 3; i++) {
        const cells = [];
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // 计算当前box在boxes数组中的索引
            cells.push(
                <button className="box" id={index} onClick={() => handleClick(index)}>
                    {boxes[index]} {/* 显示当前box的状态 */}
                </button>
            );
        }
        rows.push(<div id={'r' + i} className="row">{cells}</div>);
    }

    // 渲染整个棋盘
    return (
        <div className="board">{rows}</div>
    );
}

export default Board;