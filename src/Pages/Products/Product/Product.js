import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faLocationDot, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import useRole from '../../customHook/useRole';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Product = ({ product, setClothe }) => {


    console.log(product);

    const { user } = useContext(AuthContext)

    const { _id, productName, image, location, originalPrice, resalePrice, postTime, sellerName, verified, yearOfPurchase, description, condition, saleStatus, phone } = product;

    console.log(verified);

    const nowYear = new Date().getFullYear()

    const yearOfUse = nowYear - yearOfPurchase

    const [role] = useRole(user?.email)

    console.log(user?.email ? 1 : 0);
    console.log((role?.role === 'Seller' && (user?.email ? 1 : 0)) || (user?.email ? 1 : 0));


    const [sellers, setSellers] = useState([])


    useEffect(() => {
        fetch('https://puranclothes.vercel.app/allSellers', {
            headers: {
                authorization: `bearer ${localStorage.getItem('clotheToken')}`
            }
        })
            .then(res => res.json())
            .then(sellers => setSellers(sellers))
            .catch(error => {
                toast.error(error.message)
            })
    }, [])






    const handleReportedItems = id => {

        const reportedItems = {
            productName,
            image,
            sellerName,
            sellerEmail: product.sellerEmail
        }

        fetch(`https://puranclothes.vercel.app/reportedItems`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(reportedItems)
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Reported successfully")

                } else {
                    toast.error("Something is wrong")
                }
            })
            .catch(error => toast.error(error.message))
    }

    if (saleStatus === 'Sold') {
        return
    }

    return (

        <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative my-4">

            <img class="p-8 rounded-t-lg" src={image} alt="product" />

            {/* sale status  */}
            {
                saleStatus === 'Available' ? <div className=' badge bg-green-600 absolute right-4'>{saleStatus}</div>
                    :
                    <div className=' badge bg-red-600 absolute right-4'>{saleStatus}</div>
            }

            <div class="px-5 my-7">

                <div className='flex justify-between items-center'>

                    <h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{productName}</h5>

                    <p class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{postTime}</p>
                </div>


                <div class="my-2 mb-4 ">

                    <div className='flex justify-between items-center my-2'>
                        <div>
                            <p>
                                <span className='font-bold mr-3 capitalize'>{sellerName}</span>

                                {
                                    verified ? <FontAwesomeIcon className='text-blue-400' icon={faCheckCircle} /> : ''
                                }
                            </p>
                            <p>
                                {phone}
                            </p>
                        </div>

                        <p >
                            <FontAwesomeIcon className='text-blue-400 mr-3' icon={faLocationDot} />

                            <span>{location}</span>
                        </p>
                    </div>

                </div>



                <div class="my-2">
                    <h3 className='text-xl font-bold text-orange-400 mb-3'>Description:</h3>
                    <div className='flex justify-between items-center'>
                        <p class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{description}</p>
                    </div>
                </div>

                <div class="my-2">

                    <div className='flex justify-between items-center'>
                        <div>
                            <h3 className='text-xl font-bold text-orange-400 mb-3'>Condition:</h3>
                            <p class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{condition}</p>
                        </div>

                        <div>
                            <button onClick={() => handleReportedItems(_id)} className="btn btn-sm border-0 bg-red-600 gap-2">
                                Report
                                <FontAwesomeIcon className='mr-3' icon={faDeleteLeft} />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="my-4  pb-5 flex justify-between items-center">
                    <p>Original price: <span className='font-bold text-orange-400'>${originalPrice}</span></p>

                    <p>Years of use: <span className='font-bold text-orange-400'>{yearOfUse}</span></p>
                </div>

                <div class="flex items-center justify-between">
                    <span class="text-3xl text-orange-400 font-bold text-gray-900 dark:text-white">${resalePrice}</span>
                    <label disabled={(role?.role === 'Seller' && (user?.email ? 1 : 0)) || !(user?.email ? 1 : 0)} htmlFor='my-modal-3' onClick={() => setClothe(product)} class=" btn border-0 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-blue-500 dark:focus:ring-orange-600">Book Now</label>
                </div>



            </div>
        </div>

    );
};

export default Product;