import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import CallToAction from '../components/home/CallToAction';
import Lightbox from '../components/common/Lightbox';
import RealisationCard from '../components/common/RealisationCard';
import { realisationCategories } from '../config/realisations.config';
import { fictiveRealisationsData, FictiveRealisationData } from '../config/fictiveRealisations.config';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AnimatedElement from '../components/common/AnimatedElement';
import React from 'react';
import { MdPhotoLibrary } from 'react-icons/md';

const RealisationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentRealisation, setCurrentRealisation] = useState<FictiveRealisationData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredRealisations, setFilteredRealisations] = useState<FictiveRealisationData[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentCategory = selectedCategory ? realisationCategories.find(cat => cat.slug === selectedCategory) : undefined;

  // Vérifier si l'appareil est mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mise à jour des réalisations filtrées lorsque la catégorie change
  useEffect(() => {
    if (currentCategory) {
      const filtered = fictiveRealisationsData.filter(
        (item) => item.categorySlug === currentCategory.slug
      );
      setFilteredRealisations(filtered);
    } else {
      // Pas de catégorie = toutes les réalisations
      setFilteredRealisations(fictiveRealisationsData);
    }
    // Réinitialiser le nombre de projets visibles lors du changement de catégorie
    setVisibleProjects(6);
  }, [selectedCategory, currentCategory]);

  // Mémoisation du nombre de réalisations par catégorie
  const categoryRealisationCount = useMemo(() => {
    const counts: Record<string, number> = {};
    fictiveRealisationsData.forEach((realisation) => {
      counts[realisation.categorySlug] = (counts[realisation.categorySlug] || 0) + 1;
    });
    return counts;
  }, []);

  // Changement de catégorie via les boutons de filtre
  const changeCategory = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    
    // Fermer la lightbox si elle est ouverte lorsqu'on change de catégorie
    if (lightboxOpen) {
      closeLightbox();
    }
    
    // Fermer le menu mobile après sélection d'une catégorie
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Fonction pour activer/désactiver le menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
  
  // Nouvelle fonction pour aller directement à une image spécifique
  const goToImage = (index: number) => {
    if (currentRealisation && index >= 0 && index < currentRealisation.images.length) {
      setCurrentImageIndex(index);
    }
  };
  
  // Charger plus de projets
  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };
  
  // Détermine la taille de la carte selon l'index et le nombre total
  const getCardSize = (idx: number, totalItems: number) => {
    // Si peu d'articles, éviter les grandes cartes
    if (totalItems <= 3) return 'medium';
    
    // Si exactement 6 projets affichés, rendre la première et dernière carte large
    if (totalItems === 6) {
      if (idx === 0 || idx === 5) return 'large';
      return 'medium';
    }
    
    // Si nombre moyen d'articles, une seule carte large au début
    if (totalItems <= 6) {
      if (idx === 0) return 'large';
      return 'medium';
    }
    
    // Pour beaucoup d'articles, pattern sophistiqué
    // Première carte large
    if (idx === 0) return 'large';
    // Une carte large tous les 7 articles
    if ((idx + 2) % 7 === 0) return 'large';
    // Quelques cartes small pour la variété
    if (idx % 6 === 0 && idx !== 0) return 'small';
    return 'medium';
  };
  
  const heroTitle = currentCategory ? currentCategory.heroTitle : "Nos Travaux";
  const heroSubtitle = currentCategory ? currentCategory.heroSubtitle : "Découvrez nos plus belles réalisations en Guadeloupe. Chaque projet est unique et personnalisé selon les souhaits de nos clients.";

  // Projets à afficher (avec limitation)
  const displayedProjects = filteredRealisations.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredRealisations.length;

  return (
    <>
      {/* Hero section */}
      <section className="relative pt-20 pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-kote-blue-dark/80 via-kote-blue-dark/60 to-transparent" />
        <div className="container-kote text-center relative z-10">
          <AnimatedElement delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-md">{heroTitle}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 text-shadow">
              {heroSubtitle}
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Galerie de réalisations - Filtre sombre */}
      <section className="section-dark-overlay">
        <div className="absolute inset-0 z-0 bg-black/70"></div>
        <div className="container-kote relative z-10">
          {/* Filtres de navigation par catégorie */}
          <div className="mb-12">
            <AnimatedElement delay={0.2}>
              {/* Menu mobile déroulant - affiché uniquement sur mobile */}
              <div className="md:hidden w-full mb-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-4 animate-fade-in-up">
                  <button
                    onClick={toggleMobileMenu}
                    className="flex items-center justify-between w-full text-white py-2 focus:outline-none"
                  >
                    <span className="text-xl font-bold flex items-center">
                      {/* Afficher l'icône si une catégorie est sélectionnée ou l'icône par défaut */}
                       <span className={`mr-6 ml-3 h-5 w-5 text-kote-turquoise/80`}>
                         {React.createElement(currentCategory?.icon || MdPhotoLibrary)}
                       </span>
                      {!selectedCategory 
                        ? 'Toutes nos réalisations' 
                        : currentCategory?.title || 'Sélectionner une catégorie'}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {/* Menu déroulant mobile */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileMenuOpen 
                        ? 'max-h-screen opacity-100 mt-4'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-2 px-1">
                      <li>
                        <button
                          onClick={() => changeCategory(null)}
                          className={`w-full text-left px-4 py-2.5 rounded-full transition-all duration-300 ${
                            !selectedCategory 
                              ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <MdPhotoLibrary className={`mr-4 h-5 w-5 ${!selectedCategory ? 'text-white' : 'text-kote-turquoise/80'}`} />
                              <span>Toutes nos réalisations</span>
                            </div>
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-white/10 text-xs rounded-full">
                              {fictiveRealisationsData.length}
                            </span>
                          </div>
                        </button>
                      </li>
                      {realisationCategories.map(cat => (
                        <li key={cat.id}>
                          <button
                            onClick={() => changeCategory(cat.slug)}
                            className={`w-full text-left px-4 py-2.5 rounded-full transition-all duration-300 ${
                              currentCategory?.slug === cat.slug 
                                ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {cat.icon && <cat.icon className={`mr-4 h-5 w-5 ${currentCategory?.slug === cat.slug ? 'text-white' : 'text-kote-turquoise/80'}`} />}
                                <span>{cat.title}</span>
                              </div>
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-white/10 text-xs rounded-full">
                                {categoryRealisationCount[cat.slug] || 0}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Boutons de filtrage - visibles uniquement sur desktop */}
              <div className="hidden md:flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => changeCategory(null)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kote-turquoise flex items-center ${
                    !selectedCategory ? 'bg-kote-turquoise text-white scale-105 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Toutes nos réalisations
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-white/10 text-xs rounded-full">
                    {fictiveRealisationsData.length}
                  </span>
                </button>
                {realisationCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => changeCategory(cat.slug)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kote-turquoise flex items-center group ${
                      currentCategory?.slug === cat.slug ? 'bg-kote-turquoise text-white scale-105 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {cat.icon && <cat.icon className={`mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${currentCategory?.slug === cat.slug ? 'text-white' : 'text-kote-turquoise/80' }`} />}
                    {cat.title}
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-white/10 text-xs rounded-full">
                      {categoryRealisationCount[cat.slug] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </AnimatedElement>
          </div>

          {filteredRealisations.length > 0 ? (
            <>
              {/* Grille mosaïque adaptative */}
              <div className={`grid gap-4 md:gap-6 auto-rows-max ${
                displayedProjects.length <= 2 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : displayedProjects.length <= 4
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                <AnimatePresence mode="popLayout">
                  {displayedProjects.map((realisation: FictiveRealisationData, index) => {
                    const size = getCardSize(index, displayedProjects.length);
                    return (
                      <RealisationCard
                        key={realisation.id}
                        realisation={realisation}
                        index={index}
                        size={size}
                        onClick={openLightbox}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
              
              {/* Bouton "Charger plus" */}
              {hasMoreProjects && (
                <AnimatedElement delay={0.2}>
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMoreProjects}
                      className="group relative inline-flex items-center gap-3 bg-kote-turquoise text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Voir plus de projets</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <FaArrowRight className="transform rotate-90" />
                      </div>
                    </button>
                  </div>
                </AnimatedElement>
              )}
              
              {/* Indicateur de progression */}
              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm">
                  Affichage de {displayedProjects.length} sur {filteredRealisations.length} projet{filteredRealisations.length > 1 ? 's' : ''}
                  {currentCategory ? ` dans la catégorie "${currentCategory.title}"` : ''}
                </p>
                <div className="mt-2 w-full max-w-xs mx-auto bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-kote-turquoise h-full rounded-full transition-all duration-500"
                    style={{ width: `${(displayedProjects.length / filteredRealisations.length) * 100}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <AnimatedElement delay={0.2}>
              <div className="text-center py-16">
                <p className="text-2xl text-white/80 mb-4">Aucune réalisation trouvée pour "{currentCategory?.title || 'cette catégorie'}".</p>
                <p className="text-white/60 mb-8">N'hésitez pas à explorer nos autres projets ou à nous contacter.</p>
                <button 
                  onClick={() => changeCategory(null)}
                  className="mt-6 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-kote-blue-dark bg-kote-turquoise hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kote-turquoise transition-all hover:scale-105"
                >
                  <FaArrowLeft className="mr-3 -ml-1 h-5 w-5" />
                  Voir toutes nos réalisations
                </button>
              </div>
            </AnimatedElement>
          )}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        realisation={currentRealisation}
        currentImageIndex={currentImageIndex}
        onClose={closeLightbox}
        onNextImage={nextImage}
        onPreviousImage={previousImage}
        onGoToImage={goToImage}
      />

      <CallToAction />
    </>
  );
};

export default RealisationsPage; 