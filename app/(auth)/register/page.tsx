import Link from 'next/link';
import { signup } from '../login/actions';
import { Film } from 'lucide-react';
import Image from 'next/image';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string | undefined }>;
}) {
  const params = await searchParams;
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <Image
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80"
        alt="Cinema background"
        fill
        className="object-cover opacity-20"
      />
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-border bg-card/80 p-8 text-card-foreground shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4 rounded-full border border-primary/50 bg-primary/20 p-3">
            <Film className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Crear una cuenta</h1>
          <p className="text-muted-foreground text-sm">Completá tus datos para unirte a CineGlow.</p>
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
              placeholder="••••••••"
              required
            />
          </div>

          {params?.message && <p className="text-sm text-green-600 bg-green-500/10 border border-green-500/30 rounded-md p-2">{params.message}</p>}

          <button formAction={signup} className="w-full h-11 inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Registrarse</button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿Ya tenés cuenta? <Link href="/login" className="font-semibold text-primary hover:underline">Iniciá Sesión</Link>
        </p>
      </div>
    </main>
  );
}