import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const ok = login(email, password);
        if (ok) {
            toast.success("Login successful!", { autoClose: 1500 });
            navigate("/");
        } else {
            toast.error("Invalid Credentials", { autoClose: 1500 });
        }
    };

    return (
        <div className="pt-32 flex justify-center px-4">
            <div className="bg-white shadow-lg p-8 rounded-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
