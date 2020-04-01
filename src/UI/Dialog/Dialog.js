import React from 'react';
import './Dialog.scss';
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const Dialog = (props) => {
    return (
        <Aux>
            <BackDrop show={props.show} clicked={props.modalClosed} />
            <div
                className="Dialog"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    )
}

export default Dialog;