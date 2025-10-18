'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet map to avoid SSR issues
const Map = dynamic(() => import('./components/FactoryMap'), { ssr: false });

type Factory = {
  id: string | number;
  name: string;
  status: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    address?: string;
  };
  established?: string | number;
  // add other properties as needed
};

export default function Home() {
  const [factories, setFactories] = useState<Factory[]>([]);

  useEffect(() => {
    fetch('https://corsproxy.io/?https://amanabootcamp.org/api/fs-classwork-data/amana-industries')
      .then(res => res.json())
      .then(data => {
        console.log('API data:', data);
        setFactories(data.factory_data || []);
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-black px-4 py-3">
        <div className="flex items-center">
          <span className="text-gold-500 text-2xl font-bold tracking-widest">AM Inc</span>
        </div>
        <button className="text-white focus:outline-none">
          {/* Hamburger Icon */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Title */}
      <header className="bg-[#FFD700] py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">Amana Industries</h1>
      </header>

      {/* Sub-section */}
      <section className="bg-yellow-100 py-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-black">Factory Statuses</h2>
      </section>

      {/* Factory Summary Section */}
      <section className="flex flex-wrap justify-center gap-4 py-4 bg-white">
        {['operational', 'maintenance', 'offline'].map(status => {
          const count = factories.filter(f => f.status === status).length;
          let statusColor = 'text-green-700 bg-green-100';
          if (status === 'maintenance') statusColor = 'text-red-700 bg-red-100';
          if (status === 'offline') statusColor = 'text-gray-500 bg-gray-100';
          return (
            <div key={status} className="flex flex-col items-center px-4 py-2 rounded shadow bg-yellow-50 min-w-[100px]">
              <span className={`font-bold text-lg ${statusColor}`}>
                {count}
              </span>
              <span className={`text-xs uppercase tracking-wide px-2 py-1 rounded ${statusColor}`}>
                {status}
              </span>
            </div>
          );
        })}
      </section>

      {/* Map */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-4">
        <div className="w-full max-w-2xl h-[350px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          {factories.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              {/* Spinner */}
            </div>
          ) : (
            <Map factories={factories} />
          )}
        </div>
      </main>

      {/* Factory List Section */}
      <section className="bg-yellow-50 py-4 px-2">
        <h3 className="text-lg font-bold mb-2 text-black">Factory Directory</h3>
        <div className="max-h-48 overflow-y-auto">
          {factories.map(factory => (
            <div key={factory.id} className="flex justify-between items-center py-2 px-3 mb-1 rounded bg-white shadow-sm">
              <span className="font-bold text-gray-900 hover:text-[#FFD700] transition-colors duration-150">
                {factory.name}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${factory.status === 'maintenance' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {factory.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-3 mt-auto text-sm">
        Copyright @2025 | Amana Industries
      </footer>
    </div>
  );
}
