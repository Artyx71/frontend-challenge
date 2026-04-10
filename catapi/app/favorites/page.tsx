"use client";

import { useFavorites } from "../context/FavoritesContext";
import { CatCard } from "../components/CatCard";
import styles from "../components/CatGrid.module.css";

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div>
      {favorites.length === 0 ? (
        <p className={styles.loadingText}>У вас пока нет любимых котиков :(</p>
      ) : (
        <div className={styles.catGrid}>
          {favorites.map((cat, index) => (
            <CatCard 
              key={`${cat.id}-${index}`} 
              cat={cat} 
              isFavorite={isFavorite(cat.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
