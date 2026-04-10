"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navLink} ${pathname === "/" ? styles.navLinkActive : ""}`}
        >
          Все котики
        </Link>
        <Link
          href="/favorites"
          className={`${styles.navLink} ${pathname === "/favorites" ? styles.navLinkActive : ""}`}
        >
          Любимые котики
        </Link>
      </nav>
    </header>
  );
}
