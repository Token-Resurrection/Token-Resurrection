import Link from 'next/link';
import React from 'react';

function Section1() {

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="space-x-4">
      <Link 
       target="_blank"
       href="/submit">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Submit
        </button>
        </Link>
        <Link  target="_blank" href="/check">
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
          Check Eligibility
        </button>
        </Link>
        <Link  target="_blank" href="/dao">
        <button  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          DAO
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Section1;
