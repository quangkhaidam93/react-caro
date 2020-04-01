import React from 'react';
import './Square.scss';

const Square = (props) => {
    let color = false;

    if(props.isWin === true) {
        console.log(props.row);
        for (let i = 0; i < props.highlight.length; i++) {
            if(props.highlight[i].i === props.row && props.highlight[i].j === props.col) {
                color = true;
            }
        }
    }

    let className = color ? "HighLight" : "Square";

    if (props.value === "X") {
        className = className + " ColorX";
    }

    if (props.value === "O") {
        className = className + " ColorO";
    }

    return (
        <button className={className} onClick={() => props.onClick(props.row, props.col, props.isWin, props.winner)}>
            {props.value}
        </button>
    )
}

export default Square;