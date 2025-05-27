import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import { realisationCategories } from '../../config/realisations.config';
import { FictiveRealisationData } from '../../config/fictiveRealisations.config';
import LogoRond from '../../images/logo/Blanc Horizontal.png';

interface LightboxProps {
  isOpen: boolean;
  realisation: FictiveRealisationData | null;
  currentImageIndex: number;
  onClose: () => void;
  onNextImage: () => void;
  onPreviousImage: () => void;
}

const Lightbox = ({ 
  isOpen, 
  realisation, 
  currentImageIndex, 
  onClose, 
  onNextImage, 
  onPreviousImage 
}: LightboxProps) => {
  const [direction, setDirection] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1.5);
  const imageRef = useRef<HTMLDivElement>(null);

  // Fonction pour changer d'image avec direction (-1: gauche, 1: droite)
  const changeImage = (newDirection: number) => {
    if (isChanging || !realisation) return;
    
    // Réinitialiser le zoom si activé
    if (isZoomed) {
      setIsZoomed(false);
    }
    
    setIsChanging(true);
    setDirection(newDirection);
    
    if (newDirection === 1) {
      onNextImage();
    } else {
      onPreviousImage();
    }
    
    // Réinitialiser après transition
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  // Gestion du zoom et de la position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    // Réinitialiser la position au centre si on désactive le zoom
    if (isZoomed) {
      setZoomPosition({ x: 0.5, y: 0.5 });
    }
  };

  const adjustZoomLevel = (increment: number) => {
    setZoomLevel(Math.max(1.2, Math.min(3, zoomLevel + increment)));
  };

  // Gestion de la fermeture avec la touche Escape et navigation avec flèches
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          if (!isZoomed) changeImage(-1);
          break;
        case 'ArrowRight':
          if (!isZoomed) changeImage(1);
          break;
        case '+':
          if (isZoomed) adjustZoomLevel(0.2);
          break;
        case '-':
          if (isZoomed) adjustZoomLevel(-0.2);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, changeImage, isZoomed, zoomLevel]);

  // Variants pour les animations d'images
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && realisation && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={() => {
            if (isZoomed) {
              setIsZoomed(false);
            } else {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
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
          {/* Overlay de fond */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full bg-black/95 transition-all duration-300"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
            aria-hidden="true"
          />

          {/* Bouton fermer - Croix */}
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="fixed top-4 right-4 text-white hover:text-red-400 transition-colors z-[10001] bg-black/50 rounded-full p-2 backdrop-blur-sm hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              if (isZoomed) {
                setIsZoomed(false);
              } else {
                onClose();
              }
            }}
            aria-label="Fermer la lightbox"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </motion.button>

          {/* Container principal centré */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
            }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col justify-center"
            style={{ 
              zIndex: 10000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Container de l'image avec navigation - Sert de référence pour les flèches */}
            <div className="relative w-full mb-6" id="image-container">
              {/* Image principale avec transition */}
              <div 
                ref={imageRef}
                onMouseMove={handleMouseMove}
                className={`relative rounded-xl overflow-hidden shadow-2xl bg-black/20 h-[60vh] max-h-[60vh] flex items-center justify-center ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 w-full flex items-center justify-center"
                    style={{
                      overflow: isZoomed ? 'hidden' : 'visible'
                    }}
                  >
                    <img 
                      src={realisation.images[currentImageIndex]} 
                      alt={realisation.title}
                      className={`max-w-full w-auto h-auto object-contain transition-transform duration-300 ${
                        isZoomed ? 'scale-100' : 'hover:scale-105'
                      }`}
                      style={{
                        transform: isZoomed 
                          ? `scale(${zoomLevel}) translate(${(0.5 - zoomPosition.x) * 100 / zoomLevel}%, ${(0.5 - zoomPosition.y) * 100 / zoomLevel}%)`
                          : ''
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Logo Koté Piscine et badge catégorie - Masqués en mode zoom */}
                {!isZoomed && (
                  <div className="absolute flex flex-col sm:flex-row items-start justify-between w-full top-4 px-4 z-10">
                    {/* Badge catégorie à gauche */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {(() => {
                        const rCat = realisationCategories.find(cat => cat.slug === realisation.categorySlug);
                        if (rCat && rCat.icon) {
                          const IconComponent = rCat.icon;
                          const isAutoNettoyante = rCat.slug === 'auto-nettoyantes';
                          return (
                            <div className={`flex items-center text-white z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 ${
                              isAutoNettoyante ? 'hover:bg-kote-turquoise/20 hover:border-kote-turquoise/50 transition-all duration-300 cursor-default group' : ''
                            }`}>
                              <IconComponent className={`h-6 w-6 mr-3 text-kote-turquoise transition-transform duration-300 ${
                                isAutoNettoyante ? 'group-hover:rotate-12 group-hover:scale-110' : ''
                              }`} />
                              <span className={`text-base font-bold ${
                                isAutoNettoyante ? 'group-hover:text-kote-turquoise transition-colors duration-300' : ''
                              }`}>{rCat.title}</span>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </motion.div>

                    {/* Logo à droite ou en dessous sur mobile */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 sm:ml-0 ml-auto mt-2 sm:mt-0"
                    >
                      <img 
                        src={LogoRond} 
                        alt="Koté Piscine" 
                        className="w-auto h-10 md:h-12 drop-shadow-lg"
                      />
                    </motion.div>
                  </div>
                )}

                {/* Contrôles de zoom - visible uniquement en mode zoom */}
                {isZoomed && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        adjustZoomLevel(-0.2);
                      }}
                      className="bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                      disabled={zoomLevel <= 1.2}
                    >
                      <FaSearchMinus />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        adjustZoomLevel(0.2);
                      }}
                      className="bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                    >
                      <FaSearchPlus />
                    </button>
                  </div>
                )}

                {/* Indicateur "Cliquez pour zoomer" - Affiché quand pas en mode zoom */}
                {!isZoomed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="absolute bottom-3 left-0 right-0 z-20 mx-auto"
                  >
                    {/* Indicateur Cliquez pour zoomer */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-1 items-center justify-center mx-auto mb-2 px-4 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white/90 text-xs max-w-fit"
                    >
                      <FaSearch className="mr-1 text-kote-turquoise" />
                      <span>Cliquez pour zoomer</span>
                    </motion.div>
                    
                    {/* Galerie de miniatures - Uniquement si plus d'une image */}
                    {realisation.images.length > 1 && (
                      <div className="bg-black/70 backdrop-blur-md mx-auto max-w-fit px-4 py-3 rounded-xl border border-white/20 shadow-xl">
                        <div className="flex gap-3 justify-center">
                          {realisation.images.map((image, index) => (
                            <motion.button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (index !== currentImageIndex && !isChanging) {
                                  setDirection(index > currentImageIndex ? 1 : -1);
                                  setTimeout(() => {
                                    // Force l'index spécifique
                                    for (let i = 0; i < Math.abs(index - currentImageIndex); i++) {
                                      if (index > currentImageIndex) {
                                        onNextImage();
                                      } else {
                                        onPreviousImage();
                                      }
                                    }
                                  }, 10);
                                }
                              }}
                              className="relative overflow-hidden transition-all duration-300"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1
                              }}
                              transition={{ 
                                duration: 0.3, 
                                delay: 0.1 + index * 0.05 
                              }}
                            >
                              {/* Wrapper pour éviter les problèmes d'arrondi avec les bordures */}
                              <div className={`rounded-lg ${
                                index === currentImageIndex 
                                  ? 'p-0.5 bg-kote-turquoise/80 shadow-lg shadow-kote-turquoise/20 z-10' 
                                  : 'p-0 bg-white/30 opacity-70 hover:opacity-100 hover:bg-white/40'
                              }`}>
                                {/* Conteneur de l'image miniature */}
                                <div className="h-12 w-16 md:h-16 md:w-24 rounded-[5px] overflow-hidden">
                                  <img
                                    src={image}
                                    alt={`Miniature ${index + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              
                              {/* Indicateur d'image active */}
                              {index === currentImageIndex && (
                                <motion.div
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: '100%' }}
                                  transition={{ duration: 0.3 }}
                                  className="h-0.5 bg-kote-turquoise absolute -bottom-1 left-0 rounded-full"
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Flèches de navigation - positionnées relativement au conteneur d'image */}
              {realisation.images.length > 1 && !isZoomed && (
                <>
                  {/* Flèche gauche */}
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: currentImageIndex === 0 ? 0.3 : 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentImageIndex > 0) {
                        changeImage(-1);
                      }
                    }}
                    disabled={currentImageIndex === 0 || isChanging}
                    className={`absolute left-2 top-[30vh] -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-3 md:p-4 text-white transition-all duration-300 z-30 shadow-lg ${
                      currentImageIndex === 0 || isChanging
                        ? 'opacity-30 cursor-not-allowed' 
                        : 'hover:bg-black/70 hover:scale-110'
                    }`}
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </motion.button>

                  {/* Flèche droite */}
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: currentImageIndex === realisation.images.length - 1 ? 0.3 : 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentImageIndex < realisation.images.length - 1) {
                        changeImage(1);
                      }
                    }}
                    disabled={currentImageIndex === realisation.images.length - 1 || isChanging}
                    className={`absolute right-2 top-[30vh] -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-3 md:p-4 text-white transition-all duration-300 z-30 shadow-lg ${
                      currentImageIndex === realisation.images.length - 1 || isChanging
                        ? 'opacity-30 cursor-not-allowed' 
                        : 'hover:bg-black/70 hover:scale-110'
                    }`}
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Informations du projet - Masquées en mode zoom */}
            {!isZoomed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="w-full text-center text-white"
              >
                <h2 id="lightbox-title" className="text-xl md:text-2xl font-bold text-white mb-1">{realisation.title}</h2>
                <p className="text-kote-turquoise font-medium text-base mb-2">{realisation.location}</p>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-3 max-w-2xl mx-auto line-clamp-3">{realisation.description}</p>
                
                {/* Services/Tags */}
                {realisation.services && realisation.services.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="mb-4"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {realisation.services.slice(0, 4).map((service, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2 py-1 text-xs bg-kote-turquoise/20 text-kote-turquoise font-medium rounded-full border border-kote-turquoise/30"
                        >
                          {service}
                        </span>
                      ))}
                      {realisation.services.length > 4 && (
                        <span className="inline-block px-2 py-1 text-xs bg-white/10 text-white/70 font-medium rounded-full">
                          +{realisation.services.length - 4}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {/* Call to Action */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-2 justify-center"
                >
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full font-medium transition-all duration-300 border border-white/30 text-sm"
                  >
                    Fermer
                  </button>
                  <Link 
                    to="/contact"
                    className="px-4 py-2 bg-kote-turquoise hover:bg-kote-turquoise/80 text-white rounded-full font-medium transition-all duration-300 text-center text-sm"
                  >
                    Demander un devis
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Lightbox; 