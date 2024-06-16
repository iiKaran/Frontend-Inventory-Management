import React from 'react';

export default function Order({ order, onChangeStatus }) {
  const handleStatusChange = () => {
    console.log("id is ", order._id)
    onChangeStatus(order._id);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4 flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p className="font-semibold">{order.customer}</p>
        <p className={`${order.status === 'completed' ? 'text-green-600' : 'text-red-600'} font-semibold`}>
          {order.status}
        </p>
        <p className="text-gray-600">Items: {order.items.length}</p>
      </div>
      <button onClick={handleStatusChange} className="text-red-600 mt-2 sm:mt-0">
        Change Status
      </button>
    </div>
  );
}
