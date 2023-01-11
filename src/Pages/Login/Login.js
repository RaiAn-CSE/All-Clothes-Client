import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import google from '../../Assets/Google logo/google.svg'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import useToken from '../customHook/useToken';
import Logo from '../../Assets/Logo/Logo.png'
import { useQuery } from '@tanstack/react-query';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { user, logIn, isLoading, googleLogIn, resetPassword } = useContext(AuthContext)

    const location = useLocation()

    const navigate = useNavigate()

    const [signedEmail, setSignedEmail] = useState('')

    const [token] = useToken(signedEmail)

    const from = location?.state?.from?.pathname || '/'

    const [load, setLoad] = useState(false)

    if (token) {
        navigate(from, { replace: true })
    }
    const handleLogIn = data => {
        setLoad(true)
        fetch(`https://puranclothes.vercel.app/users?email=${data.email}&role=${data.userType}`)
            .then(res => res.json())
            .then(serverData => {
                if (serverData.isFound === 'Yes') {
                    logIn(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            setSignedEmail(data.email)

                            setLoad(false)
                            toast.success("Log in successfully")
                        })
                        .catch(error => {
                            toast.error(error.message)
                            setLoad(false)
                        })

                } else {
                    toast.error('User Type is not matched')
                    setLoad(false)
                }
            })
            .catch(error => {
                toast.error("User type is not matched")
                setLoad(false)
            })
    }


    // get all users 
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const result = await fetch(`https://puranclothes.vercel.app/allusers`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('clotheToken')}`
                }
            })
            const data = await result.json()
            return data;
        }
    })

    // google log in 
    const handleGoogleLogIn = () => {
        googleLogIn()
            .then(result => {
                const user = result.user;
                console.log(user);

                const search = allUsers.find(buyer => buyer?.email === user?.email)

                if (!search) {

                    const registeredUser = {
                        name: user?.displayName,
                        email: user?.email,
                        image: user?.photoURL,
                        isAdmin: 0,
                        role: 'User',
                        verified: 0,
                        user
                    }

                    fetch(`https://puranclothes.vercel.app/users`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('clotheToken')}`
                        },
                        body: JSON.stringify(registeredUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            setSignedEmail(user?.email)
                            toast.success(`Data is added successfully`)

                        })
                        .catch(error => {
                            toast.error(error.message)
                        })
                } else {
                    navigate('/')
                }

            })
            .catch(error => toast.error("Something went wrong"))
    }

    //forget password
    const handleResetPassword = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form?.modalEmail?.value;

        if (email) {
            resetPassword(email)
                .then(() => {
                    toast.success("Check your email to reset password")

                })
                .catch(error => {
                    toast.error("Unsuccessfully, password is not reset. please check your email")
                })
        } else {
            toast.error("Please enter your email to reset password")
        }
        form.reset()

    }

    if (isLoading || load) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='flex justify-center my-10'>
                <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit(handleLogIn)} className="space-y-6" >
                        <div className='flex justify-center'>
                            <img className='h-16' src={Logo} alt="logo" />
                        </div>
                        <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">Sign in to Puran Clothe</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            {/* input  */}
                            <input {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="abdur@gmail.com" />
                            {/* error  */}
                            {errors.email?.type === 'required' && <p className='text-red-400' role="alert">Email is required</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                            <input {...register("password", { required: { value: true, message: "Password is required" }, minLength: { value: 6, message: "Password must be 6 characters length" } })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                            {errors.password && <p className='text-red-400' role="alert">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User type</label>

                            <select {...register("userType", { required: true })} className="select select-bordered w-full max-w-xs">
                                <option value="User" >User</option>
                                <option value="Seller">Seller</option>
                            </select>

                            {errors.userType && <span className='text-red-400' role="alert">This field is required</span>}
                        </div>

                        {/* lost password  */}
                        <div className="flex items-start">
                            <label htmlFor="my-modal-3" className=" text-sm text-orange-700 hover:underline dark:text-orange-500">Lost Password?</label>


                        </div>

                        {/* lost password end  */}

                        <div>
                            <button type="submit" className="w-full text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Login to your account</button>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link to="/register" className="text-orange-700 hover:underline dark:text-orange-500">Create account</Link>
                        </div>
                    </form>

                    <div
                        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                        <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>

                    <button onClick={handleGoogleLogIn} className='text-center w-full card flex-row h-11  bg-base-100 border shadow-lg justify-center items-center'>
                        <img className='h-7 mr-2' src={google} alt="google" />
                        Log in with google

                    </button>
                </div>
            </div>

            {/* start modal  */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />

            {/* modall body   */}
            <div className="modal">

                <div className="modal-box relative">
                    <h3 className='text-lg font-bold my-4'>Reset password</h3>
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <form onSubmit={handleResetPassword}>
                        <div>
                            <label htmlFor="modalEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="modalEmail" name='modalEmail' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter your email' required />

                            <input className='btn btn-sm border-0 my-4 bg-orange-400' type="submit" value="Reset" />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;