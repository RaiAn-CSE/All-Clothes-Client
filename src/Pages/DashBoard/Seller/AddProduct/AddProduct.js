import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../../Loading/Loading';

const AddProduct = () => {

    const { user } = useContext(AuthContext);
    console.log(user);
    const sellerEmail = user.email
    const sellerName = user.displayName;

    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imgKey;
    console.log(imageHostKey);

    const navigate = useNavigate()


    const postTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    const [loading, setLoading] = useState(false)

    const addProduct = data => {
        setLoading(true)
        const image = data.img[0]

        const { category, condition, description, location, originalPrice, phone, productName, resalePrice, yearOfPurchase } = data;


        const categoryId = parseInt(category)

        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {


                if (imgData.success) {
                    const product = {
                        categoryId,
                        productName,
                        condition,
                        description,
                        location,
                        originalPrice,
                        phone,
                        resalePrice,
                        yearOfPurchase,
                        sellerName,
                        saleStatus: 'Available',
                        advertise: 0,
                        verified: 0,
                        postTime,
                        sellerEmail,
                        image: imgData.data.url
                    }

                    fetch(`https://puranclothes.vercel.app/addProduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'

                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {

                                toast.success(`Data is added successfully`)
                                navigate('/dashboard/myproduct')
                                setLoading(false)
                            }
                        })
                        .catch(error => {
                            toast.error(error.message)
                            setLoading(false)
                        })
                }
            })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-5'>Add product</h1>


            <div>
                <form onSubmit={handleSubmit(addProduct)} className='w-3/4 ml-10'>

                    {/* product name  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Product Name</span>
                        </label>
                        <input {...register("productName", { required: true })} aria-invalid={errors.productName ? "true" : "false"} className="input input-bordered w-full " placeholder="Enter your product name" />

                        {errors.productName?.type === 'required' && <p className='text-red-400' role="alert">Product Name is required</p>}

                    </div>

                    {/* product image  */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Photo</span>
                        </label>
                        <input type='file' {...register("img", { required: true })} aria-invalid={errors.img ? "true" : "false"} className="input w-full " />

                        {errors.img?.type === 'required' && <p className='text-red-400' role="alert">Image is required</p>}

                    </div>

                    {/* product category  */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Product Category</span>
                        </label>
                        <select {...register("category", { required: true })} className="select select-accent w-full max-w-xs">
                            <option value={1}>Men's clothe</option>
                            <option value={2}>Women's clothe</option>
                            <option value={3}>Child clothe</option>
                        </select>
                        {errors.category && <span className='text-red-400' role="alert">This field is required</span>}
                    </div>

                    {/* product description  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Product Description</span>
                        </label>
                        <textarea  {...register("description", { required: true })} aria-invalid={errors.description ? "true" : "false"} className="textarea  input-bordered w-full " placeholder="Write something about your product" />

                        {errors.description?.type === 'required' && <p className='text-red-400' role="alert">Product Name is required</p>}

                    </div>

                    {/* condition */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Product Condition</span>
                        </label>
                        <select {...register("condition", { required: true })} className="select select-accent w-full max-w-xs">
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                        {errors.condition && <span className='text-red-400' role="alert">This field is required</span>}
                    </div>

                    {/* years of purchase  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Years of purchase</span>
                        </label>
                        <input {...register("yearOfPurchase", { required: true })} aria-invalid={errors.yearOfPurchase ? "true" : "false"} className="input input-bordered w-full " placeholder="Purchase year" />

                        {errors.yearOfPurchase?.type === 'required' && <p className='text-red-400' role="alert">Field is required</p>}

                    </div>


                    {/* original price  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Original price</span>
                        </label>
                        <input {...register("originalPrice", { required: true })} aria-invalid={errors.originalPrice ? "true" : "false"} className="input input-bordered w-full " placeholder="Enter the products original price" />

                        {errors.originalPrice?.type === 'required' && <p className='text-red-400' role="alert">Field is required</p>}

                    </div>

                    {/* resale price  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Resale price</span>
                        </label>
                        <input {...register("resalePrice", { required: true })} aria-invalid={errors.resalePrice ? "true" : "false"} className="input input-bordered w-full " placeholder="Enter the products resale price" />

                        {errors.resalePrice?.type === 'required' && <p className='text-red-400' role="alert">Field is required</p>}

                    </div>

                    {/* location  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Location</span>
                        </label>
                        <input {...register("location", { required: true })} aria-invalid={errors.location ? "true" : "false"} className="input input-bordered w-full " placeholder="Enter your location such as Dhaka, chattogram etc..." />

                        {errors.location?.type === 'required' && <p className='text-red-400' role="alert">Field is required</p>}

                    </div>

                    {/* mobile no  */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-bold">Phone no</span>
                        </label>
                        <input {...register("phone", { required: true })} aria-invalid={errors.phone ? "true" : "false"} className="input input-bordered w-full " placeholder="Enter your phone no" />

                        {errors.phone?.type === 'required' && <p className='text-red-400' role="alert">Field is required</p>}

                    </div>

                    {/* submit button  */}
                    <input className='btn bg-orange-400 border-0 my-4' type="submit" value="ADD PRODUCT" />



                </form>
            </div>
        </div>
    );
};

export default AddProduct;