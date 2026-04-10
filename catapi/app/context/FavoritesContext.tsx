"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CatImage } from "../lib/catApi";

interface FavoritesContextType {
  favorites: CatImage[];
  toggleFavorite: (cat: CatImage) => void;
  isFavorite: (catId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<CatImage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cat_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cat_favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (cat: CatImage) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === cat.id);
      if (exists) {
        return prev.filter((f) => f.id !== cat.id);
      }
      return [...prev, cat];
    });
  };

  const isFavorite = (catId: string) => favorites.some((c) => c.id === catId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
