'use client';

import { SeatMapPlaceholder } from '@/components/booking/seat-map';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Showtime = {
    id: string;
    room: string;
    movies: {
        title: string;
        poster_url: string;
    };
};

export default function ReservationClient({ showtime }: { showtime: Showtime }) {
    const [candyCartQuery, setCandyCartQuery] = useState('');

    useEffect(() => {
        // Leemos el carrito del localStorage solo en el cliente
        const savedCartRaw = localStorage.getItem('candyCart');
        if (savedCartRaw) {
            try {
                const savedCart = JSON.parse(savedCartRaw);
                const items = savedCart.map(([, item]: [string, any]) => ({
                    id: item.product.id,
                    q: item.quantity,
                }));
                const query = encodeURIComponent(JSON.stringify(items));
                setCandyCartQuery(`&candy_items=${query}`);

                // Opcional: limpiar el carrito después de leerlo para evitar duplicados
                // localStorage.removeItem('candyCart');
            } catch (error) {
                console.error("Error parsing candy cart from localStorage:", error);
            }
        }
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-80px)] bg-slate-950">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${showtime.movies.poster_url})` }}
            />
            <main className="relative z-10 container mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Selecciona tus asientos
                    </h1>
                    <p className="text-lg text-slate-400 mt-2">
                        Película: <span className="font-semibold text-amber-400">{showtime.movies.title}</span> - {showtime.room}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SeatMapPlaceholder />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-fit backdrop-blur-sm shadow-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Resumen de tu orden</h2>
                        <p className="text-slate-400 mb-6 text-sm">La selección de asientos y el cálculo de precios se implementarán aquí.</p>
                        <Link
                            href={`/checkout?showtimeId=${showtime.id}${candyCartQuery}`}
                            className="w-full h-12 inline-flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 text-base font-bold transition-transform hover:scale-105"
                        >
                            Ir a Pagar
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}