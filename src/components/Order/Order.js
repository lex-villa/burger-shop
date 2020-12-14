import React from 'react';

import './Order.css';

const Order = (props) => {
    const { ingredients, price } = props;

    //This is how you can transform an object to an array.
    const ingredientsArray = [];

    for (let ingredientName in ingredients) {
        ingredientsArray.push({
            name: ingredientName,
            amount: ingredients[ingredientName],
        });
    };
    //

    const ingredientOutput = ingredientsArray.map(ingredient => {
        return (
            <span
                key={ingredient.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}
            >
                {ingredient.name} ({ingredient.amount})
            </span>
        );
    });

    return (
        <div className='Order'>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;