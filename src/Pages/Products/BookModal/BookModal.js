
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookModal = ({ product, setClothe, user }) => {

    const { _id, productName, image, resalePrice, sellerName, sellerEmail } = product;
    console.log(product);



    const { data: buyerBook = [], refetch, isLoading } = useQuery({
        queryKey: ['buyerBook',],
        queryFn: async () => {
            const result = await fetch(`https://puranclothes.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = await result.json()
            return data;
        }
    })



    const handleBooking = (event) => {
        event.preventDefault()


        const searchBookedProduct = buyerBook.find(product => product.productId === _id)

        console.log(searchBookedProduct);
        if (!searchBookedProduct) {

            const form = event.target;
            const phone = form.phone.value;
            const meetingPlace = form.meeting.value;
            console.log(phone, meetingPlace);

            const bookProduct = {
                productName,
                productImage: image,
                sellerName,
                sellerEmail,
                price: resalePrice,
                buyerEmail: user?.email,
                buyerName: user?.displayName,
                phone,
                meetingPlace,
                productId: _id,
                paid: 0
            }

            fetch('https://puranclothes.vercel.app/bookings', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookProduct)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        console.log(data);
                        setClothe(null)
                        toast.success("Booking is confirmed")
                    } else {
                        toast.error(data.message)
                    }
                })
        } else {
            toast.error("You already booked same product")
        }

    }
    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Order now</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-6 mt-10'>

                        <input type="text" disabled value={user?.displayName} className="input input-bordered input-accent w-full max-w-xs" />
                        <input type="text" disabled value={user?.email} className="input input-bordered input-accent w-full max-w-xs" />
                        <input type="text" disabled value={productName} className="input input-bordered input-accent w-full max-w-xs" />
                        <input type="text" disabled value={resalePrice} className="input input-bordered input-accent w-full max-w-xs" />




                        <input name='phone' type="text" placeholder="Enter your phone no" className="input input-bordered input-accent w-full max-w-xs" required />
                        <input name='meeting' type="text" placeholder="Enter meeting location" className="input input-bordered input-accent w-full max-w-xs" required />


                        <input className='btn bg-orange-400 border-0' type="submit" value="SUBMIT" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookModal;