"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CatImage, fetchCats } from "../lib/catApi";
import Icon from "../icons/Icon";

function CatCard({ cat }: { cat: CatImage }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="cat-card">
      <img src={cat.url} alt="Cat" className="cat-image" loading="lazy" />
      <button 
        className="cat-fav-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFavorite(!isFavorite)}
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

export default function CatGrid() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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
      <div className="cat-grid">
        {cats.map((cat, index) => (
          <CatCard key={`${cat.id}-${index}`} cat={cat} />
        ))}
      </div>

      <div ref={sentinelRef} className="sentinel">
        {loading && (
          <span className="loading-text">... загружаем еще котиков ...</span>
        )}
      </div>
    </div>
  );
}
