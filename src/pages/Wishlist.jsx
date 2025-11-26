import React from "react";
import propertyListings from "../data/properties.json";
import { assets } from "../assets/assets.js";

const Wishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];

    const items = propertyListings.filter(p => list.includes(p.id));

    return (
        <div className="pt-28 px-4 md:px-20">
            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

            {items.length === 0 ? (
                <p className="text-gray-600">No items added.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map(item => (
                        <div key={item.id} className="shadow-lg rounded-lg bg-white">
                            <img src={assets[item.image]} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">{item.city}</p>
                                <p className="text-blue-600 font-bold">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
