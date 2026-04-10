"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <nav className="nav">
        <Link
          href="/"
          className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}
        >
          Все котики
        </Link>
        <Link
          href="/favorites"
          className={`nav-link ${pathname === "/favorites" ? "nav-link-active" : ""}`}
        >
          Любимые котики
        </Link>
      </nav>
    </header>
  );
}
