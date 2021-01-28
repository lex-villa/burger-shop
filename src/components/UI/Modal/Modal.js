import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = (props) => {
    const { isShown, modalClosed } = props;

    return (
        <>
            <Backdrop isShown={isShown} isClicked={modalClosed} />
            <div
                className='Modal'
                style={{
                    transform: isShown ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: isShown ? '1' : '0',
                }}
            >
                {props.children}
            </div>
        </>
    );
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.isShown === prevProps.isShown && nextProps.children === prevProps.children;
});