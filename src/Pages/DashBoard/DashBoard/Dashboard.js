import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='my-4 flex flex-col  justify-center items-center'>

            <h1 className='my-4 text-xl font-bold uppercase text-orange-400'>Welcome to dashboard</h1>

            <p className='my-3 text-xl font-bold'>Hi, {user?.displayName}</p>
            <img className='w-20 h-20 rounded-full' src={user?.photoURL} alt="img" />


        </div>
    );
};

export default Dashboard;