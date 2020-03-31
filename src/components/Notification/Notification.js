import React from 'react';
import Button from '../../UI/Button/Button';

const Notification = (props) => {
    return (
        <div>
            <p>This game is draw</p>
            <Button btnType="Success" clicked={props.resetBoard}>RESET GAME</Button>
        </div>
    )
}

export default Notification;