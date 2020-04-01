import React from 'react';
import './Button.scss';

const Button = (props) => {
    const className = "Button " + props.btnType;

    return (
        <button 
            className={className}
            onClick={props.clicked}
            disabled={props.disabled}    
        >
                {props.children}
        </button>
    )
}

export default Button;