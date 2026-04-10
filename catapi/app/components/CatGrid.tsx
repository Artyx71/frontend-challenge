"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CatImage, fetchCats } from "../lib/catApi";
import { CatCard } from "./CatCard";
import { useFavorites } from "../context/FavoritesContext";
import styles from "./CatGrid.module.css";

export default function CatGrid() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newCats = await fetchCats(page, 15);
      if (newCats.length === 0) {
        setHasMore(false);
      } else {
        setCats((prev) => [...prev, ...newCats]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, loading, hasMore]);

  return (
    <div>
      <div className={styles.catGrid}>
        {cats.map((cat, index) => (
          <CatCard 
            key={`${cat.id}-${index}`} 
            cat={cat} 
            isFavorite={isFavorite(cat.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div ref={sentinelRef} className={styles.sentinel}>
        {loading && (
          <span className={styles.loadingText}>... загружаем еще котиков ...</span>
        )}
      </div>
    </div>
  );
}
