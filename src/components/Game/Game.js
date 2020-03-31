import React, { Component } from 'react';
import './Game.scss';
import Board from '../Board/Board';
import Modal from '../../UI/Modal/Modal';
import Notification from '../Notification/Notification';

class Game extends Component {
    constructor(props) {
        super(props);
        this.rows = React.createRef();
        this.cols = React.createRef();
        this.state = {
            board: Array(20).fill(null).map(() => new Array(20).fill(null)),
            xIsNext: true,
            rows: 20,
            cols: 20,
            notification: false,
        }
    }

    handleModalClosed = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                notification: false
            }
        })
    }

    handleClick = (row, col, isWin, winner) => {
        if (isWin) {
            alert("Player " + winner + " is won. Reset game to continue!");
        }
        else {
            if (this.state.board[row][col] === null) {
                const copyBoard = this.state.board.slice();
                copyBoard[row][col] = this.state.xIsNext ? 'X' : 'O';
                this.setState(prevState => {
                    return {
                        ...prevState,
                        board: copyBoard,
                        xIsNext: !prevState.xIsNext,
                    }
                });
            }
            else {
                alert("This square has been drawn!");
            }
        }
    }


    lineCheck = (board, isVerticalCheck, rows, cols) => {
        for(let i = 0; i < (isVerticalCheck ? cols : rows); i++) {
            let player1 = 0;
            let player2 = 0;
            let storeLine1 = Array(5).fill(null);
            let storeLine2 = Array(5).fill(null);
            for (let j = 0; j < (isVerticalCheck ? rows : cols); j++) {
                switch(board[(isVerticalCheck ? j : i)][(isVerticalCheck ? i : j)]) {
                    case 'X':
                        player2 = 0;
                        storeLine2.fill(null);
                        storeLine1[player1] = {i: isVerticalCheck ? j : i, j: isVerticalCheck ? i : j};
                        if (++player1 === 5) return {winner: 'X', storeLine: storeLine1.slice()}
                        break;
                    case 'O':
                        player1 = 0;
                        storeLine1.fill(null);
                        storeLine2[player2] = {i: isVerticalCheck ? j : i ,j: isVerticalCheck ? i : j};
                        if (++player2 === 5) return {winner: 'O', storeLine: storeLine2.slice()}
                        break;
                    default:
                        player1 = 0;
                        player2 = 0;
                        storeLine1.fill(null);
                        storeLine2.fill(null);
                        break;
                }
            }
        }
        return null;
    }

    diagonalCheck = (board, mode, rows, cols) => {
        for (let j = (mode ? cols : rows) - 5; j >= 0; j--) {
            let tmp = j;
            let player1 = 0;
            let player2 = 0;
            let storeLine1 = Array(5).fill(null);
            let storeLine2 = Array(5).fill(null);
            for(let i = 0; i < (mode ? cols : rows) - j; i++, tmp++) {
                switch (board[(mode ? tmp : i)][(mode ? i : tmp)]) {
                    case 'X':
                        player2 = 0;
                        storeLine2.fill(null);
                        storeLine1[player1] = {i: mode ? tmp : i, j: mode ? i : tmp};
                        if (++player1 === 5) return {winner: 'X', storeLine: storeLine1.slice()}
                        break;
                    case 'O':
                        player1 = 0;
                        storeLine1.fill(null);
                        storeLine2[player2] = {i: mode ? tmp : i, j: mode ? i : tmp};
                        if (++player2 === 5) return {winner: 'O', storeLine: storeLine2.slice()}
                        break;
                    default:
                        player1 = 0;
                        player2 = 0;
                        storeLine1.fill(null);
                        storeLine2.fill(null);
                        break;
                }
            }
        }
        return null;
    }

    diagonalCheckSub = (board, mode, rows, cols) => {
        for (let j = (mode ? (cols - 1) : (rows - 5)) ; j >= (mode ? 5 : 1); j--) {
            let tmp = j;
            let player1 = 0;
            let player2 = 0;
            let storeLine1 = Array(5).fill(null);
            let storeLine2 = Array(5).fill(null);
            for(let i = (mode ? 0 : (cols - 1)); (mode ? (i <= j) : (i >= j)); (mode ? (i++, tmp--) : (i--, tmp++))) {
                switch (board[(mode ? i : tmp)][(mode ? tmp : i)]) {
                    case 'X':
                        player2 = 0;
                        storeLine2.fill(null);
                        storeLine1[player1] = {i: mode ? i : tmp, j: mode ? tmp : i};
                        if (++player1 === 5) return {winner: 'X', storeLine: storeLine1.slice()}
                        break;
                    case 'O':
                        player1 = 0;
                        storeLine1.fill(null);
                        storeLine2[player2] = {i: mode ? i : tmp, j: mode ? tmp : i};
                        if (++player2 === 5) return {winner: 'O', storeLine: storeLine2.slice()}
                        break;
                    default:
                        player1 = 0;
                        player2 = 0;
                        storeLine1.fill(null);
                        storeLine2.fill(null);
                        break;
                }
            }
        }
        return null;
    }

    checkWinner = board => {
        const lineCheckCol = this.lineCheck(board, true, this.state.rows, this.state.cols);
        const lineCheckRow = this.lineCheck(board, false, this.state.rows, this.state.cols);
        const diagonalCheck1 = this.diagonalCheck(board, true, this.state.rows, this.state.cols);
        const diagonalCheck2 = this.diagonalCheck(board, false, this.state.rows, this.state.cols);
        const diagonalCheckSub1 = this.diagonalCheckSub(board, true, this.state.rows, this.state.cols);
        const diagonalCheckSub2 = this.diagonalCheckSub(board, false, this.state.rows, this.state.cols);

        if (lineCheckCol !== null) {
            return lineCheckCol;
        }
        if (lineCheckRow !== null) {
            return lineCheckRow;
        }
        if (diagonalCheck1 !== null) {
            return diagonalCheck1;
        }
        if (diagonalCheck2 !== null) {
            return diagonalCheck2;
        }
        if (diagonalCheckSub1 !== null) {
            return diagonalCheckSub1;
        }
        if (diagonalCheckSub2 !== null) {
            return diagonalCheckSub2;
        }
        return null;
    }

    handleReset = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                board: Array(prevState.rows).fill(null).map(() => new Array(prevState.cols).fill(null)),
                xIsNext: true,
                notification: false
            }
        });
    }

    checkDraw = () => {
        return (this.state.board.map(e => e.some(el => el === null))).some(item => item === true);
    }

    handleOk = () => {
        const rows = !this.rows.current.value ? this.state.rows : parseInt(this.rows.current.value);
        const cols = !this.cols.current.value ? this.state.cols : parseInt(this.cols.current.value);

        const newBoard = Array(rows).fill(null).map(() => new Array(cols).fill(null));

        this.setState(prevState => {
            return {
                ...prevState,
                board: newBoard.slice(),
                xIsNext: true,
                rows,
                cols
            }
        })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleOk();
        }
    }

    render() {
        const isNoti = !this.checkDraw();
        const checkWinner = this.checkWinner(this.state.board); 
        let result = null;
        let isWin = false;
        if (checkWinner !== null) {
            result = checkWinner.winner;
            isWin = true;
            console.log(checkWinner.storeLine);
        }

        return (
            <div className="Game">
                <Modal show={this.state.notification || isNoti} modalClosed={this.handleModalClosed}>
                    <Notification resetBoard={this.handleReset} />
                </Modal>
                <div className="Game-board">
                    <Board 
                        board={this.state.board} 
                        onClick={(row, col, isWin, winner) => this.handleClick(row, col, isWin, winner)}
                        isWin={isWin}
                        highlight={checkWinner ? checkWinner.storeLine : null} 
                        winner={result}    
                        />
                </div>
                <div className="Output">
                    <div className="Game-info">
                        <p>Winner is player {result}</p>
                    </div>

                    <div>
                        <button className="Button Success" onClick={this.handleReset}>Reset</button>
                    </div>

                    <div>
                        <input placeholder="rows (default: 20)" type="number" ref={this.rows} onKeyDown={this.handleKeyDown}/>
                        <input placeholder=" cols (default: 20)" type="number" ref={this.cols} onKeyDown={this.handleKeyDown}/>
                        <button className="Button Success" onClick={this.handleOk}>Ok</button>
                    </div>
                </div>
            </div>
            
                    
        );
    }
}

export default Game;