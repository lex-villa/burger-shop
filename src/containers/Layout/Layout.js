import React, { useState } from 'react';
import { connect } from 'react-redux';

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
            <Toolbar
                clicked={drawerToggleClicked}
                isAuth={props.isAutheticated}
            />
            <SideDrawer
                closed={sideDrawerClosedHandler}
                open={showSideDrawer}
                isAuth={props.isAutheticated}
            />
            <main className='Content'>
                {props.children}
            </main>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAutheticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);