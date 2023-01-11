import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../../../Assets/Banner/banner image.jpg'


const Banner = () => {
    return (
        <div className='flex flex-col-reverse lg:flex-row lg:flex basis-2/4 my-8 mx-8'>
            <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                <div className="title">
                    <h1 className=" text-3xl leading-relaxed uppercase font-extrabold dark:text-white">Welcome to Puran Clothes</h1>
                    <h1 className=" text-xl font-mono leading-relaxed uppercase font-extrabold text-orange-400  dark:text-white">Buy used clothes at cheap rate</h1>
                </div>
                <div>
                    <p className='my-4 text-gray-500 dark:text-gray-400'> Choose your product and place order

                        <br />
                        And you will get your product as soon as possible</p>
                </div>
                <div>
                    <Link to='/categories'><button type="button" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-orange-900">Search</button></Link>
                </div>
            </div>
            <div className=" w-full lg:w-1/2">
                <img className='w-full h-full' src={BannerImage} alt="banner" />
            </div>
        </div>
    );
};

export default Banner;