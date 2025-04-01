import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Product } from '../../types';
import { assetService } from '../../services/assetService';
import { useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { categories, Category } from '../../config/categories';

interface ProductCardProps {
  product: Product;
  animationDelay?: number;
  animationFillMode?: 'both' | 'forwards' | 'backwards' | 'none';
  fadeOut?: boolean;
}

const ProductCard = memo(({ 
  product, 
  animationDelay = 0,
  animationFillMode = 'both',
  fadeOut = false
}: ProductCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const originalPathRef = useRef<string>('');
  const cardRef = useRef<HTMLDivElement>(null);
  const { productSlug, category } = useParams<{ productSlug?: string, category?: string }>();
  const mountedRef = useRef(false);
  const isNavigatingRef = useRef(false);

  // Gérer le montage initial
  useEffect(() => {
    mountedRef.current = true;

    // Si on a un productSlug dans l'URL au montage initial, on doit ouvrir le modal
    if (productSlug === product.slug && !showModal && !isNavigatingRef.current) {
      const productCategory = categories.find((cat: Category) => cat.id === product.category);
      const categorySlug = category || productCategory?.slug;
      
      if (categorySlug) {
        // Sauvegarder l'URL de la catégorie comme URL d'origine
        originalPathRef.current = `/KotePiscine/catalogue/${categorySlug}`;
        
        // Ouvrir le modal sans modifier l'URL
        setShowModal(true);
        requestAnimationFrame(() => {
          setModalVisible(true);
        });
      }
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    if (!mountedRef.current || isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    setIsClosing(true);
    setModalVisible(false);
    
    setTimeout(() => {
      if (mountedRef.current) {
        // Restaurer l'URL d'origine
        if (originalPathRef.current) {
          window.history.pushState({ modal: false }, '', originalPathRef.current);
        }
        setShowModal(false);
        setIsClosing(false);
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 300); // Augmenté à 300ms pour correspondre à la durée de l'animation
      }
    }, 300);
  }, []);

  // Nettoyer au démontage seulement si nécessaire
  useEffect(() => {
    return () => {
      const currentPath = window.location.pathname;
      const isChangingCategory = currentPath.includes('/catalogue/') && !currentPath.includes(product.slug);
      const isNavigatingAway = !currentPath.includes('/catalogue/');

      if (showModal && (isNavigatingAway || isChangingCategory)) {
        isNavigatingRef.current = true;
        setShowModal(false);
        setModalVisible(false);
        setIsClosing(false);
        // Garder isNavigatingRef.current à true pendant un moment pour éviter la réouverture
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 300);
      }
    };
  }, [showModal, product.slug]);

  // Gérer la navigation
  useEffect(() => {
    const handlePopState = () => {
      if (showModal) {
        handleCloseModal();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showModal, handleCloseModal]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      return;
    }
    
    animationTimeoutRef.current = setTimeout(() => {
      setShouldAnimate(true);
    }, 50);
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [shouldAnimate]);

  // Effet pour gérer l'ouverture du modal basé sur l'URL
  useEffect(() => {
    if (productSlug === product.slug && !showModal && !isNavigatingRef.current) {
      const productCategory = categories.find((cat: Category) => cat.id === product.category);
      const categorySlug = category || productCategory?.slug;
      
      if (categorySlug) {
        const currentPath = window.location.pathname;
        const isChangingCategory = currentPath.includes('/catalogue/') && !currentPath.includes(product.slug);
        
        if (!isChangingCategory) {
          originalPathRef.current = `/KotePiscine/catalogue/${categorySlug}`;
          setShowModal(true);
          requestAnimationFrame(() => {
            setModalVisible(true);
          });
        }
      }
    }
  }, [productSlug, product.slug, category, product.category]);

  useEffect(() => {
    if (showModal) {
      const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": Array.isArray(product.images) ? product.images[0] : product.images,
        "offers": {
          "@type": "Offer",
          "url": `${window.location.origin}/catalogue/${product.slug}`,
          "priceCurrency": "EUR",
          "price": product.price.toFixed(2),
          "availability": product.inStock 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock"
        }
      };

      let script = document.getElementById('productJsonLd');
      if (!script) {
        script = document.createElement('script');
        script.id = 'productJsonLd';
        (script as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);

      return () => {
        const existingScript = document.getElementById('productJsonLd');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [showModal, product]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleOpenModal = useCallback(() => {
    if (isNavigatingRef.current) return;

    // Trouver la catégorie du produit
    const productCategory = categories.find((cat: Category) => cat.id === product.category);
    const categorySlug = category || productCategory?.slug;

    if (!categorySlug) return;

    // Construire le chemin cible
    const targetPath = `/KotePiscine/catalogue/${categorySlug}/${product.slug}`;
    
    // Sauvegarder le chemin actuel comme chemin d'origine
    originalPathRef.current = window.location.pathname;
    
    // Mettre à jour l'URL sans navigation complète
    window.history.pushState({ modal: true }, '', targetPath);

    // Ouvrir le modal immédiatement
    setShowModal(true);
    requestAnimationFrame(() => {
      setModalVisible(true);
    });
  }, [product, category]);

  const isOutOfStock = !product.inStock;

  const renderModal = () => {
    if (!showModal) return null;
    
    return createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 modal-container"
        onClick={handleCloseModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        <div 
          className={`fixed inset-0 w-full h-full backdrop-blur-sm transition-all duration-500 ease-in-out modal-overlay ${
            modalVisible ? 'bg-black/70' : 'bg-black/0 backdrop-blur-[0px]'
          } ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
        ></div>
        
        <div 
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl transition-all duration-500 ease-out transform-gpu modal-content ${
            modalVisible && !isClosing 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-8'
          }`}
          style={{ 
            backgroundImage: `url(${assetService.getBackgroundPath('eau.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.85)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 10000
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="absolute inset-0 bg-kote-blue-dark/70" 
            style={{ backdropFilter: 'brightness(0.85)' }}
            aria-hidden="true"
          ></div>
          
          <div className="relative z-10 overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-kote-turquoise/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:backdrop-blur-xl [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-thumb]:hover:bg-kote-turquoise/70">
            <button 
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center z-10 transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-kote-turquoise/50"
              onClick={handleCloseModal}
              aria-label="Fermer"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-4 pb-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="product-modal-title" className="text-2xl md:text-3xl font-bold text-white">{product.name}</h2>
                
                {product.inStock && (
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                    <span className="text-white/90 text-xs font-medium">En stock</span>
                  </div>
                )}
                
                {!product.inStock && (
                  <div className="bg-red-500/90 text-white font-bold px-3 py-1 rounded-full text-sm">
                    Rupture de stock
                  </div>
                )}
                
                <div className="bg-kote-turquoise text-white font-bold px-3 py-1 rounded-full shadow-lg text-base">
                  {product.price.toFixed(2)}€
                </div>
              </div>
            </div>
            
            <div className="p-4 pt-0">
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full md:w-[400px] flex-shrink-0 flex flex-col">
                  <div className="mb-4 transition-transform duration-500 hover:scale-[1.03]">
                    <div className="overflow-hidden rounded-2xl">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full object-contain rounded-2xl max-h-[300px] md:max-h-[400px] transition-transform duration-700 hover:scale-[1.05] transform-gpu"
                        style={{ 
                          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))',
                          border: '1px solid rgba(255,255,255,0.15)'
                        }}
                        onLoad={handleImageLoad}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/15">
                      <p className="text-white font-medium text-base mb-2">
                        Intéressé par ce produit?
                      </p>
                      <p className="text-white/90 text-sm mb-3">
                        Venez découvrir ce produit en magasin ou contactez notre équipe d'experts pour obtenir des conseils personnalisés.
                      </p>
                      <div className="flex flex-col gap-2">
                        <a 
                          href="https://goo.gl/maps/PVn9oQwTHN5ZuDLZ9" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center bg-[#B0C852] text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-sm focus:outline-none focus:ring-2 focus:ring-[#B0C852]/50"
                        >
                          <svg 
                            className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Nous localiser
                        </a>
                        <a 
                          href="tel:0590681662" 
                          className="flex items-center justify-center bg-gradient-to-r from-kote-turquoise via-kote-blue-light to-kote-blue-dark text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-sm focus:outline-none focus:ring-2 focus:ring-kote-turquoise/50"
                        >
                          <svg 
                            className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                            />
                          </svg>
                          Nous contacter
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="block md:hidden mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 transition-all duration-300 hover:bg-white/15">
                      <h3 className="text-base font-semibold text-white mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Conseil Koté Piscine
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">Pour prolonger la durée de vie de vos accessoires, rincez-les à l'eau claire après chaque utilisation et conservez-les à l'abri du soleil et des intempéries.</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:flex-grow">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 mb-3 transition-all duration-300 hover:bg-white/15 transform-gpu">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Description
                    </h3>
                    <p className="text-white/95 text-base leading-relaxed whitespace-pre-line">{product.description}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 mb-3 transition-all duration-300 hover:bg-white/15 transform-gpu">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Avantages
                    </h3>
                    <ul className="text-white/95 text-base space-y-2">
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-kote-turquoise/20 flex items-center justify-center mr-2">
                          <svg className="w-4 h-4 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Qualité Premium garantie</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-kote-turquoise/20 flex items-center justify-center mr-2">
                          <svg className="w-4 h-4 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Compatibilité avec tous types de piscines</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-kote-turquoise/20 flex items-center justify-center mr-2">
                          <svg className="w-4 h-4 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Durabilité même sous conditions extrêmes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 transition-all duration-300 hover:bg-white/15 transform-gpu">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-kote-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Conseil Koté Piscine
                    </h3>
                    <p className="text-white/95 text-base leading-relaxed">Pour prolonger la durée de vie de vos accessoires, rincez-les à l'eau claire après chaque utilisation et conservez-les à l'abri du soleil et des intempéries.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div
      ref={cardRef}
      className={`product-card backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-0 overflow-hidden transition-all duration-500`}
      style={{ 
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'translateY(20px)' : 'translateY(0)',
        animation: shouldAnimate 
          ? `${fadeOut ? 'fadeOutDown' : 'fadeInUp'} 0.5s ease-out ${animationDelay}s ${animationFillMode}` 
          : 'none',
        willChange: 'transform, opacity',
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'ease-out',
        transitionDelay: `${animationDelay}s`
      }}
    >
      <div 
        className="block h-full relative transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 
              transition-opacity duration-300 group-hover:opacity-0"
            style={{ opacity: imageLoaded ? 0 : 1 }}
          />
          <img
            src={Array.isArray(product.images) ? product.images[0] : product.images}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 
              ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
            onLoad={handleImageLoad}
          />
          
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="px-4 py-2 bg-black/70 text-white rounded-lg text-sm font-medium">
                Rupture de stock
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-white line-clamp-2">{product.name}</h3>
            
            <div className="text-kote-turquoise font-bold whitespace-nowrap ml-2">
              {product.price.toFixed(2)} €
            </div>
          </div>
          
          <p className="text-white/80 text-sm line-clamp-2 mb-4">{product.description}</p>
          
          <div 
            className="inline-block bg-kote-turquoise/20 border border-kote-turquoise/30 text-kote-turquoise py-2 px-4 rounded-full text-sm font-medium hover:bg-kote-turquoise hover:text-white transition-colors duration-300"
          >
            Voir détails
          </div>
        </div>

        {showModal && renderModal()}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

// Ajouter les keyframes pour les animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .product-card {
    backface-visibility: hidden;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
`;
document.head.appendChild(style);

export default ProductCard; 