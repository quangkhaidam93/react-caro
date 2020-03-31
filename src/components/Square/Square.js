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

    const className = color ? "HighLight" : "Square";

    return (
        <button className={className} onClick={() => props.onClick(props.row, props.col, props.isWin, props.winner)}>
            {props.value}
        </button>
    )
}

export default Square;