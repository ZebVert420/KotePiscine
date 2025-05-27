import React from 'react';
import { motion } from 'framer-motion';
import { FictiveRealisationData } from '../../config/fictiveRealisations.config';
import { realisationCategories } from '../../config/realisations.config';
import { IconType } from 'react-icons';

// Animation variants pour les cartes
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

interface RealisationCardProps {
  realisation: FictiveRealisationData;
  index: number;
  size?: 'small' | 'medium' | 'large';
  onClick: (realisation: FictiveRealisationData) => void;
}

const RealisationCard: React.FC<RealisationCardProps> = ({ 
  realisation, 
  index, 
  size = 'medium',
  onClick 
}) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';
  
  const realisationCategory = realisationCategories.find(cat => cat.slug === realisation.categorySlug);
  const IconComponent = realisationCategory?.icon;

  return (
    <motion.div 
      key={realisation.id}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05
      }}
      className={`group card-glass-opaque overflow-hidden hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col text-white cursor-pointer ${
        isLarge ? 'md:col-span-2' : ''
      }`}
      onClick={() => onClick(realisation)}
    >
      <div className={`${isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]'} bg-black/20 relative overflow-hidden`}>
        <img 
          src={realisation.images[0]} 
          alt={realisation.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {IconComponent && (
          <div className="absolute top-3 left-3 flex items-center text-white z-10 bg-slate-900/50 backdrop-blur-sm px-2 py-1 rounded-lg">
            {React.createElement(IconComponent as IconType, {
              className: `${isSmall ? 'h-5 w-5' : 'h-6 w-6'} mr-2 transition-transform duration-300 group-hover:text-kote-turquoise transition-colors duration-200 ${ 
                realisationCategory?.slug === 'auto-nettoyantes' ? 'group-hover:rotate-12' : ''
              }`
            })}
            <span className={`${isSmall ? 'text-xs' : 'text-sm'} font-semibold text-white group-hover:text-kote-turquoise transition-colors duration-200 ease-in-out`}>
              {realisationCategory?.title}
            </span>
          </div>
        )}
      </div>
      <div className={`${isLarge ? 'p-6 md:p-7' : isSmall ? 'p-4' : 'p-5'} flex flex-col flex-grow`}>
        <h3 className={`${isLarge ? 'text-xl md:text-2xl' : isSmall ? 'text-base' : 'text-lg md:text-xl'} font-semibold text-white mb-1.5 group-hover:text-kote-turquoise transition-colors duration-200`}>
          {realisation.title}
        </h3>
        <p className="text-white/70 text-sm mb-3">{realisation.location}</p>
        <p className={`text-white/90 text-sm ${isLarge ? 'line-clamp-4' : isSmall ? 'line-clamp-2' : 'line-clamp-3'} mb-4 flex-grow`}>
          {realisation.description}
        </p>
        
        {realisation.services && realisation.services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {realisation.services.slice(0, isLarge ? 5 : isSmall ? 2 : 3).map(service => (
              <span key={service} className="inline-block px-3 py-1 text-xs bg-white/10 text-kote-turquoise font-medium rounded-full">
                {service}
              </span>
            ))}
            {!isLarge && realisation.services.length > (isSmall ? 2 : 3) && (
              <span className="inline-block px-2 py-1 text-xs bg-white/5 text-white/60 rounded-full">
                +{realisation.services.length - (isSmall ? 2 : 3)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RealisationCard; 