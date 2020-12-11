import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const { ingredients, purchaseCancelled, purchaseContinued, totalPrice } = props;

    const ingredientStumary = Object.keys(ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {ingredients[ingKey]}
                </li>);
        });

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientStumary}
            </ul>
            <p>Total price: ${totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={purchaseContinued}>CONTINUE</Button>
        </>
    );
};

export default OrderSummary;