import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Loading/Loading';

const ReportedItems = () => {

    const { isLoading, data: reportedItems = [], refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            const response = await fetch(`https://puranclothes.vercel.app/reportedItems`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = response.json()
            return data;
        }

    })



    const handleDelete = search => {
        console.log(search);
        fetch(`https://puranclothes.vercel.app/deleteReportedItems?sellerEmail=${search.sellerEmail}&productName=${search.productName}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Deleted successfully")
                    refetch()
                } else {
                    toast.error("Something went wrong")
                }
            })
            .catch(error => toast.error("Something went wrong"))
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-6'>Reported Items</h1>

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
                                <th>Seller Name</th>
                                <th>Seller Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                reportedItems.map((item, index) => <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">

                                            <div>
                                                <div className="font-bold">{item.productName}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={item.image} alt="booked product" />
                                            </div>
                                        </div>

                                    </td>
                                    <td>{item.sellerName}</td>
                                    <td>{item.sellerEmail}</td>

                                    <th>
                                        <button onClick={() => handleDelete(item)} className="btn bg-red-400 border-0 btn-sm">Delete</button>
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

export default ReportedItems;