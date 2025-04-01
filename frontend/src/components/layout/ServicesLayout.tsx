import { useLocation } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';

interface ServiceLinkProps {
  to: string;
  label: string;
  current: string;
}

// Composant pour les liens de service
const ServiceLink = ({ to, label, current }: ServiceLinkProps) => {
  const isActive = current === to;
  
  return (
    <Link 
      to={to} 
      className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-kote-blue-light text-white font-medium shadow-md' 
          : 'text-kote-blue-light hover:bg-blue-50 hover:text-kote-turquoise'
      }`}
    >
      {label}
    </Link>
  );
};

const ServicesLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Liste des services avec leurs labels
  const services = [
    { path: '/services/construction', label: 'Construction' },
    { path: '/services/renovation', label: 'Rénovation' },
    { path: '/services/entretien', label: 'Entretien' },
    { path: '/services/reparation', label: 'Réparation' },
    { path: '/services/automatismes', label: 'Automatismes' }
  ];

  return (
    <div className="container-kote py-8">
      {/* Menu de navigation entre services */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8 flex flex-wrap gap-2 justify-center">
        {services.map((service) => (
          <ServiceLink 
            key={service.path}
            to={service.path}
            label={service.label}
            current={currentPath}
          />
        ))}
      </div>
      
      {/* Contenu de la page actuelle */}
      <Outlet />
    </div>
  );
};

export default ServicesLayout; 