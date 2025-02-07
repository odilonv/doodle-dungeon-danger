import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentHero } from "../services/API/ApiHero";
import { UserContext } from "./UserContext";

export const HeroContext = createContext(null);

export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      if (!user) {
        setHero(null);  // Réinitialise le héros si l'utilisateur est null
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true); // Active le chargement uniquement si une requête va être faite
      setError(null);

      try {
        const data = await getCurrentHero(user.id);
        setHero(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [user]);

  return (
    <HeroContext.Provider value={{ hero, setHero, loading, error }}>
      {children}
    </HeroContext.Provider>
  );
};
