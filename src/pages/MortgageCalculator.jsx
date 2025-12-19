import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

const MortgageCalculator = () => {
    const [price, setPrice] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const calculateEMI = () => {
        setError("");
        if (!price || !downPayment || !rate || !years) {
            setError("Please fill in all fields.");
            return;
        }
        if (Number(price) <= 0 || Number(downPayment) < 0 || Number(rate) <= 0 || Number(years) <= 0) {
            setError("Please enter valid positive numbers.");
            return;
        }
        if (Number(downPayment) >= Number(price)) {
            setError("Down Payment should be less than Property Price.");
            return;
        }
        const loanAmount = price - downPayment;
        const monthlyRate = rate / (12 * 100);
        const months = years * 12;

        if (!loanAmount || !monthlyRate || !months) return;

        const emi =
            (loanAmount *
                monthlyRate *
                Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

        const totalPayable = emi * months;
        const totalInterest = totalPayable - loanAmount;

        setResult({
            emi: emi.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            totalPayable: totalPayable.toFixed(2),
        });
        toast.success("EMI calculated successfully");

    };

    const handleReset = () => {
        setPrice("");
        setDownPayment("");
        setRate("");
        setYears("");
        setResult(null);
        setError("");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            {/* Wrapper */}
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Mortgage Calculator
                    </h1>

                    <div className="space-y-4">
                        {/* Property Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Property Price (₹)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 2500000"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        {/* Down Payment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Down Payment (₹)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 500000"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={downPayment}
                                onChange={(e) => setDownPayment(e.target.value)}
                            />
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Interest Rate (% per year)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 8.5"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </div>

                        {/* Loan Tenure */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Loan Tenure (Years)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 20"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm font-medium">
                                {error}
                            </p>
                        )}


                        {/* Primary Action */}
                        <button
                            onClick={calculateEMI}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Calculate EMI
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                            <p className="mb-2">
                                <span className="font-semibold">Monthly EMI:</span> ₹{result.emi}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Total Interest:</span> ₹{result.totalInterest}
                            </p>
                            <p>
                                <span className="font-semibold">Total Amount Payable:</span> ₹{result.totalPayable}
                            </p>
                        </div>
                    )}
                </div>

                {/* Secondary Actions */}
                <div className="flex justify-between mt-4">
                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        disabled={!price && !downPayment && !rate && !years && !result}
                        className={`px-6 py-2 rounded-lg font-medium transition
      ${!price && !downPayment && !rate && !years && !result
                                ? "bg-red-100 text-red-300 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                    >
                        Reset
                    </button>

                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 rounded-lg font-medium bg-slate-700 text-white hover:bg-slate-800 transition"
                    >
                        Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MortgageCalculator;
