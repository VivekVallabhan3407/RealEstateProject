import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(form);
        toast.success("Account created successfully!", { autoClose: 1500 });
        navigate("/");
    };

    return (
        <div className="pt-32 flex justify-center px-4">
            <div className="bg-white shadow-lg p-8 rounded-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
