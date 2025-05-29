import React from 'react';

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-10 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
        <p>{message}</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
