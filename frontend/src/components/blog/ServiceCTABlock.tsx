import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { services } from '../../config/services';

// Import des images
import constructionPiscine from '../../images/illustrations/construction-piscine.webp';
import renovationLiner from '../../images/illustrations/renovation-liner.webp';
import entretienPiscine from '../../images/illustrations/entretien-piscine.webp';
import reparationPompe from '../../images/illustrations/reparation-pompe2.webp';
import reparationRobot from '../../images/illustrations/reparation-robot2.webp';

// Map des images par ID de service
const serviceImages: Record<string, string> = {
  construction: constructionPiscine,
  renovation: renovationLiner,
  entretien: entretienPiscine,
  reparation: reparationPompe,
  automatisme: reparationRobot
};

interface ServiceCTABlockProps {
  serviceId?: string;
  serviceName?: string;
  customTitle?: string;
  customText?: string;
  autoDescription?: boolean;
  layout?: 'simple' | 'card';
}

const ServiceCTABlock: React.FC<ServiceCTABlockProps> = ({ 
  serviceId,
  serviceName,
  customTitle, 
  customText,
  autoDescription = true,
  layout = 'simple'
}) => {
  // Chercher le service par ID ou par nom
  const service = serviceId
    ? services.find(s => s.id === serviceId)
    : services.find(s => s.title.toLowerCase() === serviceName?.toLowerCase());
  
  if (!service) {
    // Afficher un message d'erreur en développement
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="my-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300">
          <p className="font-bold">Service non trouvé</p>
          <p className="text-sm">
            {serviceId ? `ID: ${serviceId}` : `Nom: ${serviceName}`}
          </p>
        </div>
      );
    }
    return null;
  }

  // Récupérer l'image correspondante
  const serviceImage = serviceImages[service.id];
  
  // Utiliser le titre et la description du service par défaut si non fournis
  const title = customTitle || service.title;
  const description = customText || (autoDescription ? service.description : '');

  // Layout complet avec plus d'informations
  if (layout === 'card') {
    return (
      <div className="my-6 max-w-xl ml-0 mr-auto" data-layout="card" data-service-name={service.title}>
        <div className="bg-white/5 border border-white/10 rounded-2xl hover:border-kote-turquoise/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
          <Link to={`/services/${service.slug}`} className="flex flex-col group">
            {/* Image du service */}
            <div className="w-full h-40 md:h-60">
              <img
                src={serviceImage}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Contenu */}
            <div className="p-5 flex flex-col justify-between border-t border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-kote-turquoise text-xl">
                    {React.createElement(service.icon)}
                  </span>
                  <h4 className="text-white text-xl font-bold group-hover:text-kote-turquoise transition-colors">
                    {title}
                  </h4>
                </div>
                
                {description && (
                  <p className="text-white/80 text-sm line-clamp-3 mb-4">{description}</p>
                )}
              </div>
              
              <div className="flex items-center justify-end mt-3">
                <div className="rounded-full bg-kote-turquoise/20 hover:bg-kote-turquoise/30 px-4 py-2 text-white flex items-center gap-2 text-sm font-medium transition-colors">
                  <span>En savoir plus</span>
                  <FaArrowRight className="text-kote-turquoise transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // Layout simple (par défaut)
  return (
    <div className="my-6" data-layout="simple">
      <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-3 bg-kote-turquoise/10 hover:bg-kote-turquoise/20 border border-kote-turquoise/50 rounded-full px-6 py-3 text-white font-medium transition-all duration-300 group">
        <span className="text-kote-turquoise">
          {React.createElement(service.icon)}
        </span>
        <span>{title}</span>
        <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default ServiceCTABlock; 