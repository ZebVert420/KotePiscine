import { Link } from 'react-router-dom';
import { services } from '../../config/services';
import CtaButton from '../common/CtaButton';

const Services = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-80 z-0"></div>
      
      <div className="container-kote relative z-10">
        <h2 className="section-title">Nos services</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Koté Piscine vous propose une gamme complète de services pour répondre à tous vos besoins en matière de piscine.
          De la construction à l'entretien, nous vous garantissons des prestations de qualité.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <div 
                key={service.id} 
                className="card-premium group bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative p-6 h-full flex flex-col items-center text-center overflow-hidden">
                  {/* Effet d'onde en fond */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Contenu */}
                  <div className="relative z-10 flex flex-col items-center h-full">
                    <div className="p-3 rounded-full bg-blue-50 mb-4 transform group-hover:scale-110 group-hover:bg-gradient-to-r from-blue-100 to-kote-blue-light/10 transition-all duration-300">
                      <div className="transform group-hover:rotate-3 transition-transform duration-300">
                        <ServiceIcon className="h-12 w-12 text-kote-turquoise" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-kote-blue-dark group-hover:text-kote-turquoise transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="mb-6 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="mt-auto flex items-center text-kote-turquoise hover:text-kote-blue-dark transition-colors font-medium group-hover:font-bold"
                    >
                      <span className="mr-2">En savoir plus</span>
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <CtaButton
            to="/services"
            text="Voir tous nos services"
            color="blue"
            size="large"
            icon="arrow"
          />
        </div>
      </div>
    </section>
  );
};

export default Services; 