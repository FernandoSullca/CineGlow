import Link from 'next/link';
import { login } from './actions';
import { Film } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <Image
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80"
        alt="Cinema background"
        fill
        className="object-cover opacity-20"
      />
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-border bg-card/80 p-8 text-card-foreground shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4 rounded-full border border-primary/50 bg-primary/20 p-3">
            <Film className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Bienvenido a CineGlow</h1>
          <p className="text-muted-foreground text-sm">Ingresá tus credenciales para continuar</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Contraseña
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          {searchParams.message && <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md p-2">{searchParams.message}</p>}

          <div className="mt-2 w-full rounded-md border border-input bg-background/50 p-3 text-center text-xs text-muted-foreground">
            <p className="font-bold mb-1">Usuario de Demostración</p>
            <p><code className="font-mono bg-secondary px-1 rounded">demo@cineglow.com</code></p>
            <p><code className="font-mono bg-secondary px-1 rounded">password123</code></p>
          </div>
          <button formAction={login} className="w-full h-11 inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Iniciar Sesión</button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿No tenés cuenta? <Link href="/register" className="font-semibold text-primary hover:underline">Registrate</Link>
        </p>
      </div>
    </main>
  );
}