import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessMessage = ({ amount, name, onClose }) => {
    const navigate = useNavigate()
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
        <p className="text-gray-700 mb-4">
          ₹{amount} has been sent successfully to <strong>{name}</strong>.
        </p>

        <div className="flex justify-center items-center gap-x-8">
            <button
                onClick={onClose}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Close
            </button>

            <button
                onClick={() => navigate('/dashboard') }
                className="bg-red-300 text-black px-4 py-2 rounded hover:bg-red-600 transition"
            >
               Dashboard
            </button>
        </div>

      </div>
    </div>
  );
};

export default SuccessMessage;
