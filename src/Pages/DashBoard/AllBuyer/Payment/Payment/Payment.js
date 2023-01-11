import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckOut/CheckoutForm';
const Payment = () => {
    const data = useLoaderData()
    const stripePromise = loadStripe(process.env.REACT_APP_PK);

    const { buyerEmail, buyerName, productName, productImage, price } = data;

    console.log(data);

    return (
        <div>
            <h1 className='text-center text-2xl font-bold my-5 '>To buy, Pay Now! Thank you</h1>

            <div className='my-3 flex justify-between items-center bg-green-100'>
                <div className='ml-3'>
                    <p className='font-bold text-xl'>Item Name: {productName}</p>
                    <p className='font-bold text-xl'>Price: {price}</p>
                </div>
                <img className='w-1/3 h-auto' src={productImage} alt="product" />
            </div>

            <div className='m-3 w-2/4 mx-auto my-5'>

                <h1 className='font-bold text-2xl my-8 text-center'>Enter card details</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={data} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;