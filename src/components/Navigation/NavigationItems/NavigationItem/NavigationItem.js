import React from 'react';
import './NavigationItem.css';

const NavigationItem = (props) => {
    const { link, active } = props;

    return (
        <li className='NavigationItem'>
            <a
                href={link}
                className={active ? 'active' : null}
            >
                {props.children}
            </a>
        </li>
    );
};

export default NavigationItem;