

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("loggedInUser")) || null
    );

    const login = (email, password) => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser) return false;

        if (savedUser.email === email && savedUser.password === password) {
            setUser(savedUser);
            localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
            return true;
        }
        return false;
    };

    const signup = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        localStorage.setItem("loggedInUser", JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
        toast.info("Logged out successfully!", { autoClose: 1500 });

    };

    const updateProfile = (updatedData) => {
        const existing = JSON.parse(localStorage.getItem("user")) || user;

        const newUser = {
            ...existing,
            ...updatedData
        };

        // Save both “registered user” and “currently logged in user”
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        setUser(newUser);
    };


    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
