import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = (props) => {
    const { link, exact } = props;

    return (
        <li className='NavigationItem'>
            <NavLink to={link} exact={exact}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;