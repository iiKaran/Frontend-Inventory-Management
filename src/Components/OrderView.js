import React, { useState, useEffect } from 'react';
import Order from './Order';
import OrderInputModal from './OrderInputModal';
import BASE_URL from '../apiConfig';
export default function OrderView() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllOrders`);
      const data = await response.json();
      console.log("data of ordr",data.data)
      setOrders(data?.data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrder = async (newOrder) => {
    try {
      const response = await fetch(`${BASE_URL}/createAnOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const addedOrder = await response.json();
        setOrders([...orders, addedOrder]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add order');
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const onChangeStatus = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/changeStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
  
      if (response.ok) {
        // Update the order status in the UI
        setOrders(orders.map(order => {
          if (order._id === orderId) {
            return {
              ...order,
              status: order.status === 'pending' ? 'completed' : 'pending',
            };
          }
          return order;
        }));
      } else {
        console.error('Failed to change order status');
      }
    } catch (error) {
      console.error('Error changing order status:', error);
    }
  };

  return (
    <div className='mt-12 px-12 py-4 min-h-[100vh]'>
      <div className='flex items-center w-[70%] mx-auto justify-between'>
        <h2 className="text-lg font-bold mb-4">List of Orders</h2>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800"
        >
          Add New Order
        </button>
      </div>
      <div>
        {orders.length > 0 ? orders.map(order => (
          <Order key={order._id} order={order} onChangeStatus={onChangeStatus} />
        )) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-xl">No Orders Added Yet</p>
          </div>
        )}
      </div>
      <OrderInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrder}
      />
    </div>
  );
}
