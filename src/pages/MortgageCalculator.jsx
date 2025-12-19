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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
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

          {/* Button */}
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
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">Monthly EMI:</span> ₹{result.emi}
            </p>
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">Total Interest:</span> ₹{result.totalInterest}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Total Amount Payable:</span> ₹{result.totalPayable}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
