import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../Loading/Loading';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const MyProduct = () => {

    const { user } = useContext(AuthContext)

    const { isLoading, refetch, data: myProducts = [] } = useQuery({
        queryKey: ['myproduct'],
        queryFn: async () => {
            const res = await fetch(`https://puranclothes.vercel.app/myproduct?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = res.json()
            return data;
        }
    })





    //delete product
    const handleDelete = id => {

        fetch(`https://puranclothes.vercel.app/deleteProducts/${id}`, {
            method: 'DELETE',

        })
            .then((data) => {
                // console.log(data.status===200);
                if (data.status === 200) {
                    toast.success("Deleted successfully")
                    refetch()
                }

            })
            .catch(error => {
                toast.error(error.message)
            })
    }


    const handleAdvertise = id => {
        fetch(`https://puranclothes.vercel.app/updateAdvertise/${id}`, {
            method: 'PATCH',
            headers: {
                authorization: `bearer ${localStorage.getItem('clotheToken')}`
            }
        })
            .then((data) => {
                console.log(data);
                if (data.status === 200) {
                    toast.success("Advertised successfully")
                    refetch()
                }
            })
            .catch(error => {
                toast.error(error.message)
            })

    }

    console.log(myProducts);

    if (isLoading) return <Loading></Loading>



    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-6'>My product</h1>

            <div className='mx-5'>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Advertise</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                myProducts.map((product, index) => <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                            </div>
                                        </div>
                                    </td>


                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={product.image} alt="product" />
                                            </div>
                                        </div>
                                    </td>

                                    <td>{product.resalePrice}</td>

                                    <td>{product.saleStatus}</td>

                                    <td>
                                        <button disabled={product.advertise} onClick={() => { handleAdvertise(product._id) }} className="btn btn-xs bg-yellow-500 border-0">Advertise</button>
                                    </td>

                                    <th>
                                        <button onClick={() => { handleDelete(product._id) }} className="btn bg-red-500 border-0 btn-xs">Delete</button>
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

export default MyProduct;