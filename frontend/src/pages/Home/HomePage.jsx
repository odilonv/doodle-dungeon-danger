import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [hasSavedGame, setHasSavedGame] = useState(false);

  // Simule une vérification si une partie existe (ex: localStorage ou API)
  useEffect(() => {
    const savedGame = localStorage.getItem("savedGame");
    setHasSavedGame(!!savedGame); // Convertit en booléen
  }, []);

  const startNewGame = () => {
    localStorage.setItem("savedGame", JSON.stringify({ level: 1, score: 0 }));
    navigate("/game"); // Redirige vers la page du jeu
  };

  const continueGame = () => {
    if (hasSavedGame) {
      navigate("/game");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Bienvenue dans le jeu</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={startNewGame}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold"
        >
          Créer une nouvelle partie
        </button>
        <button
          onClick={continueGame}
          disabled={!hasSavedGame}
          className={`px-6 py-3 rounded-xl text-lg font-semibold ${
            hasSavedGame ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
