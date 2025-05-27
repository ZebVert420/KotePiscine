import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect, useRef } from 'react';
import CtaButton from '../common/CtaButton';
import AnimatedElement from '../common/AnimatedElement';
import { GiWaterSplash, GiTrowel } from 'react-icons/gi';
import { TbPool, TbTool } from 'react-icons/tb';
import logoKote from '../../images/logo/Couleur Vertical.png';

// Reprise des données de service pour les intégrer dans le Hero
const heroServicesData = [
  {
    id: 1,
    title: 'Construction',
    description: 'Piscines sur-mesure parfaitement adaptées à votre terrain',
    icon: <TbPool className="h-10 w-10 text-white" />,
    link: '/services/construction-piscine'
  },
  {
    id: 2,
    title: 'Entretien',
    description: 'Maintenez votre piscine en parfait état toute l\'année',
    icon: <GiWaterSplash className="h-10 w-10 text-white" />,
    link: '/services/entretien-piscine'
  },
  {
    id: 3,
    title: 'Rénovation',
    description: 'Redonnez une seconde vie à votre espace aquatique',
    icon: <GiTrowel className="h-10 w-10 text-white" />,
    link: '/services/renovation-piscine'
  },
  {
    id: 4,
    title: 'Réparation',
    description: 'Service technique pour vos robots et pompes de piscine',
    icon: <TbTool className="h-10 w-10 text-white" />,
    link: '/services/reparation-piscine'
  }
].filter(service => service.title !== 'Automatismes');

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [heroHeight, setHeroHeight] = useState<number | null>(null);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeroHeight = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const navbar = document.getElementById('main-navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Vérifie si les deux conditions sont remplies pour la hauteur pleine écran
      if (windowWidth >= 1280 && windowHeight >= 840) {
        setHeroHeight(windowHeight - navbarHeight);
        setIsFullHeight(true);
      } else {
        // Si l'une des conditions n'est pas remplie, on laisse la hauteur s'adapter au contenu
        setHeroHeight(null);
        setIsFullHeight(false);
      }
    };
    
    calculateHeroHeight();
    window.addEventListener('resize', calculateHeroHeight);
    return () => window.removeEventListener('resize', calculateHeroHeight);
  }, []);

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

  return (
    <section 
      className="section-base relative bg-cover bg-center overflow-hidden" 
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: heroHeight ? `${heroHeight}px` : undefined,
      }}
    >

      
      <div className="container-kote relative z-10 flex flex-col h-full lg:justify-start">
        {/* Logo Koté Piscine - avec marges responsives */}
        <div 
          ref={logoContainerRef}
          className={`flex justify-center items-center ${isFullHeight ? 'lg:flex-grow' : ''} min-h-[100px] mt-2 sm:mt-3 md:mt-4 lg:mt-6 mb-2 sm:mb-3 md:mb-4 lg:mb-2 relative z-[2000]`}
        >
          <div className={`relative ${isFullHeight ? 'lg:h-full' : ''} max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[400px] xl:max-w-[500px] transform transition-all duration-700 md:w-auto`}>
            {/* Couches multiples pour un halo lumineux prononcé mais diffus */}
            <div className="absolute -inset-8 sm:-inset-12 md:-inset-16 lg:-inset-20 -z-10 rounded-[180px] bg-white/10 blur-3xl"></div>
            <div className="absolute -inset-6 sm:-inset-10 md:-inset-12 lg:-inset-16 -z-10 rounded-[180px] bg-white/15 blur-3xl"></div>
            <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 lg:-inset-10 -z-10 rounded-[180px] bg-white/20 blur-2xl"></div>
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 lg:-inset-5 -z-10 rounded-[180px] bg-white/15 blur-xl"></div>
            
            {/* Nouveau wrapper pour l'image avec overflow-hidden */}
            <div className="relative h-full w-full overflow-hidden">
              <img 
                src={logoKote} 
                alt="Koté Piscine - Spécialiste à vos côtés" 
                className="w-auto mx-auto object-contain object-top relative z-10 drop-shadow-xl"
                style={{ height: 'calc(100% + 10%)' }}
              />
            </div>
          </div>
        </div>
        
        {/* Titre discret au-dessus des cartes */}
        <AnimatedElement delay={0}>
          <h1 className="text-center text-white text-3xl md:text-4xl lg:text-4xl font-bold mt-4 md:mt-2 lg:mt-2 pb-12  opacity-90">
            Spécialiste à vos côtés
            <div className="absolute h-1 w-56 bg-kote-turquoise rounded-full bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-10"></div>
          </h1>
        </AnimatedElement>
        
        {isMobile ? (
          <AnimatedElement delay={0.3}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full perspective-1000"
            >
              {heroServicesData.map((service, index) => (
                <SwiperSlide key={service.id}>
                  <AnimatedElement delay={index * 0.1}>
                    <div className="relative group will-change-transform px-4">
                      {/* Effet d'ombre projetée pour la 3D */}
                      <div 
                        className="absolute -z-10 inset-0 rounded-2xl bg-black/40 blur-md transform scale-[0.95] translate-y-1 opacity-50 transition-all duration-500 group-hover:scale-[0.92] group-hover:translate-y-2 group-hover:opacity-70"
                        aria-hidden="true"
                      ></div>
                    
                      {/* Wrapper de carte avec effet 3D */}
                      <div className="card-3d-wrapper transform-gpu transition-all duration-500 ease-out group-hover:rotate-y-10 group-hover:rotate-x-10">
                        <Link 
                          to={service.link}
                          className="relative block h-full will-change-transform"
                        >
                          {/* Couche de verre principale */}
                          <div className="card-glass-transparent card-glass-reflect h-[260px] overflow-hidden transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] group-hover:bg-white/15">
                            <div className="card-shadow-projected" aria-hidden="true"></div>
                            {/* Effet de reflet en haut de la carte */}
                            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                            
                            {/* Effet de brillance au survol */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-kote-turquoise/20 via-white/5 to-transparent"></div>

                            <div className=" p-4 relative z-10 flex flex-col h-full">
                              {/* Header horizontal : icône + titre */}
                              <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20 w-fit transform group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 will-change-transform">
                                  <div className="transform transition-transform duration-700 group-hover:rotate-6 will-change-transform">
                                    {service.icon}
                                  </div>
                                </div>
                                <h3 className="text-1xl md:text-2xl lg:text-2xl font-bold text-white group-hover:text-kote-turquoise transition-colors duration-500 text-shadow-sm m-0">
                                  {service.title}
                                </h3>
                              </div>
                              
                              <p className="text-base md:text-lg text-white/80 mb-5 flex-grow text-shadow-sm">
                                {service.description}
                              </p>
                              
                              <div className="flex items-center text-kote-turquoise font-medium mt-auto group-hover:translate-x-2 transition-transform duration-500 will-change-transform">
                                <span className="mr-2">Découvrir</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimatedElement>
        ) : (
          <AnimatedElement delay={0.3}>
            <div className="perspective-1000 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
              {heroServicesData.map((service, index) => (
                <AnimatedElement key={service.id} delay={index * 0.1 + 0.3}>
                  <div
                    className="relative group will-change-transform"
                  >
                    {/* Effet d'ombre projetée pour la 3D */}
                    <div 
                      className="absolute -z-10 inset-0 rounded-2xl bg-black/40 blur-md transform scale-[0.95] translate-y-1 opacity-50 transition-all duration-500 group-hover:scale-[0.92] group-hover:translate-y-2 group-hover:opacity-70"
                      aria-hidden="true"
                    ></div>
                  
                    {/* Wrapper de carte avec effet 3D */}
                    <div className="card-3d-wrapper transform-gpu transition-all duration-500 ease-out group-hover:rotate-y-10 group-hover:rotate-x-10">
                      <Link 
                        to={service.link}
                        className="relative block h-full will-change-transform"
                      >
                        {/* Couche de verre principale */}
                        <div className="card-glass-transparent card-glass-reflect h-[260px] overflow-hidden transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] group-hover:bg-white/15">
                          <div className="card-shadow-projected" aria-hidden="true"></div>
                          {/* Effet de reflet en haut de la carte */}
                          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                          
                          {/* Effet de brillance au survol */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-kote-turquoise/20 via-white/5 to-transparent"></div>

                          <div className="p-4 relative z-10 flex flex-col h-full">
                            {/* Header horizontal : icône + titre */}
                            <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20 w-fit transform group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 will-change-transform">
                                <div className="transform transition-transform duration-700 group-hover:rotate-6 will-change-transform">
                                  {service.icon}
                                </div>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-kote-turquoise transition-colors duration-500 text-shadow-sm m-0">
                                {service.title}
                              </h3>
                            </div>
                            
                            <p className="text-base md:text-lg text-white/80 mb-5 flex-grow text-shadow-sm">
                              {service.description}
                            </p>
                            
                            <div className="flex items-center text-kote-turquoise font-medium mt-auto group-hover:translate-x-2 transition-transform duration-500 will-change-transform">
                              <span className="mr-2">Découvrir</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        )}
        
        <AnimatedElement delay={0.7}>
          <div className="text-center mt-12">
            <CtaButton 
              to="/services" 
              text="Tous nos services"
              color="green"
              size="large"
              icon="arrow"
            />
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Hero; 