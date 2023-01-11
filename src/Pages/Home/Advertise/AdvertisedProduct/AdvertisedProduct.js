import React from 'react';

const AdvertisedProduct = ({ product, setClothe }) => {
    const { image, resalePrice, location, productName, saleStatus } = product;

    if (saleStatus === 'Sold') {
        return;
    }
    return (
        <div className="card bg-base-100 shadow-xl my-3">
            <figure><img src={image} alt="advertise img" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {productName}
                    <div className="badge badge-success">Available</div>
                </h2>
                <p>{location}</p>
                <div className="text-3xl font-bold text-orange-400">
                    Price:
                    ${resalePrice}
                </div>
            </div>
        </div>
    );
};

export default AdvertisedProduct;