import React from 'react';
import support from '../../../Assets/Support/support.jpg'

const Support = () => {
    return (
        <div className='my-10 mx-10'>
            <h1 className='text-2xl font-bold mt-10 text-orange-500 text-center'>Support</h1>
            <p className='text-center text-base font-bold mt-2 mb-8'>What we provide</p>
            <div className="card items-center lg:card-side bg-base-100 shadow-xl">
                <div className="w-full sm:w-1/2" ><img src={support} className="w-full" alt="Album" /></div>
                <div className="card-body items-center justify-center">
                    <div>
                        <h2 className="card-title font-sans uppercase text-5xl font-extrabold mb-3">24/7 Support</h2>
                        <p className='font-extralight'>Contact with us from anywhere at any time</p>
                        <p className='font-extralight'>Call at <span className='font-bold'>+8801234567</span></p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Support;