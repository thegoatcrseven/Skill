"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: 'url("/backskill.jpg")', // Chemin vers ton image de fond
      }}
    >

      {/* Boutons en bas à droite */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-4">
        <button
          onClick={() => router.push("/login")} // Redirection vers /login
          className="w-40 px-6 py-3 text-lg font-bold text-black bg-white border-2 border-black shadow-md transform transition hover:scale-105 hover:shadow-lg"
        >
          Connexion
        </button>
        <button
          onClick={() => router.push("/signup")} // Redirection vers /signup
          className="w-40 px-6 py-3 text-lg font-bold text-white bg-black border-2 border-white shadow-md transform transition hover:scale-105 hover:shadow-lg"
        >
          Inscription
        </button>
      </div>
    </div>
  );
}
