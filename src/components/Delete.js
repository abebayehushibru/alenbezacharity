import React from 'react';

const DeleteConfirmation = ({ onCancel, onDelete, message,buttonText="Delete" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onDelete}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
