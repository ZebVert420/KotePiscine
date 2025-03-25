import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Forcer le chargement de l'image d'arrière-plan immédiatement
  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = '/src/images/backgrounds/eau.jpg';
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background global */}
      <div 
        className="fixed inset-0 z-0" 
        style={{ 
          backgroundImage: `url('/src/images/backgrounds/eau.jpg')`,
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
        {/* Le wrapper de contenu doit permettre le positionnement absolu des pages en transition */}
        <div className="w-full relative">
          {children}
        </div>
      </main>
      
      {/* Footer fixe qui reste présent pendant les transitions */}
      <Footer />
    </div>
  );
};

export default MainLayout; 