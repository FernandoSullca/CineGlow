'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function MovieHero({ src, title }: { src: string; title: string }) {
    const [error, setError] = useState(false);

    return (
        <div className="relative h-[30vh] md:h-[40vh] w-full bg-slate-900">
            {!error && (
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover opacity-50"
                    onError={() => setError(true)}
                />
            )}
            {/**efecto gradiente trasparente superior del fondo */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        </div>
    );
}