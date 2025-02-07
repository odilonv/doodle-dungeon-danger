import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentHero } from "../services/API/ApiHero";

export const HeroContext = createContext(null);

export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children, userId }) => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentHero(userId);
        setHero(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [userId]);

  return (
    <HeroContext.Provider value={{ hero, setHero, loading, error }}>
      {children}
    </HeroContext.Provider>
  );
};
