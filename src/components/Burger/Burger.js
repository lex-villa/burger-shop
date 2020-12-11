import React from 'react';

import BurguerIngredient from './BurgerIngredient/BurgerIngredient';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const { ingredients } = props;

    const ingredientsArray = Object.keys(ingredients); // Convierte el onjeto recivido en un Array
    const transformedIngredients = ingredientsArray.map(ingKey => {
        //Array() method te devuelve un array con los espacios que indiques en el parametro
        return [...Array(ingredients[ingKey])].map((_, index) => {
            return <BurgerIngredient key={ingKey + index} type={ingKey} />
        }); 
    });
    let reducedTransformedIngredients = transformedIngredients.reduce((arr, element) => {
        return arr.concat(element);
    }, []);

    if (reducedTransformedIngredients.length === 0) {
        reducedTransformedIngredients = <p>Please start adding Ingredients!!</p>
    };

    return (
        <div className='Burger'>
            <BurguerIngredient type='bread-top' />
                {reducedTransformedIngredients}
            <BurguerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;