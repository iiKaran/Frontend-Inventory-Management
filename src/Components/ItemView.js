// ItemView.js
import React, { useState, useEffect } from 'react';
import Item from './Item';
import ItemInputModal from './ItemInputModal'
import BASE_URL from '../apiConfig';
export default function ItemView() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch(`${BASE_URL}/createItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        console.log("data",addedItem?.data)
        setItems(addedItem.data);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  useEffect(() => {
    // Fetch items from backend
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllItems`);
      const data = await response.json();
      setItems(data.data);
      console.log(data.data)
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteItem`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });
      console.log(response)
      if (response.ok) {
        setItems(items.filter(item => item._id !== itemId));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  return (
    <div className=' mt-12 px-12 py-4 min-h-[100vh] '>
    <div className=' flex  items-center w-[70%] mx-auto  justify-between'>
      <h2 className="text-lg font-bold mb-4 ">List of Items</h2>
      <button   onClick={() => setIsModalOpen(true)}  className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800">
          Add New Item
    </button>
    </div>
      <div>
        {items.length>0  ? items?.map(item => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        )):<div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-xl">No Items Added Yet</p>
      </div>}
      </div>
      <ItemInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
}
