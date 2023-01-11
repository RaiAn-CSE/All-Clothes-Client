import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast';
import PaymentImage from '../../../../../Assets/Payment_done/paymentSuccessful.png'

const CheckoutForm = ({ booking }) => {

    const { _id, price, buyerName, buyerEmail, sellerEmail, productName, productId } = booking;
    console.log("booking", productName, sellerEmail);


    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionID, setTransactionId] = useState('')

    const [processing, setProcessing] = useState(false)



    const [clientSecret, setClientSecret] = useState("");



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://puranclothes.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [booking]);


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
            console.log(error);
        } else {
            setCardError('')
        }


        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: productName,
                        email: buyerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess('Payment is Completed successfully')
            setTransactionId(paymentIntent.id)

            //Store info in the db

            const paymentData = {
                productName,
                price,
                buyerEmail,
                buyerName,
                transactionId: paymentIntent.id,
                bookingId: _id,
                productId

            }

            fetch('https://puranclothes.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    // authorization: `bearer ${localStorage.getItem('doctorToken')}`
                },
                body: JSON.stringify(paymentData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.success("Your payment info is stored")
                        setSuccess('Congrats! Your payment is completed')
                        setTransactionId(paymentIntent.id)
                    }
                })

        }

        setProcessing(false)
        console.log('paymentIntent', paymentIntent);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='border border-orange-500 rounded-lg p-4'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'orange',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <button className='btn bg-orange-400 btn-sm border-0 my-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>

            <>
                <p className='text-red-500'>{cardError}</p>
                <div>
                    {
                        success && <div className='my-10'>
                            <div className='flex justify-center'>
                                <img className='' src={PaymentImage} alt="payment img" />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-xl font-bold text-green-500'>{success}</p>
                                <p className='text-sm '>Your transaction id is: <span className='font-bold '>{transactionID}</span></p>
                            </div>
                        </div>
                    }
                </div>
            </>
        </form>
    );
};

export default CheckoutForm;