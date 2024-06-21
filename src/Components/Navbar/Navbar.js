import React from 'react';

function Navbar() {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Token Resurrection
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Wallet Connect
        </button>
      </div>
    </div>
  );
}

export default Navbar;
