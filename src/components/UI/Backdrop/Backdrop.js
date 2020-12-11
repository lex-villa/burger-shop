import React from 'react';
import './Backdrop.css';

const Backdrop = (props) => {
    const { isShown, isClicked } = props;

    return (
        isShown ? <div className='Backdrop' onClick={isClicked} ></div> : null
    );
};

export default Backdrop;