import React, { useState } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const drawerToggleClicked = () => {
        // setShowSideDrawer((prevState) => { 
        //     setShowSideDrawer(!prevState);
        // });
        setShowSideDrawer(!showSideDrawer)
    };

    return (
        <>
            <Toolbar clicked={drawerToggleClicked} />
            <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
            <main className='Content'>
                {props.children}
            </main>
        </>
    );
};

export default Layout;