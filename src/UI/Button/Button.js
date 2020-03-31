import React from 'react';
import './Button.scss';

const Button = (props) => {
    const className = "Button " + props.btnType;

    return (
        <button 
            className={className}
            onClick={props.clicked}>
                {props.children}
        </button>
    )
}

export default Button;