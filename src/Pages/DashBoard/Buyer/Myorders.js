import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Loading/Loading';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Myorders = () => {

    const { user } = useContext(AuthContext)

    const { isLoading, data: orders = [], refetch } = useQuery({
        queryKey: ['ordersData'],
        queryFn: async () => {
            const res = await fetch(`https://puranclothes.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })

            const data = res.json()
            return data;
        }
    })

    console.log(orders);

    const handleDelete = id => {
        fetch(`https://puranclothes.vercel.app/bookings/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Deleted successfully")
                    refetch()
                } else {
                    toast.error("Something is wrong")
                }
            })
            .catch(error => toast.error(error.message))
    }


    if (isLoading) return <Loading></Loading>


    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-6'>My Orders</h1>

            <div className='mx-5'>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orders.map((order, index) => <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">

                                            <div>
                                                <div className="font-bold">{order.productName}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={order.productImage} alt="booked product" />
                                            </div>
                                        </div>

                                    </td>
                                    <td>{order.price}</td>

                                    <td>
                                        {
                                            !order.paid && <Link to={`/dashboard/payment/${order._id}`}>
                                                <button className="btn bg-blue-400 border-0 btn-sm">Pay</button>
                                            </Link>
                                        }

                                        {
                                            order.paid ? <p className='text-green-600 font-bold text-base'>Paid</p> : ''
                                        }
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(order._id)} className="btn bg-red-400 border-0 btn-sm">Delete</button>
                                    </th>
                                </tr>)
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Myorders;