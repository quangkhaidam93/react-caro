import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';

const Alert = (props) => {
    const drawSentence = props.isDraw ? "This game is draw." : null;
    const winSentence = props.isWin ? "Player " + props.winner + " has won." : null;
    const isMovedSentence = props.isMoved ? "This square has been moved." : null;
    const isLimitedSentence = props.isLimited ? "Board min is (5 x 5). Please type diffent number!" : null;
    let button = !props.isMoved ? <Button btnType="Primary" clicked={props.resetBoard}>RESET GAME</Button> : <Button btnType="Danger" clicked={props.closed}>CLOSE</Button>
    button = props.isLimited ? <Button btnType="Danger" clicked={props.closed}>CLOSE</Button> : button;
    return (
        <Aux>
            <div>
                {drawSentence}
                {winSentence}
                {isMovedSentence}
                {isLimitedSentence}
            </div>
            <div>
                {button}
            </div>
        </Aux>
    )
}

export default Alert;