import { ReactNode, useEffect, useRef, useState, CSSProperties } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  background?: boolean;
  style?: React.CSSProperties;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundScale?: number;
  borderRadius?: string;
}

/**
 * Composant qui gère l'animation des sections avec un fond
 * Utilise une animation de fondu spécifique pour les backgrounds
 */
const AnimatedSection = ({ 
  children, 
  delay = 0, 
  className = '', 
  background = true,
  style = {},
  backgroundImage,
  backgroundColor,
  backgroundScale = 1.3, // Augmenté pour assurer qu'aucun coin n'est visible
  borderRadius = '2rem'
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Observer pour déclencher l'animation au scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Déclencher l'animation avec délai
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          
          // Arrêter d'observer après le déclenchement
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // Déclencher quand 15% de la section est visible
      }
    );

    observerRef.current.observe(section);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay]);

  const animationClass = background ? 'animate-fade-in-section' : 'animate-fade-in-up';

  // Calculer le décalage basé sur l'échelle pour centrer correctement
  const offset = ((backgroundScale - 1) / 2) * 100;
  
  // Style pour le background qui sera plus large que la section
  const backgroundStyle: CSSProperties = background ? {
    position: 'absolute',
    top: `-${offset}%`, // Centré par rapport à l'échelle
    left: `-${offset}%`, // Centré par rapport à l'échelle
    width: `${backgroundScale * 100}%`, // Largeur en pourcentage basée sur l'échelle
    height: `${backgroundScale * 100}%`, // Hauteur en pourcentage basée sur l'échelle
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundColor: backgroundColor || '#f5f5f5', // Couleur par défaut si non spécifiée
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    transform: isVisible ? 'scale(1)' : 'scale(1.15)', // Scale légèrement plus grand avant l'animation
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 1.7s cubic-bezier(0.23, 1, 0.32, 1), transform 1.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 1.7s cubic-bezier(0.23, 1, 0.32, 1)',
    transitionDelay: `${delay}s`,
    borderRadius, // Utilise la prop pour personnaliser
    overflow: 'hidden',
    boxShadow: isVisible ? '0 0 50px 20px rgba(0,0,0,0.08)' : '0 0 70px 30px rgba(0,0,0,0.15)', // Ombre plus large avant l'animation
    pointerEvents: 'none' as const,
    filter: isVisible ? 'blur(0px)' : 'blur(3px)', // Effet de flou avant l'animation
    transformOrigin: 'center',
  } : {};

  return (
    <section
      ref={sectionRef}
      className={`${className} ${isVisible ? animationClass : ''} relative ${background ? 'with-background' : ''}`}
      style={{
        ...style,
        opacity: isVisible ? undefined : 0, // Commencer invisible
        transitionDelay: `${delay}s`,
        transformStyle: 'preserve-3d',
        willChange: 'opacity, transform',
        clipPath: background ? `inset(0 0 0 0 round ${borderRadius})` : undefined, // Utiliser clip-path avec bordure arrondie
        WebkitClipPath: background ? `inset(0 0 0 0 round ${borderRadius})` : undefined,
        borderRadius, // Appliquer aussi à la section
        perspective: '1000px',
        overflow: 'hidden',
        // Ajout d'un mask-image radial pour garantir que les bords sont masqués
        maskImage: background ? 'radial-gradient(circle at center, black 80%, transparent 100%)' : undefined,
        WebkitMaskImage: background ? 'radial-gradient(circle at center, black 80%, transparent 100%)' : undefined,
      }}
    >
      {/* Background étendu qui déborde de la section pour éviter les coins visibles */}
      {background && (
        <div 
          style={backgroundStyle}
          aria-hidden="true"
          className="section-background"
        />
      )}
      
      {/* Conteneur supplémentaire pour stabiliser le contenu */}
      <div className="relative z-10 content-wrapper">
        {children}
      </div>
    </section>
  );
};

export default AnimatedSection; 