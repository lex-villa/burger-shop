import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import './SideDrawer.css';

const SideDrawer = (props) => {
    const { closed, open } = props;

    let attachedClasses = ['SideDrawer', 'Close'];
    if (open) {
        attachedClasses = ['SideDrawer', 'Open'];
    };

    return (
        <>
            <Backdrop isShown={open} isClicked={closed} />
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className='Logo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;