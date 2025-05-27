import { useState, useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Définir le style global pour les animations
const animationStyles = `
  @keyframes arrowPulseLeft {
    0%, 100% { transform: translateX(0); opacity: 0.7; }
    50% { transform: translateX(-5px); opacity: 1; }
  }
  
  @keyframes arrowPulseRight {
    0%, 100% { transform: translateX(0); opacity: 0.7; }
    50% { transform: translateX(5px); opacity: 1; }
  }
  
  @keyframes slideLeft {
    0% { transform: translateX(10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideRight {
    0% { transform: translateX(-10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  /* Définition de la classe manquante */
  .perspective-2000 {
    perspective: 2000px;
  }

  /* Styles pour les flèches de navigation */
  .nav-zone {
    transition: all 0.3s ease;
    pointer-events: all !important; /* Assurer que les événements de souris sont capturés */
  }
  
  .nav-zone:hover {
    background: rgba(64, 192, 240, 0.05); /* Légère surbrillance au survol */
  }
  
  .nav-arrow {
    opacity: 0.25; /* Légèrement plus visible par défaut */
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .nav-zone:hover .nav-arrow {
    opacity: 1 !important;
  }
  
  /* Assurer que les flèches restent visibles pendant le clic et l'animation */
  .nav-zone:active .nav-arrow,
  .nav-zone.active .nav-arrow {
    opacity: 1 !important;
  }
  
  /* Style pour la zone active */
  .nav-zone:active,
  .nav-zone.active {
    background: rgba(64, 192, 240, 0.1); /* Surbrillance plus prononcée pendant le clic */
  }
`;

const testimonials = [
  {
    id: 1,
    name: "Michel D.",
    location: "Le Gosier, Guadeloupe",
    date: "Mar 2023",
    testimonial: "Koté Piscine a réalisé ma piscine sur-mesure avec professionnalisme. Délais respectés, équipe à l'écoute, résultat impeccable. Je recommande vivement !",
    rating: 5,
    avatar: "avatar-1.svg",
  },
  {
    id: 2,
    name: "Sophie L.",
    location: "Sainte-Anne, Guadeloupe",
    date: "Fév 2023",
    testimonial: "Notre piscine avait besoin d'une rénovation complète. Koté Piscine a effectué un travail remarquable. Leur expertise a permis de résoudre tous nos problèmes techniques.",
    rating: 5,
    avatar: "avatar-2.svg",
  },
  {
    id: 3,
    name: "Jean-Marc B.",
    location: "Saint-François, Guadeloupe",
    date: "Avr 2023",
    testimonial: "Nous faisons appel à Koté Piscine pour l'entretien hebdomadaire de notre piscine depuis 5 ans. Service ponctuel et efficace. Notre piscine est toujours impeccable !",
    rating: 5,
    avatar: "avatar-3.svg",
  },
  {
    id: 4,
    name: "Marie Elfe",
    location: "Petit-Bourg, Guadeloupe",
    date: "Jan 2023",
    testimonial: "L'équipe de Koté Piscine nous a aidé à choisir les équipements automatisés adaptés à nos besoins. Installation parfaite et conseils judicieux.",
    rating: 4,
    avatar: "avatar-4.svg",
  },
];

// Constants pour le composant
const TRANSITION_DURATION = 600; // Durée de transition en ms

const Testimonials = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeArrow, setActiveArrow] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentRadius, setCurrentRadius] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calcul du rayon optimal pour avoir au moins 3 cartes visibles sans chevauchement
  const calculateOptimalRadius = useCallback(() => {
    const containerWidth = carouselRef.current?.clientWidth || window.innerWidth * 0.8;
    const cardWidth = 310; // Largeur d'une carte + marge
    const angleInRadians = (2 * Math.PI) / testimonials.length;
    const minDistance = cardWidth + 60; // Marge de 60px entre les cartes
    const minRadius = minDistance / (2 * Math.sin(angleInRadians / 2));
    
    // Ajustement du rayon en fonction de la taille d'écran
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    if (isMobile) {
      return 0; // En mode mobile, pas de cercle (slide simple)
    } else if (isTablet) {
      return Math.min(containerWidth / 2, Math.max(minRadius, 360));
    } else {
      return Math.min(containerWidth / 1.6, Math.max(minRadius, 460));
    }
  }, []);
  
  // Mettre à jour le rayon et l'état mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newRadius = calculateOptimalRadius();
      
      setIsMobile(newIsMobile);
      setCurrentRadius(newRadius);

      // Si on passe de mobile à desktop ou vice versa, réinitialiser l'angle de rotation
      if (newIsMobile !== isMobile) {
        setRotationAngle(0);
      }
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
  }, [calculateOptimalRadius, isMobile]);
  
  // Angle entre chaque carte (distribué également sur 360°)
  const angleBetweenCards = 360 / testimonials.length;
  

  
  // Fonction pour aller à une carte spécifique avec rotation optimisée
  const goToCard = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    
    // Trouver le chemin le plus court (sens horaire ou antihoraire)
    let angleDiff;
    
    // Calculer la distance dans les deux sens et prendre le plus court
    const clockwiseDist = index > activeIndex 
      ? (index - activeIndex) 
      : (testimonials.length - activeIndex + index);
      
    const counterClockwiseDist = index < activeIndex 
      ? (activeIndex - index) 
      : (activeIndex + testimonials.length - index);
    
    // Utiliser le chemin le plus court
    if (clockwiseDist <= counterClockwiseDist) {
      // Sens horaire (négatif)
      angleDiff = clockwiseDist * angleBetweenCards;
    } else {
      // Sens antihoraire (positif)
      angleDiff = -counterClockwiseDist * angleBetweenCards;
    }
    
    const targetAngle = rotationAngle + angleDiff;
    const startAngle = rotationAngle;
    let startTime: number | null = null;
    
    // Durée d'animation adaptative selon la distance
    const positions = Math.min(clockwiseDist, counterClockwiseDist);
    const duration = Math.min(1200, Math.max(TRANSITION_DURATION, 300 + positions * 150));
    
    const animateRotation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour animation fluide
      const easing = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easing(progress);
      const currentAngle = startAngle * (1 - easedProgress) + targetAngle * easedProgress;
      const roundedAngle = Math.round(currentAngle * 10000) / 10000;
      
      setRotationAngle(roundedAngle);
      
      // Mise à jour de l'index actif et fin de l'animation
      if (progress >= 1) {
        setActiveIndex(index);
        setIsAnimating(false);
        
        // Réinitialiser l'arrow active à la fin de l'animation
        setTimeout(() => {
          setActiveArrow(null);
        }, 100);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateRotation);
      }
    };
    
    requestAnimationFrame(animateRotation);
  }, [isAnimating, activeIndex, rotationAngle, angleBetweenCards]);
  
  // Recalculer le rayon et réinitialiser la rotation si la fenêtre est redimensionnée
  useEffect(() => {
    const handleResize = () => {
      // Forcer le recalcul du rayon
      setRotationAngle(prev => prev);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rendu des étoiles pour la notation
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-kote-green' : 'text-gray-300'} transition-colors duration-300`} 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Fonction pour rendre l'avatar
  const renderAvatar = (avatar: string) => {
    const avatarPath = `/KotePiscine/images/avatars/${avatar}`;
    const placeholderPath = `/KotePiscine/images/avatars/avatar-placeholder.svg`;
    
    return (
      <img
        src={avatarPath}
        alt="Avatar du client"
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = placeholderPath;
        }}
      />
    );
  };

  // Style pour chaque carte basé sur sa position
  const getCardStyle = (index: number) => {
    if (isMobile) {
      // Style pour le mode slide sur mobile
      const translateX = (index - activeIndex) * 100;
      return {
        transform: `translateX(${translateX}%)`,
        position: 'absolute' as const,
        left: 0,
        right: 0,
        top: '50%',
        marginTop: '-190px',
        transition: `transform ${isAnimating ? TRANSITION_DURATION : 300}ms cubic-bezier(0.33, 1, 0.68, 1)`,
        visibility: Math.abs(index - activeIndex) <= 1 ? 'visible' as const : 'hidden' as const,
        zIndex: index === activeIndex ? 30 : 10,
        opacity: 1
      };
    }

    // Calcul existant pour les grands écrans
    const baseAngle = angleBetweenCards * index;
    const relativeAngle = (baseAngle - rotationAngle) % 360;
    const normalizedAngle = ((relativeAngle + 360) % 360);
    
    // Position sur le cercle
    const angleInRadians = (normalizedAngle * Math.PI) / 180;
    const baseX = Math.sin(angleInRadians) * currentRadius;
    const z = Math.cos(angleInRadians) * currentRadius;
    
    // Visibilité et opacité
    let opacity = 1;
    let visibility = 'visible';
    let zIndex = 10;
    let blur = 0;
    let scale = 0.75 + (0.25 * Math.cos(angleInRadians));
    
    // Déterminer si la carte est dans la zone visible (centrée autour de 0/360°)
    const visibleAngleStart = 270; // 270 degrés (gauche)
    const visibleAngleEnd = 90;    // 90 degrés (droite)
    const fadeInStart = visibleAngleStart - 30;
    const fadeOutEnd = visibleAngleEnd + 30;
    
    const isInMainVisibleRange = 
      normalizedAngle >= visibleAngleStart || normalizedAngle <= visibleAngleEnd;
    
    const isInTransitionRange = 
      (normalizedAngle >= fadeInStart && normalizedAngle < visibleAngleStart) || 
      (normalizedAngle > visibleAngleEnd && normalizedAngle <= fadeOutEnd);
    
    if (!isInMainVisibleRange && !isInTransitionRange) {
      // Cartes à l'arrière (180°) invisibles
      visibility = 'hidden';
      opacity = 0;
      zIndex = 0;
    } else if (normalizedAngle >= fadeInStart && normalizedAngle < visibleAngleStart) {
      // Transition douce pour l'entrée des cartes de gauche
      const progress = (normalizedAngle - fadeInStart) / (visibleAngleStart - fadeInStart);
      const smoothProgress = Math.pow(progress, 0.8);
      opacity = smoothProgress;
      blur = (1 - smoothProgress) * 4;
      zIndex = 5;
    } else if (normalizedAngle > visibleAngleEnd && normalizedAngle <= fadeOutEnd) {
      // Transition douce pour l'entrée des cartes de droite
      const progress = 1 - ((normalizedAngle - visibleAngleEnd) / (fadeOutEnd - visibleAngleEnd));
      const smoothProgress = Math.pow(progress, 0.8);
      opacity = smoothProgress;
      blur = (1 - smoothProgress) * 4;
      zIndex = 5;
    } else {
      // Z-index pour effet de profondeur - les cartes à l'avant ont un z-index élevé
      if (normalizedAngle >= 330 || normalizedAngle <= 30) {
        zIndex = 30; // Carte frontale (centrée)
      } else if (normalizedAngle >= 300 || normalizedAngle <= 60) {
        zIndex = 20; // Cartes secondaires
      }
    }
    
    // Carte active mise en avant
    if (index === activeIndex) {
      zIndex += 40;
    }
    
    // Appliquer un léger décalage vers l'intérieur pour les cartes
    let x = baseX;
    
    return {
      transform: `translate3d(${x}px, 0, ${z}px) rotateY(0deg) scale(${scale})`,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      visibility: visibility as 'visible' | 'hidden',
      zIndex,
      transition: `transform ${isAnimating ? TRANSITION_DURATION : 300}ms cubic-bezier(0.33, 1, 0.68, 1), 
                   opacity 0.7s ease-out, 
                   filter 0.7s ease-out`
    };
  };

  // Obtenir l'index de la carte à gauche et à droite pour la navigation
  const getAdjacentCardIndex = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      return (activeIndex - 1 + testimonials.length) % testimonials.length;
    } else {
      return (activeIndex + 1) % testimonials.length;
    }
  }, [activeIndex]);

  // Fonction pour gérer les clics sur les zones de navigation
  const handleNavClick = useCallback((direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    // Enregistrer la direction active pour maintenir la flèche visible
    setActiveArrow(direction);
    
    const targetIndex = getAdjacentCardIndex(direction);
    goToCard(targetIndex);
  }, [isAnimating, goToCard, getAdjacentCardIndex]);

  return (
    <section 
      className="pb-20 pt-4 relative overflow-hidden"
      aria-label="Témoignages clients"
    >
      {/* Intégrer les styles d'animation */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Overlay dégradé */}

      
      <div className="container-kote relative z-10 mx-auto">
        
        <h2 className="section-title relative z-10 text-white pb-1 mb-8 sm:mb-10 md:mb-12 mt-4">
          Avis clients
          <div className="absolute h-1 w-24 bg-kote-turquoise rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </h2>
        
        {/* Carte statique Google Review Rating */}
        <div className="flex justify-center mb-8 relative z-[2000]">
          <div className="w-full max-w-3xl relative group px-4">
            <div className="absolute -z-10 inset-0 rounded-2xl bg-black/40 blur-md transform scale-[0.95] translate-y-1 opacity-50 transition-all duration-500 group-hover:scale-[0.92] group-hover:translate-y-2 group-hover:opacity-70"></div>
            <div className="transform-gpu transition-all duration-500 ease-out">
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 py-3 px-6">
                {/* Effet de reflet en haut de la carte */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Logo Google */}
                  <div className="w-full md:w-[140px] mb-4 md:mb-0">
                    <div className="p-1.5 bg-white rounded-full shadow-md flex-shrink-0 transition-transform duration-300 flex items-center justify-center gap-2">
                      {/* Google G Logo */}
                      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {/* Texte Avis */}
                      <span className="text-[#5F6368] text-sm font-medium">Avis Clients</span>
                    </div>
                  </div>
                  
                  {/* Bloc central */}
                  <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
                    <p className="font-bold text-white text-lg leading-tight text-shadow-sm text-center md:text-left">Excellent</p>
                    
                    {/* Étoiles */}
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, index) => (
                        <svg 
                          key={index} 
                          className="w-5 h-5 text-kote-green transition-colors duration-300" 
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-white/90 text-sm whitespace-nowrap">Basé sur 4 Avis</p>
                  </div>
                  
                  {/* CTA pour écrire un avis */}
                  <div className="w-full md:w-[140px] flex justify-center md:justify-end">
                    <a 
                      href="https://g.page/r/CYhqzVXoRdjdEBM/review" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open("https://g.page/r/CYhqzVXoRdjdEBM/reviews", "_blank", "noopener,noreferrer");
                      }}
                      className="px-4 py-2.5 bg-kote-turquoise/80 hover:bg-kote-turquoise text-white text-sm font-semibold rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center space-x-1.5 shadow-lg whitespace-nowrap"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Écrire un avis</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carrousel 3D ou Swiper selon la taille d'écran */}
        {isMobile ? (
          <div className="relative h-[420px] mx-auto mb-16 z-30 px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full h-full"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[280px] max-w-full mx-auto relative">
                      {/* Effet d'ombre projetée pour la 3D */}
                      <div 
                        className="absolute -z-10 inset-0 rounded-2xl bg-black/40 blur-md transform scale-[0.95] translate-y-1 opacity-50 transition-all duration-500"
                        aria-hidden="true"
                      ></div>

                      {/* Wrapper de carte avec effet 3D */}
                      <div className="transform-gpu transition-all duration-500 ease-out">
                        {/* Container avec effet verre */}
                        <div 
                          className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 p-5 h-[380px] flex flex-col"
                        >
                          {/* Effet de reflet en haut de la carte */}
                          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                          
                          <div className="relative z-10 flex flex-col h-full">
                            {/* En-tête avec identité et date */}
                            <div className="flex items-start space-x-3 mb-5">
                              {/* Avatar */}
                              <div className="p-0.5 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30">
                                  {renderAvatar(testimonial.avatar)}
                                </div>
                              </div>
                              
                              {/* Informations utilisateur alignées */}
                              <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center w-full mb-1">
                                  <p className="font-bold text-white text-base text-shadow-sm">
                                    {testimonial.name}
                                  </p>
                                  <p className="text-kote-turquoise font-medium text-base">
                                    {testimonial.date}
                                  </p>
                                </div>
                                
                                <div className="flex justify-between items-center w-full">
                                  <div className="flex">
                                    {renderStars(testimonial.rating)}
                                  </div>
                                  
                                  {/* Badge Google Review repositionné */}
                                  <div className="flex items-center bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Guillemets décoratifs ajustés */}
                            <div className="absolute top-16 left-2 text-5xl text-white/10 font-serif">"</div>
                            
                            {/* Témoignage central occupant la majeure partie de l'espace */}
                            <blockquote className="italic text-base text-white flex-grow line-clamp-7 text-shadow-sm px-6 pt-2 pb-3 leading-relaxed">
                              {testimonial.testimonial}
                            </blockquote>
                            
                            <div className="absolute bottom-8 right-2 text-5xl text-white/10 font-serif rotate-180">"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
        <div 
          className="relative h-[420px] perspective-2000 mx-auto overflow-visible mb-16 z-30 px-4 md:px-0"
        >
          {/* Conteneur des témoignages - placé en arrière-plan (z-index inférieur) */}
          <div 
            ref={carouselRef}
            className="absolute inset-0 w-full h-full z-10"
          >
            {testimonials.map((testimonial, index) => {
              const cardStyle = getCardStyle(index);

              
              return (
              <div 
                key={testimonial.id}
                className="absolute top-0 left-0 w-full h-full transform-gpu flex items-center justify-center"
                style={cardStyle}
                role="presentation"
              >
                <div className="w-[280px] max-w-full mx-auto relative">
                  {/* Effet d'ombre projetée pour la 3D */}
                  <div 
                    className="absolute -z-10 inset-0 rounded-2xl bg-black/40 blur-md transform scale-[0.95] translate-y-1 opacity-50 transition-all duration-500"
                    aria-hidden="true"
                  ></div>

                  {/* Wrapper de carte avec effet 3D */}
                  <div className="transform-gpu transition-all duration-500 ease-out">
                    {/* Container avec effet verre */}
                    <div 
                      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 p-5 h-[380px] flex flex-col"
                    >
                      {/* Effet de reflet en haut de la carte */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        {/* En-tête avec identité et date */}
                        <div className="flex items-start space-x-3 mb-5">
                          {/* Avatar */}
                          <div className="p-0.5 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30">
                              {renderAvatar(testimonial.avatar)}
                            </div>
                          </div>
                          
                          {/* Informations utilisateur alignées */}
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-center w-full mb-1">
                              <p className="font-bold text-white text-base text-shadow-sm">
                                {testimonial.name}
                              </p>
                              <p className="text-kote-turquoise font-medium text-base">
                                {testimonial.date}
                              </p>
                            </div>
                            
                            <div className="flex justify-between items-center w-full">
                              <div className="flex">
                                {renderStars(testimonial.rating)}
                              </div>
                              
                              {/* Badge Google Review repositionné */}
                              <div className="flex items-center bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Guillemets décoratifs ajustés */}
                        <div className="absolute top-16 left-2 text-5xl text-white/10 font-serif">"</div>
                        
                        {/* Témoignage central occupant la majeure partie de l'espace */}
                        <blockquote className="italic text-base text-white flex-grow line-clamp-7 text-shadow-sm px-6 pt-2 pb-3 leading-relaxed">
                          {testimonial.testimonial}
                        </blockquote>
                        
                        <div className="absolute bottom-8 right-2 text-5xl text-white/10 font-serif rotate-180">"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
          
          {/* Indicateur de numéro de carte minimaliste et créatif */}
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 shadow-lg">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  onClick={() => goToCard(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-500 transform 
                    ${index === activeIndex 
                      ? 'bg-kote-turquoise w-8 scale-100' 
                      : 'bg-white/30 hover:bg-white/50 scale-90'}`}
                  role="button"
                  aria-label={`Aller au témoignage ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                />
              ))}
              <div className="ml-2 text-white/80 text-xs font-light">
                <span className="font-bold text-kote-turquoise">{activeIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{testimonials.length}</span>
              </div>
            </div>
          </div>
          
          {/* Zone de navigation gauche - au premier plan avec z-index élevé */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-1/2 z-[1000] my-24 cursor-pointer nav-zone ${activeArrow === 'left' ? 'active' : ''}`}
            onClick={() => handleNavClick('left')}
            onMouseEnter={() => setActiveArrow('left')}
            onMouseLeave={() => setActiveArrow(null)}
            role="button"
            aria-label="Témoignage précédent"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('left');
              }
            }}
            style={{
              pointerEvents: 'auto',
              background: 'transparent'
            }}
          >
            {/* Flèche gauche visible en permanence */}
            <div className={`absolute left-30 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeArrow === 'left' ? 'opacity-100 scale-110' : 'opacity-30 scale-100'} pointer-events-none`}>
              <div className="bg-kote-turquoise/80 p-3 rounded-full shadow-lg animate-[arrowPulseLeft_1.5s_ease-in-out_infinite] relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Zone de navigation droite - au premier plan avec z-index élevé */}
          <div 
            className={`absolute right-0 top-0 bottom-0 w-1/2 z-[1000] my-24  cursor-pointer nav-zone ${activeArrow === 'right' ? 'active' : ''}`}
            onClick={() => handleNavClick('right')}
            onMouseEnter={() => setActiveArrow('right')}
            onMouseLeave={() => setActiveArrow(null)}
            role="button"
            aria-label="Témoignage suivant"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('right');
              }
            }}
            style={{
              pointerEvents: 'auto',
              background: 'transparent'
            }}
          >
            {/* Flèche droite visible en permanence */}
            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeArrow === 'right' ? 'opacity-100 scale-110' : 'opacity-30 scale-100'} pointer-events-none`}>
              <div className="bg-kote-turquoise/80 p-3 rounded-full shadow-lg animate-[arrowPulseRight_1.5s_ease-in-out_infinite] relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        )}
        
        {/* Instructions d'accessibilité visibles uniquement pour les lecteurs d'écran */}
        <div className="sr-only">
          Utilisez les flèches gauche et droite du clavier pour naviguer entre les témoignages, ou cliquez sur les cartes adjacentes pour voir le témoignage suivant ou précédent.
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 