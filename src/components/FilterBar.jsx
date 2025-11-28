import React, { useMemo } from "react";

function FilterBar({ showType = true, currentFilters = {}, onChange, properties = [] }) {

  // generate unique sorted cities
  const cities = useMemo(() => {
    const s = new Set();
    properties.forEach((p) => s.add(p.city));
    return Array.from(s).sort();
  }, [properties]);

  // sanitize number input
  const parsePrice = (v) => {
    if (!v) return "";
    return v.toString().replace(/[^\d]/g, "");
  };

  // update filter state
  const handle = (key, value) => {
    onChange({ ...currentFilters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow px-4 py-3 mb-6 flex flex-col md:flex-row gap-3 items-center">

      {showType && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium mr-2">Type</label>
          <select
            value={currentFilters.type || ""}
            onChange={(e) => handle("type", e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
      )}

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium mr-2">City</label>
        <select
          value={currentFilters.city || ""}
          onChange={(e) => handle("city", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium mr-2">Bedrooms</label>
        <select
          value={currentFilters.bedrooms || ""}
          onChange={(e) => handle("bedrooms", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4+ BHK</option>
        </select>
      </div>

      {/* Property Type Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium mr-2">Property Type</label>
        <select
          value={currentFilters.propertyType || ""}
          onChange={(e) => handle("propertyType", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
        </select>
      </div>


      <div className="flex items-center gap-2">
        <label className="text-sm font-medium mr-2">Price (min)</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={currentFilters.minPrice || ""}
          onChange={(e) => handle("minPrice", parsePrice(e.target.value))}
          className="border rounded px-3 py-2 w-24"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium mr-2">Price (max)</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder=""
          value={currentFilters.maxPrice || ""}
          onChange={(e) => handle("maxPrice", parsePrice(e.target.value))}
          className="border rounded px-3 py-2 w-24"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm font-medium mr-2">Sort</label>
        <select
          value={currentFilters.sort || ""}
          onChange={(e) => handle("sort", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

    </div>
  );
}

// export component at the end (cleaner)
export default FilterBar;
