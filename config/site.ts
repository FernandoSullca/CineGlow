export const siteConfig = {
  name: 'CineGlow',
  description: 'Reserva de entradas y candy bar',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
};
/**
 * Main navigation links for the site
 * 
 */
export const mainNav = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Películas',
    href: '/peliculas',
  },
  {
    title: 'Candy Bar',
    href: '/candy-bar',
  },
];
