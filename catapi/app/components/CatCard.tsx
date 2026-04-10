"use client";

import { useState } from "react";
import { CatImage } from "../lib/catApi";
import Icon from "../icons/Icon";
import styles from "./CatCard.module.css";

interface CatCardProps {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
}

export function CatCard({ cat, isFavorite, onToggleFavorite }: CatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`${styles.catCard} group`}>
      <img src={cat.url} alt="Cat" className={styles.catImage} loading="lazy" />
      <button 
        className={`${styles.catFavBtn} ${isFavorite ? styles.active : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onToggleFavorite(cat)}
        title={isFavorite ? "Убрать из любимых" : "В любимые"}
      >
        <Icon 
          name="heart" 
          width={40} 
          height={36} 
          color="#F24E1E" 
          isFilled={isFavorite || isHovered} 
        />
      </button>
    </div>
  );
}
