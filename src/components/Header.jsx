import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import Navbar from './Navbar';



const Header = () => {

  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("buy");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const type = selectedType;
    const loc = location.trim();

    const queryParams = new URLSearchParams();
    queryParams.append("type", type);

    if ((loc) != "") {
      queryParams.append("location", loc);
    }

    navigate(`/properties?${queryParams.toString()}`);
  }
  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden' style={{ backgroundImage: "url('/header_img.png')" }} id='Header'>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'
      >
        <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20'>
          Explore homes that fit your dreams
        </h2>

        {/* 🔍 SEARCH BAR SECTION */}
        <div className="mt-10 bg-white rounded-xl p-4 flex flex-col sm:flex-row justify-center items-center gap-3 text-black shadow-lg max-w-2xl mx-auto">

          {/* Buy / Rent Toggle */}
          {/* Toggle Buttons */}
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setSelectedType("buy")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedType === "buy" ? "bg-blue-500 text-white shadow" : "text-gray-700"
                }`}
            >
              Buy
            </button>

            <button
              onClick={() => setSelectedType("rent")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedType === "rent" ? "bg-blue-500 text-white shadow" : "text-gray-700"
                }`}
            >
              Rent
            </button>
          </div>


          {/* Location Input */}
          <input
            type="text"
            placeholder="Enter city or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Search
          </button>

        </div>

        {/* Existing Buttons */}
        <div className='space-x-6 mt-16'>
          <a href="#Projects" className='border border-white px-8 py-3 rounded'>Projects</a>
          <a href="#Contact" className='bg-blue-500 px-8 py-3 rounded'>Contact Us</a>
        </div>
      </motion.div>
    </div>
  )
}

export default Header
