// Item.js
import React from 'react';

export default function Item({ item, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold mb-2">{item.itemName}</span>
          <span className="text-gray-600">Quantity: {item.quantity}</span>
        </div>
        <button 
          onClick={() => onDelete(item._id)} 
          className="mt-4 sm:mt-0 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
