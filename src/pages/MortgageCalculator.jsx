import React, { useState } from "react";

const MortgageCalculator = () => {
    const [price, setPrice] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState(null);

    const calculateEMI = () => {
        const loanAmount = price - downPayment;
        const monthlyRate = rate / (12 * 100);
        const months = years * 12;

        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayable = emi * months;
        const totalInterest = totalPayable - loanAmount;

        setResult({
            emi: emi.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            totalPayable: totalPayable.toFixed(2),
        });

    };
    return (
        <div className="pt-32 px-4 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mortgage Calculator</h1>

            <div className="space-y-4">
                <input
                    type="number"
                    placeholder="Property Price"
                    className="w-full border px-4 py-2 rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Down Payment"
                    className="w-full border px-4 py-2 rounded"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Interest Rate (%)"
                    className="w-full border px-4 py-2 rounded"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Loan Tenure (Years)"
                    className="w-full border px-4 py-2 rounded"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                />

                <button
                    onClick={calculateEMI}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Calculate
                </button>
            </div>

            {result && (
                <div className="mt-6 bg-gray-100 p-4 rounded">
                    <p><strong>Monthly EMI:</strong> ₹{result.emi}</p>
                    <p><strong>Total Interest:</strong> ₹{result.totalInterest}</p>
                    <p><strong>Total Amount:</strong> ₹{result.totalPayable}</p>
                </div>
            )}
        </div>
    );
};

export default MortgageCalculator;
