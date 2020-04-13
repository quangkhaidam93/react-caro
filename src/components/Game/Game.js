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
            xIsNext: true,
            rows: 20,
            cols: 20,
            notification: false,
            isWin: false,
            isMoved: false,
            isLimited: false,
            history: [
                {
                    squares: Array(20).fill(null).map(() => new Array(20).fill(null)),
                    pos: {
                        isX: null,
                        row: null,
                        col: null
                    }
                }
            ],
            stepNumber: 0,
            isDesc: false,
            activePosition: {
                isActive: false,
                position: 0
            }
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
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber].squares;
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
            if (current[row][col] === null) {
                const copyBoard = current.map(e => {
                    return e.slice();
                })
                copyBoard[row][col] = this.state.xIsNext ? 'X' : 'O';
                const updatedHistory = [
                    ...history, 
                    {
                        squares: copyBoard, 
                        pos: {
                            isX: this.state.xIsNext ? 'X' : 'O',
                            row: row,
                            col: col
                        }
                    }
                ];

                this.setState(prevState => {
                    return {
                        ...prevState,
                        xIsNext: !prevState.xIsNext,
                        history: updatedHistory,
                        stepNumber: history.length,
                        activePosition: {
                            isActive: false,
                            position: 0
                        }
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
                xIsNext: true,
                notification: false,
                isWin: false,
                history: [
                    {
                        squares: Array(prevState.rows).fill(null).map(() => new Array(prevState.cols).fill(null)),
                        pos: {
                            isX: null,
                            row: null,
                            col: null
                        }
                    }
                ],
                stepNumber: 0,
                isDesc: false,
                activePosition: {
                    isActive: false,
                    position: 0
                }
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
                    history: [
                        {
                            squares: newBoard,
                            pos: {
                                isX: null,
                                row: null,
                                col: null
                            }
                        }
                    ],
                    xIsNext: true,
                    rows : n,
                    cols : n,
                    stepNumber: 0,
                    isDesc: false,
                    activePosition: {
                        isActive: false,
                        position: 0
                    }
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
                history: [
                    {
                        squares: Array(prevState.rows).fill(null).map(() => new Array(prevState.cols).fill(null)),
                        pos: {
                            isX: null,
                            row: null,
                            col: null
                        }
                    }
                ],
                xIsNext,
                notification: false,
                isWin: false,
                stepNumber: 0,
                isDesc: false,
                activePosition: {
                    isActive: false,
                    position: 0
                }
            }
        });
    }

    handleBack = () => {
        const history = this.state.history.slice(0, -1);

        this.setState(prevState => {
            return {
                ...prevState,
                xIsNext: !prevState.xIsNext,
                history,
                stepNumber: prevState.stepNumber - 1
            }
        })
    }

    handleSort = () => {
        if (this.state.isDesc === false) {
            this.setState(
                prevState => {
                    return {
                        ...prevState,
                        isDesc: !prevState.isDesc
                    }
                }
            )
        }
        else {
            this.setState(
                prevState => {
                    return {
                        ...prevState,
                        isDesc: !prevState.isDesc
                    }
                }
            )
        }
    }

    jumpTo = step => {
        this.setState(prevState => {
            return {
                ...prevState,
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                activePosition: {
                    isActive: !prevState.activePosition.isActive,
                    position: step
                }
            }
        });

        console.log(this.state.stepNumber);
    }

    checkDraw = () => {
        const history = this.state.history;
        const current = history[this.state.stepNumber].squares;
        return (current.map(e => e.some(el => el === null))).some(item => item === true);
    }

    isWin = () => {
        const history = this.state.history;
        const current = history[this.state.stepNumber].squares;
        const isConsecutiveLineRows = Caro.isConsecutiveLine(current, false, this.state.rows, this.state.cols);
        if (isConsecutiveLineRows !== null) {
            return {...isConsecutiveLineRows, isWin: true};
        } 
        else {
            const isConsecutiveLineCols = Caro.isConsecutiveLine(current, true, this.state.rows, this.state.cols);
            if (isConsecutiveLineCols !== null) {
                return {...isConsecutiveLineCols, isWin: true};
            }
            else {
                const isConsecutiveDiagonalLeft2RightAbove = Caro.isConsecutiveDiagonalLeft2Right(current, true, this.state.rows, this.state.cols);
                if (isConsecutiveDiagonalLeft2RightAbove !== null) {
                    return {...isConsecutiveDiagonalLeft2RightAbove, isWin: true};
                }
                else {
                    const isConsecutiveDiagonalLeft2RightBelow = Caro.isConsecutiveDiagonalLeft2Right(current, false, this.state.rows, this.state.cols);
                    if (isConsecutiveDiagonalLeft2RightBelow !== null) {
                        return {...isConsecutiveDiagonalLeft2RightBelow, isWin: true};
                    }
                    else {
                        const isConsecutiveDiagonalRight2LeftAbove = Caro.isConsecutiveDiagonalRight2Left(current, true, this.state.rows, this.state.cols);
                        if (isConsecutiveDiagonalRight2LeftAbove !== null) {
                            return {...isConsecutiveDiagonalRight2LeftAbove, isWin: true};
                        } 
                        else {
                            const isConsecutiveDiagonalRight2LeftBelow = Caro.isConsecutiveDiagonalRight2Left(current, false, this.state.rows, this.state.cols);
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
        const history = this.state.history;
        const current = history[this.state.stepNumber].squares;
        const sort = this.state.isDesc ? 'ASCENDING' : 'DESCENDING';
        
        let moves = history.map((step, move) => {
            const asc = move ? 'Go to move #' + move + ' ' + step.pos.isX + ' (row: ' + step.pos.row + ' col: ' + step.pos.col + ')'
            : 'Go to game start';
            let active;
            if (this.state.activePosition.isActive === false) {
                active = move === history.length - 1 ? 'Active' : 'Info';
            }
            else {
                active = this.state.activePosition.position === move ? 'Active' : 'Info';
            }
            return (
                <li key={move}>
                    <Button btnType={active} clicked={() => this.jumpTo(move)}>{asc}</Button>
                </li>
            )
        });

        moves = this.state.isDesc ? moves : moves.reverse();

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
                        board={current} 
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
                    <div>
                        <Button btnType="Primary" clicked={this.handleSort}>
                            {sort}
                        </Button>
                        <div>{moves}</div>
                    </div>
                </div>
            </div>                    
        );
    }
}

export default Game;