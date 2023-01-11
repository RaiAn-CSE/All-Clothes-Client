import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const ErrorPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <h3 className='text-red-500 font-bold text-2xl'>404</h3>
                <p className='font-bold mx-3 text-center'>Ooh No! Your searching page is not found</p>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;