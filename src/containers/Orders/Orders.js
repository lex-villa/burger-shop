import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const { onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders();
    }, [onFetchOrders]);

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));