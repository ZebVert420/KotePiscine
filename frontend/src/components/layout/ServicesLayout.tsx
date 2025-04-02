import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { services } from '../../config/services';

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
          ? 'bg-kote-blue-dark text-white'
          : 'text-kote-blue-dark hover:bg-kote-blue-dark/10'
      }`}
    >
      {label}
    </Link>
  );
};

interface ServicesLayoutProps {
  children: React.ReactNode;
}

const ServicesLayout: React.FC<ServicesLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Configuration des liens de navigation
  const serviceLinks = services.map(service => ({
    path: `/services/${service.slug}`,
    label: service.title
  }));

  return (
    <div className="min-h-screen">
      <div className="container-kote py-8">
        {/* Menu de navigation entre services */}
        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-xl p-4 mb-8 flex flex-wrap gap-2 justify-center">
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
        
        {/* Contenu de la page */}
        {children}
      </div>
    </div>
  );
};

export default ServicesLayout; 