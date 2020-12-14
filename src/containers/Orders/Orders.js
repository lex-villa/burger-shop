import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                };
                setLoading(false)
                setOrders(fetchedOrders);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });

    }, []);

    return (
        <>
            {orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                )
            })}
        </>
    );
};

export default withErrorHandler(Orders, axios);