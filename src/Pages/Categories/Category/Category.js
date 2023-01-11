import React from 'react';
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
    const { categoryId, categoryName, categoryImage, description } = category;

    return (
        <div className="card mx-3 my-3 bg-base-100 shadow-xl">
            <figure><img src={categoryImage} alt="img" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {categoryName}

                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/category/${categoryId}`}>
                        <button className='btn bg-orange-400 border-0'>Explore</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;