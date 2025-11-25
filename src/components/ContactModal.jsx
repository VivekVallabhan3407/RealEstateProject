import React from "react";
import { toast } from "react-toastify";

const ContactModal = ({open,onClose,property}) => {
    if (!open) {
        return null;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Inquiry Sent Successfully", { autoClose: 1500 });
        onClose();
    }

    return (


        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-2">Contact Seller</h2>

                <p className="text-gray-600 mb-4">
                    For: <span className="font-semibold">{property?.name}</span>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="border px-3 py-2 rounded"
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        className="border px-3 py-2 rounded"
                    />

                    <textarea
                        placeholder="Message"
                        className="border px-3 py-2 rounded"
                        rows="3"
                        required
                    />

                    <button className="bg-blue-600 text-white py-2 rounded mt-2">
                        Send Inquiry
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="text-red-500 mt-4 underline w-full text-center"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default ContactModal;