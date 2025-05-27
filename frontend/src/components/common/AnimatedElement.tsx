import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

/**
 * Composant qui gère l'animation des éléments avec fadeInUp
 * en évitant le flash visuel lors des transitions de pages
 */
const AnimatedElement = ({ 
  children, 
  delay = 0, 
  className = '',
  threshold = 0.05
}: AnimatedElementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Forcer l'état initial pour éviter le flash pendant les transitions
    element.style.opacity = '0';
    element.style.transform = 'translateY(15px)';
    
    // Observer pour déclencher l'animation au scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Déclencher l'animation avec délai
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000 * 0.5);
          
          // Arrêter d'observer après le déclenchement
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold,
      }
    );

    observerRef.current.observe(element);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: `${delay * 0.5}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement; 