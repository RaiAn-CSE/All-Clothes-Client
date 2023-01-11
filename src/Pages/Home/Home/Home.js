import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Categories from '../../Categories/Categories/Categories';
import Advertise from '../Advertise/Advertise/Advertise';
import Banner from '../Banner/Banner';
import Stats from '../Stats/Stats';
import Support from '../Support/Support';


const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Advertise></Advertise>

            <Support></Support>
            {
                user?.email ?
                    <div>
                        <h1 className='text-2xl font-bold text-center text-orange-400'>Achievements</h1>
                        <Stats></Stats>
                    </div>
                    : ''
            }
        </div>
    );
};

export default Home;