import React, { Component } from 'react';
import './Game.scss';
import Board from '../Board/Board';
import Dialog from '../../UI/Dialog/Dialog';
import Alert from '../Alert/Alert';
import Button from '../../UI/Button/Button';
import * as Caro from '../../Caro/Caro';

class Game extends Component {
    constructor(props) {
        super(props);
        this.n = React.createRef();
        this.selected = React.createRef();
        this.state = {
            board: Array(20).fill(null).map(() => new Array(20).fill(null)),
            xIsNext: true,
            rows: 20,
            cols: 20,
            notification: false,
            isWin: false,
            isMoved: false,
            isLimited: false,
            history: [
                {squares: Array(20).fill(null).map(() => new Array(20).fill(null))}
            ],
            stepNumber: 0
        }
    }

    handleModalClosed = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                notification: false,
                isMoved: false,
                isLimited: false
            }
        })
    }

    handleClick = (row, col, isWin, winner) => {
        if (isWin) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    notification: !prevState.notification,
                    isWin: !prevState.isWin
                }
            })
        }
        else {
            if (this.state.board[row][col] === null) {
                const copyBoard = this.state.board.map(e => {
                    return e.slice();
                })
                copyBoard[row][col] = this.state.xIsNext ? 'X' : 'O';
                const history = this.state.history.slice();
                const updatedHistory = [...history, {squares: copyBoard}];

                this.setState(prevState => {
                    return {
                        ...prevState,
                        board: copyBoard,
                        xIsNext: !prevState.xIsNext,
                        history: updatedHistory,
                        stepNumber: prevState.stepNumber + 1
                    }
                });
            }
            else {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        notification: !prevState.notification,
                        isMoved: !prevState.isMoved
                    }
                })
            }
        }
    }

    handleReset = () => {
        this.selected.current.value = "X";

        this.setState(prevState => {
            return {
                ...prevState,
                board: Array(prevState.rows).fill(null).map(() => new Array(prevState.cols).fill(null)),
                xIsNext: true,
                notification: false,
                isWin: false,
                history: [
                    {squares: Array(prevState.rows).fill(null).map(() => new Array(prevState.cols).fill(null))}
                ],
                stepNumber: 0
            }
        });
    }

    handleENTER = () => {
        const n = !this.n.current.value ? this.state.rows : parseInt(this.n.current.value);

        if (n >= 5) {
            const newBoard = Array(n).fill(null).map(() => new Array(n).fill(null));

            this.setState(prevState => {
                return {
                    ...prevState,
                    board: newBoard.slice(),
                    xIsNext: true,
                    rows : n,
                    cols : n
                }
            })
        }
        else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    notification: !prevState.notification,
                    isLimited: !prevState.isLimit
                }
            })
        }
        
    }

    handleENTERkey = (e) => {
        if (e.key === 'Enter') {
            this.handleENTER();
        }
    }

    handleSelect = () => {
        const selected = this.selected.current.value;
        const xIsNext = selected === 'X' ? true : false;

        this.setState(prevState => {
            return {
                ...prevState,
                board: Array(prevState.rows).fill(null).map(() => new Array(prevState.cols).fill(null)),
                xIsNext,
                notification: false,
                isWin: false
            }
        });
    }

    handleBack = () => {
        const stepNumber = this.state.stepNumber;
        const history = this.state.history.slice(0, -1);
        const historyBoard = this.state.history[stepNumber - 1];
        const board = historyBoard.squares;

        this.setState(prevState => {
            return {
                ...prevState,
                board,
                xIsNext: !prevState.xIsNext,
                history,
                stepNumber: prevState.stepNumber - 1
            }
        })

    }

    checkDraw = () => {
        return (this.state.board.map(e => e.some(el => el === null))).some(item => item === true);
    }

    isWin = () => {
        const isConsecutiveLineRows = Caro.isConsecutiveLine(this.state.board, false, this.state.rows, this.state.cols);
        if (isConsecutiveLineRows !== null) {
            return {...isConsecutiveLineRows, isWin: true};
        } 
        else {
            const isConsecutiveLineCols = Caro.isConsecutiveLine(this.state.board, true, this.state.rows, this.state.cols);
            if (isConsecutiveLineCols !== null) {
                return {...isConsecutiveLineCols, isWin: true};
            }
            else {
                const isConsecutiveDiagonalLeft2RightAbove = Caro.isConsecutiveDiagonalLeft2Right(this.state.board, true, this.state.rows, this.state.cols);
                if (isConsecutiveDiagonalLeft2RightAbove !== null) {
                    return {...isConsecutiveDiagonalLeft2RightAbove, isWin: true};
                }
                else {
                    const isConsecutiveDiagonalLeft2RightBelow = Caro.isConsecutiveDiagonalLeft2Right(this.state.board, false, this.state.rows, this.state.cols);
                    if (isConsecutiveDiagonalLeft2RightBelow !== null) {
                        return {...isConsecutiveDiagonalLeft2RightBelow, isWin: true};
                    }
                    else {
                        const isConsecutiveDiagonalRight2LeftAbove = Caro.isConsecutiveDiagonalRight2Left(this.state.board, true, this.state.rows, this.state.cols);
                        if (isConsecutiveDiagonalRight2LeftAbove !== null) {
                            return {...isConsecutiveDiagonalRight2LeftAbove, isWin: true};
                        } 
                        else {
                            const isConsecutiveDiagonalRight2LeftBelow = Caro.isConsecutiveDiagonalRight2Left(this.state.board, false, this.state.rows, this.state.cols);
                            if (isConsecutiveDiagonalRight2LeftBelow !== null) {
                                return {...isConsecutiveDiagonalRight2LeftBelow, isWin: true};
                            }
                            else {
                                return {isWin: false};
                            }
                        }
                    }
                }
            }
        }
    }

    render() {
        const isDraw = !this.checkDraw();
        const checkWin = this.isWin(); 
        let winner = "";
        const isWin = checkWin.isWin;

        if (isWin === true) {
            winner = checkWin.winner;
        }

        const currentPlayer = this.state.xIsNext ? 'X' : 'O';
        const spanCurrentPlayer = this.state.xIsNext ? "RedSpan" : "BlueSpan";
        const spanWinner = winner === "X" ? "RedSpan" : "BlueSpan";
        const disabled = this.state.stepNumber === 0 ? true : false; 

        return (
            <div className="Game">
                <Dialog show={this.state.notification || isDraw} modalClosed={this.handleModalClosed}>
                    <Alert 
                        resetBoard={this.handleReset} 
                        isWin={this.state.isWin} 
                        isDraw={isDraw}
                        isMoved={this.state.isMoved}
                        isLimited={this.state.isLimited}
                        closed={this.handleModalClosed}
                        winner={winner} />
                </Dialog>
                <div className="Game-board">
                    <Board 
                        board={this.state.board} 
                        onClick={(row, col, isWin, winner) => this.handleClick(row, col, isWin, winner)}
                        isWin={isWin}
                        highlight={isWin ? checkWin.highlight : null} 
                        winner={winner}    
                        />
                </div>
                <div className="Console">
                    <div className="Game-info">
                        <h1>CARO</h1>
                        <h4>Current player <span className={spanCurrentPlayer}>{currentPlayer}</span></h4>
                        <h4>Winner is player <span className={spanWinner}>{winner}</span></h4>
                    </div>

                    <div>
                        <Button btnType="Danger" clicked={this.handleReset}>RESET</Button> 
                    </div>

                    <div>
                        <input 
                            placeholder="default: 20x20" 
                            type="number" 
                            ref={this.n} 
                            onKeyDown={this.handleENTERkey}
                            className="MyInput"
                            min="5"
                            />
                        <Button btnType="Success" clicked={this.handleENTER}>ENTER</Button>
                    </div>
                    <div>
                        <p>Who go first? (Click here will reset game)</p>
                        <select ref={this.selected} className="MyInput">
                            <option value="X">X</option>
                            <option value="O">O</option>
                        </select>
                        <Button btnType="Success" clicked={this.handleSelect}>SELECT</Button>
                    </div>
                    <div className="Game">
                        <p style={{marginRight: 20}}>Step number: {this.state.stepNumber}</p>
                        <Button btnType="Primary" clicked={this.handleBack} disabled={disabled} >BACK</Button>
                    </div>
                </div>
            </div>                    
        );
    }
}

export default Game;