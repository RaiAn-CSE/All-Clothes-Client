import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast'
import Logo from '../../../Assets/Logo/Logo.png'


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)



    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log out successfully')
            })
            .catch(error => {
                toast.error(error.message)
            })

    }
    const menuItems = <>
        <li>
            <Link to='/' className=" block py-2 pr-4 pl-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" >Home</Link>
        </li>
        <li>
            <Link to='/categories' className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</Link>
        </li>
        <li>
            <Link to='/blog' className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Blog</Link>
        </li>



    </>
    return (
        <div className='w-100 mx-2 xs:mx-7'>

            <div className="navbar flex-col items-start xs:flex-row bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

                            <Link to="/" className="my-4 flex-col md:hidden justify-center items-center">
                                <img src={Logo} className="h-7 md:h-10 " alt="Logo" />
                                <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">Puran Clothes</span>
                            </Link>

                            {menuItems}


                        </ul>


                    </div>
                    <Link to="/" className="flex-col hidden md:block justify-center items-center">
                        <img src={Logo} className="h-7 md:h-10 " alt="Logo" />
                        <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">Puran Clothes</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">

                    <ul tabIndex={0} className=" menu menu-horizontal flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        {menuItems}

                        {
                            user?.email ? <>
                                <li>
                                    <Link to='/dashboard' className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> Dashboard</Link>
                                </li>

                            </> : ""
                        }


                    </ul>
                </div>
                <div className="navbar-end items-start flex-col xs:flex-row xs:items-center xs:mt-2">


                    {
                        user?.email ?

                            <>

                                <div className="avatar online placeholder mr-3">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                        <img src={user?.photoURL} alt="user img" />
                                    </div>
                                </div>
                                <p className='hidden md:block mr-3 font-bold sm:hidden'>
                                    {user?.displayName}
                                </p>

                                <button onClick={handleLogOut} type="button" className="my-3 md:m-0 focus:outline-none  bg-orange-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Log out</button>
                            </>
                            :
                            <Link to='/login'><button type="button" className="focus:outline-none  bg-orange-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Log In</button></Link>
                    }
                </div>
            </div>



        </div>
    );
};

export default Navbar;