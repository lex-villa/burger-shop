import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';


const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);
    const [loading] = useState(false);
    const [error] = useState(false);

    // useEffect(() => {
    //     axios.get('https://react-my-burger-5ed71.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             setIngredients(response.data);
    //         })
    //         .catch(error => {
    //             setError(true);
    //         });
    // }, []);

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
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...props.ings,
    };
    for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSumamry = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (props.ings) {
        burger = (
            <>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    totalPrice={props.totalPrice}
                    purchasable={updatePurchaseState(props.ings)}
                    orderedHandler={purchasingHandler} />
            </>
        );

        orderSumamry = <OrderSummary
            ingredients={props.ings}
            totalPrice={props.totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    };

    if (loading) {
        orderSumamry = <Spinner />
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));