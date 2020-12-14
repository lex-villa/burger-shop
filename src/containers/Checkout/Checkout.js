import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const Checkout = (props) => {
    const [ingredients, setingredients] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            // it has this format ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            };
        };

        setingredients(ingredients);
        setTotalPrice(price);

    }, [])

    const chechoutCancelledHadler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={chechoutCancelledHadler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route
                path={`${props.match.path}/contact-data`}
                render={(props) => (<ContactData ingredients={ingredients} price={totalPrice} {...props} />)} />
        </div>
    );
}

export default Checkout;