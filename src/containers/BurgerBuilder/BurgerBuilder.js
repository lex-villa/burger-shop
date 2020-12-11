import React, { useEffect, useState } from 'react';
import axios from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState(null);
    const [totalPrice, setTotalPrice] = useState(4);
    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('https://react-my-burger-5ed71.firebaseio.com/ingredients.json')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                setError(true);
            });
    }, []);

    const updatePurchaseState = (ingredientsParam) => {
        const ingredientsCopy = {
            ...ingredientsParam,
        };
        console.log('parametros de la funcion updatePurchase')
        console.log(ingredientsParam)
        console.log(ingredientsCopy)
        const ingredientsCopyArray = Object.keys(ingredientsCopy);
        const ingredientsCopyArrayValues = ingredientsCopyArray.map(ingKey => {
            return ingredientsCopy[ingKey];
        });
        const sum = ingredientsCopyArrayValues.reduce((sum, curr) => {
            return curr + sum;
        }, 0);
        const isPurchasable = sum > 0;
        console.log(sum)
        console.log(ingredientsCopyArrayValues)
        console.log(isPurchasable)
        setPurchasable(isPurchasable);
    };

    const addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...ingredients,
            [type]: ingredients[type] + 1,
        };

        setIngredients(updatedIngredients);
        setTotalPrice(INGREDIENT_PRICES[type] + totalPrice);
        updatePurchaseState(updatedIngredients);
    };

    const removeIngredientHandler = (type) => {
        if (ingredients[type] <= 0) {
            return;
        };
        const updatedIngredients = {
            ...ingredients,
            [type]: ingredients[type] - 1,
        };

        setIngredients(updatedIngredients);
        setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
        updatePurchaseState(updatedIngredients);
    };

    const purchasingHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        //alert('You continue!');
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            customer: {
                name: 'Alejandro',
                address: {
                    street: 'Hell Street',
                    zipCode: '57794',
                    country: 'Mexico',
                },
                email: 'an@gmail.com',
            },
            deliveryMethod: 'fastest',
        };

        setLoading(true)
        axios.post('/orders.json', order)
            .then(response => {
                setLoading(false);
                setPurchasing(false)
                console.log(response)
            })
            .catch(error => {
                setLoading(false)
                setPurchasing(false)
                console.error(error)
            });
    };

    const disabledInfo = {
        ...ingredients,
    };
    for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSumamry = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (ingredients) {
        burger = (
            <>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={totalPrice}
                    purchasable={purchasable}
                    orderedHandler={purchasingHandler} />
            </>
        );

        orderSumamry = <OrderSummary
            ingredients={ingredients}
            totalPrice={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);