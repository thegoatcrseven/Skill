"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Gestion de la popup
  const [folderName, setFolderName] = useState("");
  const [isCollaboration, setIsCollaboration] = useState(false); // Collaboration ou personnel
  const [selectedGoals, setSelectedGoals] = useState([]); // Objectifs sélectionnés
  const [selectedGoalDetails, setSelectedGoalDetails] = useState(null); // Goal cliqué

  const router = useRouter();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals");
        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        } else {
          console.error("Erreur lors de la récupération des objectifs");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Fonction pour créer un dossier
  const handleCreateFolder = async () => {
    if (!folderName) {
      alert("Veuillez renseigner un nom pour le dossier.");
      return;
    }

    const newFolder = {
      name: folderName,
      isCollaboration,
      goals: selectedGoals,
    };

    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFolder),
      });

      if (response.ok) {
        alert("Dossier créé avec succès !");
        setShowModal(false); // Fermer la popup
        setFolderName(""); // Réinitialiser les champs
        setSelectedGoals([]);
      } else {
        alert("Erreur lors de la création du dossier.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de la création du dossier.");
    }
  };

  // Fonction pour afficher les détails d'un goal
  const handleViewDetails = (goal) => {
    setSelectedGoalDetails(goal);
  };

  // Fonction pour modifier un objectif
  const handleEditGoal = async (goal) => {
    const newTitle = prompt("Modifier le titre de l'objectif :", goal.title);
    const newDescription = prompt("Modifier la description :", goal.description);
    const newDeadline = prompt("Modifier la date limite (YYYY-MM-DD) :", goal.deadline);

    if (newTitle && newDescription && newDeadline) {
      try {
        const response = await fetch(`/api/goals/${goal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            deadline: newDeadline,
          }),
        });

        if (response.ok) {
          alert("Objectif modifié avec succès !");
          setGoals((prevGoals) =>
            prevGoals.map((g) =>
              g.id === goal.id ? { ...g, title: newTitle, description: newDescription, deadline: newDeadline } : g
            )
          );
        } else {
          alert("Erreur lors de la modification de l'objectif.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  };

  // Fonction pour supprimer un objectif
  const handleDeleteGoal = async (goal) => {
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer l'objectif "${goal.title}" ?`);

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/goals/${goal.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Objectif supprimé avec succès !");
          setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goal.id));
          setSelectedGoalDetails(null);
        } else {
          alert("Erreur lors de la suppression de l'objectif.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Chargement des objectifs...</p>;
  }

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Vos objectifs</h1>
      
      {/* Boutons en haut */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
        >
          Créer un dossier
        </button>
        <button
          onClick={() => alert("Fonction de suppression en développement")}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
        >
          Supprimer
        </button>
      </div>

      {/* Liste des objectifs */}
      {goals.length > 0 ? (
        <ul className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4">
          {goals.map((goal) => (
            <li
              key={goal.id}
              onClick={() => handleViewDetails(goal)}
              className="p-4 border border-gray-300 rounded hover:bg-gray-50 transition cursor-pointer"
            >
              <h2 className="text-lg font-bold">{goal.id}</h2>
              <h2 className="text-lg font-bold">{goal.title}</h2>
              <p className="text-sm text-gray-600">Date limite : {goal.deadline}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun objectif trouvé. Créez-en un pour commencer !</p>
      )}

      {/* Popup pour créer un dossier */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Créer un nouveau dossier</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="folderName" className="block font-medium text-gray-700">
                  Nom du dossier
                </label>
                <input
                  id="folderName"
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700">Type :</label>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="personnel"
                    checked={!isCollaboration}
                    onChange={() => setIsCollaboration(false)}
                  />
                  <label htmlFor="personnel">Personnel</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="collaboration"
                    checked={isCollaboration}
                    onChange={() => setIsCollaboration(true)}
                  />
                  <label htmlFor="collaboration">Collaboration</label>
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Ajouter des objectifs :</label>
                <ul className="space-y-2 mt-2">
                  {goals.map((goal) => (
                    <li key={goal.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedGoals.includes(goal.id)}
                        onChange={() =>
                          setSelectedGoals((prev) =>
                            prev.includes(goal.id)
                              ? prev.filter((id) => id !== goal.id)
                              : [...prev, goal.id]
                          )
                        }
                      />
                      <span>{goal.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleCreateFolder}
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Détails du goal */}
      {selectedGoalDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold">{selectedGoalDetails.title}</h2>
            <p>{selectedGoalDetails.description}</p>
            <p className="text-sm text-gray-600">Date limite : {selectedGoalDetails.deadline}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEditGoal(selectedGoalDetails)}
                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteGoal(selectedGoalDetails)}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
              >
                Supprimer
              </button>
              <button
                onClick={() => setSelectedGoalDetails(null)}
                className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
