'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function MoviePoster({ src, title }: { src: string; title: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full min-h-[300px] flex-col items-center justify-center gap-2 rounded-lg bg-slate-800 text-slate-500">
        <span className="text-6xl">🎬</span>
        <span className="text-sm text-center px-4">{title}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Poster de la película ${title}`}
      width={500}
      height={750}
      className="rounded-lg shadow-2xl object-cover w-full"
      priority
      onError={() => setError(true)}
    />
  );
}