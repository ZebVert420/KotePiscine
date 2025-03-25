import { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
  emptyMessage?: string;
  className?: string;
  onHeightChange?: (height: number) => void;
}

const ProductGrid = ({ 
  products, 
  columns = 3, 
  emptyMessage = "Aucun produit disponible.", 
  className = "", 
  onHeightChange
}: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(products.length === 0);
  const [emptyMessageVisible, setEmptyMessageVisible] = useState(products.length === 0);
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const emptyMessageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Observer les changements de hauteur
  useEffect(() => {
    if (!gridRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        setCurrentHeight(prev => Math.max(prev, newHeight));
        if (!fadeOut && onHeightChange) {
          onHeightChange(newHeight);
        }
      }
    });

    resizeObserver.observe(gridRef.current);
    return () => resizeObserver.disconnect();
  }, [onHeightChange, fadeOut]);

  // Gérer les changements de produits avec animation fluide
  useEffect(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    if (emptyMessageTimerRef.current) {
      clearTimeout(emptyMessageTimerRef.current);
    }
    
    // Si les produits sont identiques, ne rien faire
    if (JSON.stringify(products) === JSON.stringify(visibleProducts) && !fadeOut) {
      return;
    }
    
    // Démarrer l'animation de disparition
    setIsAnimating(true);
    setFadeOut(true);
    
    // Gérer l'affichage du message vide
    if (products.length === 0 && visibleProducts.length > 0) {
      setShowEmptyMessage(true);
      setEmptyMessageVisible(false);
    } else if (products.length > 0 && visibleProducts.length === 0) {
      setEmptyMessageVisible(false);
      emptyMessageTimerRef.current = setTimeout(() => {
        setShowEmptyMessage(false);
      }, 500);
    }
    
    // Attendre la fin de l'animation de disparition avant de mettre à jour les produits
    transitionTimerRef.current = setTimeout(() => {
      setVisibleProducts(products);
      setFadeOut(false);
      
      if (products.length === 0) {
        emptyMessageTimerRef.current = setTimeout(() => {
          setEmptyMessageVisible(true);
        }, 100);
      }
      
      // Réinitialiser l'état d'animation après la transition complète
      transitionTimerRef.current = setTimeout(() => {
        setIsAnimating(false);
        setCurrentHeight(0); // Réinitialiser la hauteur pour la nouvelle grille
      }, Math.max(600, products.length * 50 + 300));
    }, 500);
  }, [products]);

  return (
    <div 
      className="relative w-full overflow-hidden" 
      ref={gridRef}
      style={{ 
        minHeight: `${Math.max(350, currentHeight)}px`,
        transition: 'min-height 0.5s ease-in-out'
      }}
    >
      {/* Grille de produits responsive avec animation de transition */}
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(columns, 3)} lg:grid-cols-${columns} gap-6 ${className}`}
        style={{ 
          opacity: fadeOut ? 0 : 1,
          transform: fadeOut ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
          position: fadeOut ? 'absolute' : 'relative',
          width: '100%'
        }}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard 
            key={`product-${product._id}-${index}`} 
            product={product} 
            animationDelay={!fadeOut 
              ? 0.1 + (index * 0.05) // apparition: du début vers la fin
              : 0.1 + ((visibleProducts.length - 1 - index) * 0.05) // disparition: de la fin vers le début
            }
            fadeOut={fadeOut}
          />
        ))}
      </div>
      
      {/* Message pour grille vide, avec animation */}
      {showEmptyMessage && (
        <div 
          className={`w-full py-16 text-center transition-all duration-500 ease-out transform-gpu ${
            emptyMessageVisible 
              ? 'opacity-100 transform scale-100 translate-y-0' 
              : 'opacity-0 transform scale-95 translate-y-8'
          }`}
          style={{
            position: fadeOut ? 'absolute' : 'relative',
            width: '100%'
          }}
        >
          <div className="inline-block bg-white/10 backdrop-blur-xl px-6 py-4 rounded-xl border border-white/20 shadow-lg">
            <p className="text-white text-lg">{emptyMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 