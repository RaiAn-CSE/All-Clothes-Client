import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';
import BookModal from './BookModal/BookModal';
import Product from './Product/Product';

const Products = () => {
    const products = useLoaderData()

    const { user } = useContext(AuthContext)

    const navigation = useNavigation()

    const [clothe, setClothe] = useState(null)


    if (navigation.state === 'loading') {
        return <Loading></Loading>
    }

    console.log(products.length);

    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-6'>Products</h1>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-8 my-8'>
                {
                    products.length > 0 ?
                        products.map(product => <Product key={product._id} product={product} setClothe={setClothe}></Product>)
                        :
                        <div>
                            <h1 className='text-xl my-10 font-bold text-orange-400 text-center'>No products are available right now</h1>
                        </div>
                }
            </div>

            <div>


                {
                    clothe &&
                    <BookModal
                        product={clothe}
                        setClothe={setClothe}
                        user={user}
                    ></BookModal>
                }


            </div>
        </div>
    );
};

export default Products;