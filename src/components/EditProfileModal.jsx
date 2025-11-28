import React, { useState } from "react";

const EditProfileModal = ({ open, onClose, onSave, user }) => {
    if (!open) return null;

    const [form, setForm] = useState({
        name: user.name,
        email: user.email
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="border rounded px-3 py-2"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        className="border rounded px-3 py-2"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <button className="bg-blue-600 text-white py-2 rounded">
                        Save Changes
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="mt-4 text-red-500 underline block text-center"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditProfileModal;
