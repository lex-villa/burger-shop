import React, { useState } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import './ContactData.css';

const ContactData = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState({
        street: '',
        postalCode: '',
    });
    const [loading, setLoading] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: props.ingredients,
            price: props.price,
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
                console.log(response)
                props.history.push('/');
            })
            .catch(error => {
                setLoading(false)
                console.error(error)
            });
    };

    let form = (
        <form>
            <input className='Input' type='text' name='name' placeholder='Your Name' />
            <input className='Input' type='email' name='email' placeholder='Your Email' />
            <input className='Input' type='text' name='street' placeholder='Street' />
            <input className='Input' type='text' name='postal' placeholder='Postal Code' />
            <Button btnType='Success' clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />
    };

    return (
        <div className='ContactData'>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

export default ContactData;