"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importer le hook pour naviguer

export default function CreateGoal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const router = useRouter(); // Initialiser le routeur

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGoal = {
      title,
      description,
      deadline,
    };

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        alert("Objectif créé avec succès !");
        router.push("/home"); // Redirige vers la page d'accueil
      } else {
        alert("Erreur lors de la création de l'objectif.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de la création de l'objectif.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Créer un objectif</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Titre
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block font-medium text-gray-700">
              Date limite
            </label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition"
            >
              Créer l'objectif
            </button>
            <button
              type="button"
              onClick={() => router.push("/Home")} // Redirige vers la page Home
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
