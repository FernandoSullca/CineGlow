'use client';

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { mainNav, siteConfig } from '@/config/site';
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
     
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-lg font-bold tracking-wide text-transparent">
            {siteConfig.name}
          </span>
        </Link>


        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {mainNav.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-purple-400',
                    pathname === item.href
                      ? 'text-purple-400'
                      : 'text-neutral-300',
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        <div className="hidden items-center space-x-4 md:flex">
          <Link
            href="/login"
            className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400"
          >
            Registrarse
          </Link>
        </div>
</div>

    </header>
  );
}
