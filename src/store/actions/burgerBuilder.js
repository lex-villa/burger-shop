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
    return {
        type: actionTypes.INIT_INGREDIENTS,
    };
};