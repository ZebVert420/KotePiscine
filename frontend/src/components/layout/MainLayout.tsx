import { ReactNode, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../../images/backgrounds/eau.jpg';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  // Forcer le chargement de l'image d'arrière-plan immédiatement
  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = backgroundImage;
  }, []);

  // Gestion du scroll et des transitions
  useLayoutEffect(() => {
    const { pathname } = location;
    
    // Gestion spécifique pour les sections de contact
    if (pathname.startsWith('/contact/')) {
      const section = pathname.split('/')[2];
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Petit délai pour laisser le temps au DOM de se mettre à jour
      }
    } else {
      // Pour toutes les autres pages, scroll en haut
      window.scrollTo(0, 0);
    }
  }, [location.pathname]); // Ne dépend que du pathname, pas de l'objet location entier

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background global */}
      <div 
        className="fixed inset-0 z-0" 
        style={{ 
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: 'translateZ(0)' // Activer l'accélération GPU
        }}
      >
        {/* Cercles décoratifs flottants */}
        <div className="absolute w-64 h-64 rounded-full bg-kote-turquoise/10 -top-20 -left-10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-96 h-96 rounded-full bg-kote-blue-light/10 -bottom-32 -right-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-40 h-40 rounded-full bg-kote-turquoise/5 top-1/4 right-10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-72 h-72 rounded-full bg-kote-blue-light/10 bottom-1/4 left-20 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute w-48 h-48 rounded-full bg-kote-turquoise/5 top-1/3 -left-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Header fixe qui reste présent pendant les transitions */}
      <Header />
      
      {/* Zone de contenu principal - où se produisent les transitions */}
      <main className="flex-grow relative z-10 pt-24 flex">
        {/* Le wrapper de contenu avec clé pour forcer le re-render */}
        <div className="w-full relative" key={location.pathname}>
          {children}
        </div>
      </main>
      
      {/* Footer fixe qui reste présent pendant les transitions */}
      <Footer />
    </div>
  );
};

export default MainLayout; 