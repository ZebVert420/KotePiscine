import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { services } from '../../config/services';
import { AnimatePresence, motion } from 'framer-motion';

interface ServiceLinkProps {
  to: string;
  label: string;
  current: string;
}

const ServiceLink: React.FC<ServiceLinkProps> = ({ to, label, current }) => {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-kote-turquoise text-white font-medium shadow-lg shadow-kote-turquoise/20'
          : 'text-white/90 hover:bg-white/10 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
};

// Versions simplifiées des variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100vw' : '-100vw',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  })
};

interface ServicesLayoutProps {
  children: React.ReactNode;
}

const ServicesLayout: React.FC<ServicesLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [direction, setDirection] = useState<number>(0);
  const prevPathnameRef = useRef<string | null>(null);

  const serviceLinks = useMemo(() => {
    return services.map((service, index) => ({
      path: `/services/${service.slug}`,
      label: service.title,
      index: index
    }));
  }, []);

  useEffect(() => {
    if (prevPathnameRef.current !== null) {
      const getIndex = (path: string): number => {
        if (path === '/services') return -1;
        const service = serviceLinks.find(link => link.path === path);
        return service ? service.index : -2;
      };

      const prevIndex = getIndex(prevPathnameRef.current);
      const currentIndex = getIndex(currentPath);

      if (prevIndex !== -2 && currentIndex !== -2) {
        setDirection(currentIndex > prevIndex ? 1 : -1);
      } else {
        setDirection(0);
      }
    }
    prevPathnameRef.current = currentPath;
  }, [currentPath, serviceLinks]);

  return (
    <div className="min-h-screen">
      <div className="container-kote py-8">
        {/* Menu de navigation entre services */}
        <div className="relative mb-8">
          <div className="card-shadow-projected" aria-hidden="true"></div>
          <div className="relative card-glass-transparent card-glass-reflect overflow-hidden rounded-xl">
            <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl"></div>
            <div className="relative z-10 p-4 flex flex-wrap gap-3 justify-center">
              <ServiceLink 
                to="/services"
                label="Tous nos services"
                current={currentPath}
              />
              {serviceLinks.map((service) => (
                <ServiceLink 
                  key={service.path}
                  to={service.path}
                  label={service.label}
                  current={currentPath}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Conteneur pour l'animation de transition */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={location.pathname}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServicesLayout; 