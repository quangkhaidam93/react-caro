import React from 'react';
import Square from '../Square/Square';
import './Row.scss';

const Row = (props) => {
    const index = props.index;

    const renderSquare = i => {
        return <Square 
        value={props.board[index][i]} 
        key={index+i} 
        row={index} 
        col={i} 
        onClick={(row, col, isWin, winner) => props.onClick(row, col, isWin, winner)}
        isWin={props.isWin}
        highlight={props.highlight}
        winner={props.winner} />
    }

    const cells = props.cells.map((cell, index) => renderSquare(index))

    return (
        <div className="Board-row">
            {cells}
        </div>
    )
}

export default Row;