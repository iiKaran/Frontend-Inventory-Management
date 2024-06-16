// OrderInputModal.js
import React, { useState, useEffect } from 'react';

export default function OrderInputModal({ isOpen, onClose, onSubmit }) {
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/assignment/getAllItems');
      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleItemSelection = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ customer, items: selectedItems });
    setCustomer('');
    setSelectedItems([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Items</label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 p-2 rounded-md">
              {items.map((item) => (
                <div key={item._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`item-${item._id}`}
                    className="mr-2"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleItemSelection(item._id)}
                  />
                  <label htmlFor={`item-${item._id}`}>{item.itemName} - {item.quantity}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
