import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const { onFetchOrders, token } = props;
    useEffect(() => {
        onFetchOrders(token);
    }, [onFetchOrders, token]);

    let orders = <Spinner />
    if (!props.loading) {
        orders = props.orders.map(order => {
            return (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            )
        })
    };

    return (
        <>
            {orders}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));