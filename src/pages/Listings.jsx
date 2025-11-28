import React, { useEffect, useState, useMemo } from "react";
import propertyListings from "../data/properties.json";
import { assets } from "../assets/assets.js";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";

const parseNumeric = (priceStr) => {
  if (!priceStr) return 0;
  // remove non-digits, handle "₹", commas, "Lakh", "Cr", "/month"
  const cleaned = priceStr
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .replace(/\/month/g, "")
    .toLowerCase()
    .trim();

  // handle Lakh and Cr conversions
  if (cleaned.includes("cr")) {
    const num = parseFloat(cleaned.replace(/cr/g, "").trim()) || 0;
    return num * 10000000; // 1 Cr = 1e7
  }
  if (cleaned.includes("lakh")) {
    const num = parseFloat(cleaned.replace(/lakh/g, "").trim()) || 0;
    return num * 100000; // 1 Lakh = 1e5
  }
  // plain number
  const num = parseFloat(cleaned) || 0;
  return num;
};

const Listings = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const type = query.get("type");     // buy / rent
  const city = query.get("location"); // optional city

  const [filters, setFilters] = useState({
    type: type || "",
    city: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
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


    if (filters.type && !type) {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters.city) {
      result = result.filter((p) => p.city === filters.city);
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      result = result.filter(p => {
        if (filters.bedrooms === "4") return p.bedrooms >= 4;
        return p.bedrooms == filters.bedrooms;
      });
    }

    // Filter by property type
    if (filters.propertyType) {
      result = result.filter(p =>
        p.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }


    const min = parseNumeric(filters.minPrice);
    const max = parseNumeric(filters.maxPrice);

    if (min) {
      result = result.filter((p) => parseNumeric(p.price) >= min);
    }

    if (max) {
      result = result.filter((p) => parseNumeric(p.price) <= max);
    }

    // === SORTING ===
    if (filters.sort === "price_asc") {
      result = [...result].sort(
        (a, b) => parseNumeric(a.price) - parseNumeric(b.price)
      );
    } else if (filters.sort === "price_desc") {
      result = [...result].sort(
        (a, b) => parseNumeric(b.price) - parseNumeric(a.price)
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [type, city, filters]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="pt-28 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      {/* TEMP- will show the filters later*/}
      <FilterBar
        showType={!type}   // Hide Type filter if user came from homepage search
        currentFilters={filters}
        onChange={setFilters}
        properties={propertyListings}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <img
            src={assets.no_property_found}
            alt="No Property"
            className="w-100 h-80 opacity-70 mb-4"
          />
          <p className="text-lg font-medium">No property found for this filter</p>
        </div>) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentData.map((item) => (
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

              <button
                onClick={() => navigate(`/property/${item.id}`)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded w-full"
              >
                View Details
              </button>


            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center mt-10 gap-2">

        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 border rounded 
             ${currentPage === idx + 1 ? "bg-blue-500 text-white" : ""}`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Listings;
