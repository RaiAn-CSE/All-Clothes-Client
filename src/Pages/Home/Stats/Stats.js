import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Loading/Loading';

const Stats = () => {

    const { isLoading, data: sellers = [] } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const response = await fetch(`https://puranclothes.vercel.app/allSellers`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = response.json()
            return data;
        }
    })
    const { data: buyers = [] } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            const response = await fetch(`https://puranclothes.vercel.app/allBuyers`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = response.json()
            return data;
        }
    })
    // payments 
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const response = await fetch(`https://puranclothes.vercel.app/payments`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = response.json()
            return data;
        }
    })



    console.log("buyers", buyers);
    console.log("sellers", sellers);

    if (isLoading) {
        return <Loading></Loading>
    }


    return (

        <div className='flex justify-center my-16 '>

            <div className="border grid shadow-lg w-2/3 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                <div className="stat md:border-r-2">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-center">Orders Completed</div>
                    <div className="stat-value text-center">{payments.length}</div>

                </div>

                <div className="stat lg:border-r-2">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-center">Total Buyers</div>
                    <div className="stat-value text-center">{buyers.length}</div>

                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-center">Total Sellers</div>
                    <div className="stat-value text-center">{sellers.length}</div>

                </div>

            </div>
        </div>
    );
};

export default Stats;