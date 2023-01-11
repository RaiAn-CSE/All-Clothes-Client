import React, { useContext } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useRole from '../Pages/customHook/useRole';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [role] = useRole(user?.email)
    console.log(role);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <label htmlFor="my-drawer-2" className="btn btn-base border-0 m-10 bg-orange-400 drawer-button lg:hidden">Sidebar</label>

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-orange-100 text-base-content">

                        {/* admin  */}
                        {
                            role?.isAdmin ? <>
                                <li className='bg-orange-200 rounded-lg mb-2'><Link to='/dashboard/allseller'>All Seller</Link></li>

                                <li className='bg-orange-200 rounded-lg mb-2'><Link to='/dashboard/allbuyer'>All Buyer</Link></li>

                                <li className='bg-orange-200 rounded-lg mb-2'><Link to='/dashboard/reportedItems'>Reported items</Link></li>
                            </>
                                : ''
                        }

                        {/* seller  */}

                        {
                            (!role?.isAdmin && role?.role === 'Seller') &&
                            <>
                                <li className='bg-orange-200 rounded-lg mb-2'><Link to='/dashboard/addProduct'>Add product</Link></li>
                                <li className='bg-orange-200 rounded-lg mb-2'><Link to='/dashboard/myproduct'>My products</Link></li>
                            </>
                        }

                        {/* buyer  */}
                        {

                            !role?.isAdmin && role?.role === 'User' &&
                            <>
                                <li className='bg-orange-200 rounded-lg mb-2'><Link to='/dashboard/myorders'>My orders</Link></li>
                            </>
                        }




                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;