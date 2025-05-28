import React, { useState, useEffect } from 'react';
import { fictiveRealisationsData, FictiveRealisationData } from '../../config/fictiveRealisations.config';
import RealisationCard from './RealisationCard';
import { Link } from 'react-router-dom';
import AnimatedElement from './AnimatedElement'; // Assuming AnimatedElement is in common
import { FaArrowRight } from 'react-icons/fa';
import Lightbox from './Lightbox';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface RealisationsSectionProps {
  numberOfRealisations?: number;
}

const RealisationsSection: React.FC<RealisationsSectionProps> = ({ numberOfRealisations = 6 }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // États pour la lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentRealisation, setCurrentRealisation] = useState<FictiveRealisationData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Prendre les N premières réalisations fictives
  const realisationsToDisplay = fictiveRealisationsData.slice(0, numberOfRealisations);

  // Mettre à jour l'état mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialisation
    handleResize();
    
    // Debounce le redimensionnement pour de meilleures performances
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Fonctions pour la lightbox
  const openLightbox = (realisation: FictiveRealisationData) => {
    setCurrentRealisation(realisation);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentRealisation(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentRealisation && currentImageIndex < currentRealisation.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <section className="relative py-16 section-dark-overlay w-full">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="container-kote relative z-10">
        <AnimatedElement delay={0.1}>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Nos dernières réalisations
          </h2>
        </AnimatedElement>
        
        {realisationsToDisplay.length > 0 ? (
          isMobile ? (
            // Vue mobile avec Swiper
            <div className="relative mb-8">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full"
              >
                {realisationsToDisplay.map((realisation, index) => (
                  <SwiperSlide key={realisation.id}>
                    <div className="h-full">
                      <RealisationCard
                        realisation={realisation}
                        index={index}
                        size="medium"
                        onClick={openLightbox}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            // Vue desktop avec grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realisationsToDisplay.map((realisation, index) => (
                <div key={realisation.id} className="h-full">
                  <RealisationCard
                    realisation={realisation}
                    index={index}
                    size="medium"
                    onClick={openLightbox}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <AnimatedElement delay={0.2}>
            <div className="text-center py-8">
              <p className="text-2xl text-white/80">Aucune réalisation à afficher pour le moment.</p>
            </div>
          </AnimatedElement>
        )}

        {/* CTA Voir tout */}
        <AnimatedElement delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/realisations"
              className="group relative inline-flex items-center gap-3 bg-kote-turquoise text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Voir toutes nos réalisations</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <FaArrowRight className="transform" />
              </div>
            </Link>
          </div>
        </AnimatedElement>

      </div>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        realisation={currentRealisation}
        currentImageIndex={currentImageIndex}
        onClose={closeLightbox}
        onNextImage={nextImage}
        onPreviousImage={previousImage}
      />
    </section>
  );
};

export default RealisationsSection; 