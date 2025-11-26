import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import propertyListings from "../data/properties.json";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [recent, setRecent] = useState([]);
    const navigate = useNavigate();

    // 🚨 SAFETY: Avoid crash if user is null during first renders
    if (!user) {
        return (
            <div className="pt-32 px-4 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    You must be logged in to view your profile.
                </h2>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    useEffect(() => {
        const viewed = JSON.parse(localStorage.getItem("recentViews")) || [];
        const last3 = viewed.slice(-3).reverse();
        setRecent(last3);
    }, []);

    return (
        <div className="pt-32 px-4 max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-4">My Profile</h1>

                <p className="text-lg">
                    <strong>Name:</strong> {user.name}
                </p>
                <p className="text-lg mb-6">
                    <strong>Email:</strong> {user.email}
                </p>

                <div className="flex gap-4 mt-4">
                    <Link
                        to="/wishlist"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        View Wishlist
                    </Link>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Recently viewed */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Recently Viewed Properties</h2>

                {recent.length === 0 ? (
                    <p className="text-gray-600">No properties viewed yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {recent.map((id) => {
                            const property = propertyListings.find((p) => p.id == id);
                            if (!property) return null;

                            return (
                                <Link
                                    key={id}
                                    to={`/property/${id}`}
                                    className="shadow-lg rounded-lg overflow-hidden bg-white"
                                >
                                    <img
                                        src={assets[property.image]}
                                        className="w-full h-32 object-cover"
                                        alt={property.name}
                                    />

                                    <div className="p-3">
                                        <h3 className="font-semibold">{property.name}</h3>
                                        <p className="text-sm text-gray-500">{property.city}</p>
                                        <p className="text-blue-600 font-bold">{property.price}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
