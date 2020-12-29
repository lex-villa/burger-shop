import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addingredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_NGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://react-my-burger-5ed71.firebaseio.com/ingredients.json')
                .then(response => {
                    dispatch(setIngredients(response.data));
                })
                .catch(error => {
                    dispatch(fetchIngredientsFailed());
                });
    };
};