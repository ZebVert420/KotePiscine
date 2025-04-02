import { Link } from 'react-router-dom';
import heroBg from '../../images/illustrations/entretien-piscine.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from 'react';
import CtaButton from '../common/CtaButton';
import AnimatedElement from '../common/AnimatedElement';
import { MdOutlineSettingsRemote } from 'react-icons/md';
import { GiWaterSplash, GiTrowel } from 'react-icons/gi';
import { TbPool, TbTool } from 'react-icons/tb';

// Reprise des données de service pour les intégrer dans le Hero
const heroServicesData = [
  {
    id: 1,
    title: 'Construction',
    description: 'Piscines sur-mesure parfaitement adaptées à votre terrain',
    icon: <TbPool className="h-10 w-10 text-white" />,
    link: '/services/construction'
  },
  {
    id: 2,
    title: 'Entretien',
    description: 'Maintenez votre piscine en parfait état toute l\'année',
    icon: <GiWaterSplash className="h-10 w-10 text-white" />,
    link: '/services/entretien'
  },
  {
    id: 3,
    title: 'Rénovation',
    description: 'Redonnez une seconde vie à votre espace aquatique',
    icon: <GiTrowel className="h-10 w-10 text-white" />,
    link: '/services/renovation'
  },
  {
    id: 4,
    title: 'Automatismes',
    description: 'Simplifiez la gestion quotidienne de votre piscine',
    icon: <MdOutlineSettingsRemote className="h-10 w-10 text-white" />,
    link: '/services/automatismes'
  },
  {
    id: 5,
    title: 'Réparation',
    description: 'Service technique pour vos robots et pompes de piscine',
    icon: <TbTool className="h-10 w-10 text-white" />,
    link: '/services/reparation'
  }
];

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      className="relative pt-40 pb-28 bg-cover bg-center overflow-hidden" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '800px'
      }}
    >
      {/* Overlay dégradé animé avec particules */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-kote-blue-dark/80 via-kote-blue-dark/60 to-transparent"
        style={{ 
          animation: 'gradientShift 8s ease-in-out infinite alternate',
        }}
        aria-hidden="true"
      />
      
      <div className="container-kote relative z-10 flex flex-col justify-center h-full">
        {/* Titre discret au-dessus des cartes */}
        <AnimatedElement delay={0}>
          <h1 className="text-center text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-16 mt-8 opacity-90">
            Votre piscine, notre expertise
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
                          <div className="relative p-6 lg:p-7 h-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] group-hover:bg-white/15">
                            {/* Effet de reflet en haut de la carte */}
                            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                            
                            {/* Effet de brillance au survol */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-kote-turquoise/20 via-white/5 to-transparent"></div>

                            <div className="p-4 relative z-10">
                              {/* Container de l'icône avec fond brillant */}
                              <div className="p-3 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20 mb-5 w-fit transform group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 will-change-transform">
                                <div className="transform transition-transform duration-700 group-hover:rotate-6 will-change-transform">
                                  {service.icon}
                                </div>
                              </div>
                              
                              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-kote-turquoise transition-colors duration-500 text-shadow-sm">
                                {service.title}
                              </h3>
                              
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
                        <div className="relative p-6 lg:p-7 h-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] group-hover:bg-white/15">
                          {/* Effet de reflet en haut de la carte */}
                          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                          
                          {/* Effet de brillance au survol */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-kote-turquoise/20 via-white/5 to-transparent"></div>

                          <div className="p-4 relative z-10">
                            {/* Container de l'icône avec fond brillant */}
                            <div className="p-3 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20 mb-5 w-fit transform group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 will-change-transform">
                              <div className="transform transition-transform duration-700 group-hover:rotate-6 will-change-transform">
                                {service.icon}
                              </div>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-kote-turquoise transition-colors duration-500 text-shadow-sm">
                              {service.title}
                            </h3>
                            
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