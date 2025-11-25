import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import propertyListings from "../data/properties.json";
import { ToastContainer, toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const PropertyDetails = () => {
  const { id } = useParams();
  const [wishList, setWishList] = useState([]);

  const property = propertyListings.find((p) => p.id === Number(id));


  const toggleWishList = () => {
    setWishList(!wishList);
    if (!wishList) {
      toast.success("Added to wishList",{autoClose: 1500 });
    }
    else {
      toast.info("Removed from wishList",{autoClose: 1500 });
    }
  }
  if (!property) {
    return (
      <div className="pt-28 px-4 md:px-20">
        <h2 className="text-2xl font-semibold">Property not found.</h2>
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 md:px-20 pb-16">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-3">{property.name}</h1>

      {/* City and Price */}
      <p className="text-gray-600 text-lg">{property.city}</p>
      <p className="text-blue-600 font-bold text-2xl mt-2">{property.price}</p>

      {/* Main Image */}
      <img
        src={assets[property.image]}
        alt={property.name}
        className="w-full rounded-lg my-6 max-h-[500px] object-cover shadow"
      />

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

      {/* Contact Section */}
      <div className="flex items-center justify-between mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Contact Seller
        </button>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishList}
          className="text-gray-600 hover:text-blue-600 text-2xl"
        >
          {wishList ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      <ToastContainer position="top-right" />

    </div>
  );
};

export default PropertyDetails;