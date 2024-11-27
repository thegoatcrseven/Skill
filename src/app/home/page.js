"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // Hook pour gérer les redirections

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Message de bienvenue */}
      <h1 className="text-4xl font-bold mb-8">Bienvenue sur SkillTracker 🎉</h1>

      {/* Boutons personnalisés */}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          onClick={() => router.push("/create-goal")}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Créer un objectif
        </a>
        <a
          onClick={() => router.push("/view-goals")}
          className="text-sm font-semibold text-gray-900 cursor-pointer"
        >
          Voir les objectifs <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
