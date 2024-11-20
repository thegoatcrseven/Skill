import React from 'react';

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: 'url("/back.png")', 
      }}
    >

      {/* Contenu principal */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-4">
        <button
          className="w-40 px-6 py-3 text-lg font-bold text-black bg-white border-2 border-black shadow-md transform transition hover:scale-105 hover:shadow-lg"
        >
          Login
        </button>
        <button
          className="w-40 px-6 py-3 text-lg font-bold text-white bg-black border-2 border-white shadow-md transform transition hover:scale-105 hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
