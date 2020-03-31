import React from 'react';
import Row from '../Row/Row';

const Board = (props) => {
    const rows = props.board.map((row, index) => {
        return <Row 
            cells={row}
            key={index}
            index={index}
            board={props.board}
            onClick={(row, col, isWin, winner) => props.onClick(row, col, isWin, winner)}
            isWin = {props.isWin}
            highlight = {props.highlight}
            winner = {props.winner}
            />
    });
    
    return (
        rows
    );
}

export default Board;