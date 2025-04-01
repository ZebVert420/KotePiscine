import { ReactNode, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Composant qui gère les transitions animées entre les pages
 * Utilise une animation de sortie (scale down + fade out) puis une animation d'entrée
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('page-enter');
  const [transitioning, setTransitioning] = useState(false);
  const [currentContent, setCurrentContent] = useState<ReactNode>(null);
  const scrollPositions = useRef<Record<string, number>>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollLockedRef = useRef<boolean>(false);

  // Constantes pour les durées d'animation
  const EXIT_ANIMATION_DURATION = 600; // ms
  const ENTER_ANIMATION_DURATION = 800; // ms
  const POST_ANIMATION_DELAY = 200; // ms

  // Gestionnaire d'événements pour empêcher le défilement
  const preventScroll = (e: Event) => {
    if (scrollLockedRef.current) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  // Initialiser le contenu actuel à la première render
  useEffect(() => {
    if (currentContent === null) {
      setCurrentContent(children);
    }
  }, [children, currentContent]);

  // Nettoyer les timeouts quand le composant est démonté
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // S'assurer que le défilement est rétabli même si le composant est démonté
      if (scrollLockedRef.current) {
        scrollLockedRef.current = false;
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);

  // Fonction pour bloquer le défilement sans modifier overflow
  const lockScroll = () => {
    scrollLockedRef.current = true;
    // Utiliser { passive: false } pour permettre e.preventDefault()
    window.addEventListener('wheel', preventScroll, { passive: false } as EventListenerOptions);
    window.addEventListener('touchmove', preventScroll, { passive: false } as EventListenerOptions);
  };

  // Fonction pour débloquer le défilement
  const unlockScroll = () => {
    scrollLockedRef.current = false;
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
  };

  // Fonction pour déterminer si on navigue vraiment vers une nouvelle page
  // ou si c'est juste l'URL d'un produit qui change
  const isProductModalNavigation = (from: string, to: string) => {
    // Vérifier si on est dans une navigation catalogue (catégories ou produits)
    const isCatalogueNavigation = (path: string) => {
      const normalizedPath = path.replace('/KotePiscine', '');
      return normalizedPath.startsWith('/catalogue');
    };

    // Si les deux chemins sont dans le catalogue, pas de transition
    if (isCatalogueNavigation(from) && isCatalogueNavigation(to)) {
      // Extraire les parties du chemin
      const fromParts = from.replace('/KotePiscine', '').split('/');
      const toParts = to.replace('/KotePiscine', '').split('/');
      
      // Si on change juste de produit ou de catégorie dans le catalogue
      // (même nombre de segments ou plus), c'est une navigation modale
      return fromParts.length >= 2 && toParts.length >= 2;
    }
    return false;
  };

  // Surveiller les changements de location pour démarrer l'animation
  useEffect(() => {
    const isSamePage = location.pathname === displayLocation.pathname;
    const isProductModal = isProductModalNavigation(location.pathname, displayLocation.pathname);
    
    // Ne pas déclencher de transition si on navigue entre catalogue et détail produit
    if (!isSamePage && !transitioning && !isProductModal) {
      // Sauvegarder la position de défilement actuelle
      scrollPositions.current[displayLocation.pathname] = window.scrollY;
      
      // Empêcher temporairement le défilement pendant la transition
      lockScroll();
      
      // Démarrer la transition - animation de sortie sur le contenu actuel
      setTransitioning(true);
      setTransitionStage('page-exit');
      
      // Nettoyer tout timeout existant
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Attendre la fin de l'animation de sortie avant de changer le contenu
      timeoutRef.current = setTimeout(() => {
        // Changer la page après l'animation de sortie
        setDisplayLocation(location);
        
        // Mettre à jour le contenu après la disparition
        setCurrentContent(children);
        
        // Préparer l'animation d'entrée
        setTransitionStage('page-enter');
        
        // Restaurer la position de défilement ou défiler vers le haut
        timeoutRef.current = setTimeout(() => {
          if (scrollPositions.current[location.pathname] !== undefined) {
            window.scrollTo(0, scrollPositions.current[location.pathname]);
          } else {
            window.scrollTo(0, 0);
          }
          
          // Attendre que l'animation d'entrée soit terminée avant de réactiver le défilement
          timeoutRef.current = setTimeout(() => {
            // Réactiver le défilement
            unlockScroll();
            
            // Finaliser la transition
            setTransitioning(false);
          }, ENTER_ANIMATION_DURATION + POST_ANIMATION_DELAY);
        }, 100);
      }, EXIT_ANIMATION_DURATION); // Durée de l'animation de sortie
    } else if ((isSamePage || isProductModal) && !transitioning) {
      // Si on reste sur la même page ou si c'est juste un modal produit, 
      // simplement mettre à jour le contenu sans animation
      setDisplayLocation(location);
      setCurrentContent(children);
    }
  }, [location, displayLocation, transitioning, children]);
  
  return (
    <div
      ref={contentRef}
      className={`transition-wrapper ${transitionStage}`}
      style={{
        minHeight: '100vh',
        transformOrigin: 'center center',
        position: 'relative',
        width: '100%'
      }}
    >
      {currentContent}
    </div>
  );
};

export default PageTransition; 