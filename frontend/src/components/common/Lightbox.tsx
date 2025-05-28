import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  onGoToImage?: (index: number) => void;
}

const Lightbox = ({ 
  isOpen, 
  realisation, 
  currentImageIndex, 
  onClose, 
  onNextImage, 
  onPreviousImage,
  onGoToImage
}: LightboxProps) => {
  const [direction, setDirection] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  // État pour suivre directement l'index vers lequel naviguer
  const [targetImageIndex, setTargetImageIndex] = useState<number | null>(null);

  // Fonction pour changer d'image avec direction (-1: gauche, 1: droite)
  const changeImage = (newDirection: number) => {
    if (isChanging || !realisation) return;
    
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

  // Effet pour gérer le changement d'index direct via les miniatures
  useEffect(() => {
    if (targetImageIndex !== null && !isChanging && realisation) {
      // Calculer combien d'images il faut défiler et dans quelle direction
      const diff = targetImageIndex - currentImageIndex;
      if (diff !== 0) {
        // Naviguer le nombre exact de fois nécessaire pour atteindre la cible
        const navigateToTarget = () => {
          if (diff > 0) {
            onNextImage();
          } else {
            onPreviousImage();
          }
          // Réinitialiser pour éviter des appels répétés
          setTargetImageIndex(null);
        };
        navigateToTarget();
      } else {
        // Si on est déjà à l'index cible, réinitialiser
        setTargetImageIndex(null);
      }
    }
  }, [targetImageIndex, currentImageIndex, isChanging, realisation, onNextImage, onPreviousImage]);

  // Gestion de la fermeture avec la touche Escape et navigation avec flèches
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          changeImage(-1);
          break;
        case 'ArrowRight':
          changeImage(1);
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
  }, [isOpen, onClose, changeImage]);

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
            onClose();
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
              onClose();
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
                className={`relative rounded-xl overflow-hidden shadow-2xl bg-black/20 h-[60vh] max-h-[60vh] flex items-center justify-center`}
                onClick={(e) => { e.stopPropagation(); }}
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
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={realisation.images[currentImageIndex]} 
                        alt={realisation.title}
                        className={`w-auto h-auto object-contain transition-transform duration-500`}
                      />
                      {/* Logo Koté Piscine et badge catégorie - position absolue par rapport à l'image */}
                      <div className="absolute inset-0 flex items-start justify-between w-full px-2 sm:px-4 z-10 pt-16 sm:pt-4">
                        {/* Badge catégorie à gauche */}
                        <div className="flex-shrink-0">
                          {(() => {
                            const rCat = realisationCategories.find(cat => cat.slug === realisation.categorySlug);
                            if (rCat && rCat.icon) {
                              const IconComponent = rCat.icon;
                              const isAutoNettoyante = rCat.slug === 'auto-nettoyantes';
                              return (
                                <div className={`flex items-center text-white z-10 bg-black/70 backdrop-blur-sm px-2.5 py-2 rounded-lg border border-white/20 ${isAutoNettoyante ? 'hover:bg-kote-turquoise/20 hover:border-kote-turquoise/50 transition-all duration-300 cursor-default group' : ''}`}>
                                  <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 mx-0.5 sm:mx-0 text-kote-turquoise transition-transform duration-300 ${isAutoNettoyante ? 'group-hover:rotate-12 group-hover:scale-110' : ''}`} />
                                  <span className={`text-base font-bold ${isAutoNettoyante ? 'group-hover:text-kote-turquoise transition-colors duration-300' : ''} hidden md:inline ml-2`}>{rCat.title}</span>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>

                        {/* Logo à droite ou en dessous sur mobile */}
                        <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 flex-shrink-0">
                          <img 
                            src={LogoRond} 
                            alt="Koté Piscine" 
                            className="w-auto h-7 sm:h-8 md:h-10 drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                

                {/* Boutons de navigation (positionnés absolument par rapport au conteneur de l'image) */}
                {realisation.images.length > 1 && (
                  <>
                    {/* Bouton Précédent */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeImage(-1);
                      }}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-3 rounded-full bg-black/50 backdrop-blur-sm z-30 hover:bg-black/70 transition-colors"
                      aria-label="Image précédente"
                    >
                      <FaChevronLeft className="h-6 w-6" />
                    </button>
                    {/* Bouton Suivant */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeImage(1);
                      }}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-3 rounded-full bg-black/50 backdrop-blur-sm z-30 hover:bg-black/70 transition-colors"
                      aria-label="Image suivante"
                    >
                      <FaChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Galerie de miniatures - Uniquement si plus d'une image */}
              {realisation.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute bottom-3 left-0 right-0 z-20 mx-auto"
                >
                  <div className="bg-black/70 backdrop-blur-md mx-auto max-w-fit px-4 py-3 rounded-xl border border-white/20 shadow-xl">
                    <div className="flex gap-3 justify-center">
                      {realisation.images.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (index !== currentImageIndex && !isChanging) {
                              // Définir la direction de l'animation
                              setDirection(index > currentImageIndex ? 1 : -1);
                              // Si la fonction onGoToImage est disponible, l'utiliser pour aller directement à l'image
                              if (onGoToImage) {
                                onGoToImage(index);
                              }
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
                </motion.div>
              )}

            </div>

            {/* Informations du projet */}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Lightbox; 