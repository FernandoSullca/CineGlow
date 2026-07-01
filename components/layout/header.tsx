'use client';

import Link from 'next/link';
import { logout } from '@/app/(auth)/login/actions';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const mainNav = [
    { title: 'Cartelera', href: '/' },
    { title: 'Candy Bar', href: '/candy-bar' },
];

export default function Header({ user }: { user: any | null }) {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-bold tracking-wide text-transparent">
                            CineGlow
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
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
                            <Link href="/mis-reservas" className="text-sm font-medium text-neutral-300 transition-colors hover:text-purple-400">Mis Reservas</Link>
                            <form action={logout}>
                                <button className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                                    Cerrar sesión
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">Iniciar Sesión</Link>
                            <Link href="/register" className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400">Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
