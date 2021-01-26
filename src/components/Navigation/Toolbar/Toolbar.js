import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import './Toolbar.css';

const Toolbar = (props) => {
    const { clicked } = props;

    return (
        <header className='Toolbar'>
            <DrawerToggle clicked={clicked} />
            <div className='LogoContainer'>
                <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
};

export default Toolbar;