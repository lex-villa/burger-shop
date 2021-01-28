import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export const BurgerBuilder = (props) => {


    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);


    const onIngredientAdded = (ingName) => dispatch(actions.addingredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredientsParam) => {
        const ingredientsCopy = {
            ...ingredientsParam,
        };
        const ingredientsCopyArray = Object.keys(ingredientsCopy);
        const ingredientsCopyArrayValues = ingredientsCopyArray.map(ingKey => {
            return ingredientsCopy[ingKey];
        });
        const sum = ingredientsCopyArrayValues.reduce((sum, curr) => {
            return curr + sum;
        }, 0);

        return sum > 0;
    };

    const purchasingHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        };
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...ings,
    };
    for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSumamry = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (ings) {
        burger = (
            <>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    totalPrice={totalPrice}
                    purchasable={updatePurchaseState(ings)}
                    orderedHandler={purchasingHandler}
                    isAuth={isAuthenticated}
                />
            </>
        );

        orderSumamry = <OrderSummary
            ingredients={ings}
            totalPrice={totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    };

    return (
        <>
            <Modal isShown={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSumamry}
            </Modal>
            {burger}
        </>
    );
};



export default withErrorHandler(BurgerBuilder, axios);