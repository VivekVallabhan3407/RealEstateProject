import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import propertyListings from "../data/properties.json";
import {  toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import ContactModal from "../components/ContactModal.jsx";


const PropertyDetails = () => {
  const { id } = useParams();
  const [wishList, setWishList] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const property = propertyListings.find((p) => p.id === Number(id));

  
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishList(list.includes(Number(id)));
  }, [id]);

  useEffect(() => {
    if (!property) return;

    const viewed = JSON.parse(localStorage.getItem("recentViews")) || [];

    const filtered = viewed.filter((v) => v !== property.id);

    filtered.push(property.id);

    localStorage.setItem("recentViews", JSON.stringify(filtered.slice(-10)));
  }, [property]);


  const toggleWishList = () => {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!list.includes(property.id)) {
      list.push(property.id);
      toast.success("Added to Wishlist", { autoClose: 1500 });
    } else {
      list = list.filter(id => id !== property.id);
      toast.info("Removed from Wishlist", { autoClose: 1500 });
    }

    localStorage.setItem("wishlist", JSON.stringify(list));
    setWishList(list.includes(property.id));
  };


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
        <button className="bg-blue-500 text-white px-6 py-2 rounded"
          onClick={() => setContactOpen(true)}>
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

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} property={property} />
    </div>
  );
};

export default PropertyDetails;