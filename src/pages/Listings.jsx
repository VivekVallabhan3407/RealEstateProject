import React, { useEffect, useState } from "react";
import propertyListings from "../data/properties.json";
import { assets } from "../assets/assets.js";
import { useLocation } from "react-router-dom";

const Listings = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const type = query.get("type");     // buy / rent
  const city = query.get("location"); // optional city

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let result = propertyListings;

    // Filter by type
    if (type) {
      result = result.filter((p) => p.type === type);
    }

    // Filter by city
    if (city && city.trim() !== "") {
      result = result.filter((p) =>
        p.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    setFiltered(result);
  }, [type, city]);

  return (
    <div className="pt-28 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="shadow-lg rounded-lg overflow-hidden bg-white"
            >
              <img
                src={assets[item.image]}
                className="w-full h-48 object-cover"
                alt={item.name}
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.city}</p>
                <p className="text-blue-600 font-bold mt-2">{item.price}</p>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
