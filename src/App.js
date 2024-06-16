
import React, { useState } from 'react';
import ItemView from './Components/ItemView';
import OrderView from './Components/OrderView';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('items');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Add logic to filter items or orders based on search term
    console.log(event.target.value);
  };
  return (
    <div className="App text-center  mt-4">
     <h1 className="text-lg sm:text-2xl font-bold text-center p-4 opacity-90 underline w-[90%]  mx-auto ">
  Inventory & Manufacturing Management System
   </h1>
   <div className="w-[90%] flex flex-col md:flex-row items-center justify-center mx-auto">
  <select
    className="w-full md:w-1/2 px-4 py-2 mb-2 md:mb-0 md:mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={selectedOption}
    onChange={handleChange}
  >
    <option value="items">Items</option>
    <option value="orders">Orders</option>
  </select>
  <input
    type="text"
    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    placeholder="Search Any of items & orders"
    value={searchTerm}
    onChange={handleSearch}
  />
</div>
   <div className=''>
   {
    selectedOption === 'items' ? <ItemView query={searchTerm} /> : <OrderView query={searchTerm}/>
   }
   </div>
    </div>
  );
}

export default App;
