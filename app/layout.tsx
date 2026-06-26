import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CineGlow',
  description: 'Reserva de entradas y candy bar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
