"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Header({locale}) {
  const pathname = usePathname();

  const otherLocale = locale === "es" ? "en" : "es";

  const newPath = "/" + otherLocale + pathname.slice(3);

  return (
    <header style={{padding: 20, display: "flex", gap: 20}}>
      <Link href={newPath}>
        Cambiar a {otherLocale.toUpperCase()}
      </Link>
    </header>
  );
}