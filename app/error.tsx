'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Opcional: Loguear el error a un servicio de monitoreo como Sentry, LogRocket, etc.
        console.error('Unhandled Error:', error);
    }, [error]);

    return (
        <html lang="es">
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-900 text-white p-4">
                    <h1 className="text-3xl font-bold mb-2">Algo salió mal</h1>
                    <p className="text-slate-400 mb-6 max-w-md">
                        Ocurrió un error inesperado en nuestra aplicación. Nuestro equipo ya fue notificado.
                        Por favor, intentá de nuevo.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </body>
        </html>
    );
}