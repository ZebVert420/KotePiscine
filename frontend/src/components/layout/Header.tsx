import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaPhone, FaFacebook } from 'react-icons/fa';
import { FaMapLocationDot, FaCircleChevronRight } from 'react-icons/fa6';
import { getMenuItems, socialLinks } from '../../config/navbar.config';
import contact from '../../config/contact';

// Importer le logo
import LogoHorizontal from '../../images/logo/Blanc Horizontal.png';

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Utiliser la configuration des menus
  const menuItems = getMenuItems();

  // Gestion du comportement de la navbar au scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Si on scroll vers le bas et qu'on a dépassé 150px, cacher la navbar
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsHidden(true);
      } 
      // Si on scroll vers le haut ou on est près du haut, montrer la navbar
      else {
        setIsHidden(false);
      }
      
      // Mettre à jour la dernière position de scroll
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Nettoyer l'event listener
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Ferme le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Gestion des clics en dehors des sous-menus pour les fermer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeSubmenu && 
          submenuRefs.current[activeSubmenu] && 
          !submenuRefs.current[activeSubmenu]?.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSubmenu]);

  // Gestion de l'ouverture des sous-menus
  const toggleSubmenu = (menuName: string) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed w-full z-50 transition-all duration-500 py-3 bg-gradient-to-r from-kote-blue-light to-kote-blue-dark shadow-lg ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center transition-transform duration-300 hover:scale-105"
        >
          <img 
            src={LogoHorizontal} 
            alt="Koté Piscine" 
            className="h-10 md:h-12 lg:h-14"
          />
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.name} className="relative group">
                {item.submenu ? (
                  <div 
                    ref={(el) => {
                      submenuRefs.current[item.name] = el;
                    }}
                    className="relative"
                  >
                    <button
                      id={`desktop-menu-${item.name.replace(/\s+/g, '-').toLowerCase()}-trigger`}
                      onClick={() => toggleSubmenu(item.name)}
                      className={`flex items-center text-kote-white transition-all duration-300 relative group ${
                        location.pathname.startsWith(item.to) ? 'font-bold text-kote-turquoise' : ''
                      }`}
                      aria-haspopup="true"
                      aria-expanded={activeSubmenu === item.name}
                      aria-controls={`desktop-submenu-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {item.name}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-kote-turquoise transition-all duration-300 ${
                        location.pathname.startsWith(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </button>
                    
                    {/* Sous-menu avec animation */}
                    <div 
                      id={`desktop-submenu-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                      role="menu"
                      aria-labelledby={`desktop-menu-${item.name.replace(/\s+/g, '-').toLowerCase()}-trigger`}
                      className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-3 w-72 transition-all duration-300 origin-top-left overflow-hidden
                        ${activeSubmenu === item.name 
                          ? 'transform scale-100 opacity-100 pointer-events-auto' 
                          : 'transform scale-95 opacity-0 pointer-events-none'
                        }`}
                    >
                      {/* Titre du sous-menu avec lien vers la page principale */}
                      <div className="px-4 pb-2 mb-2 border-b border-gray-100 flex items-center justify-between">
                        <Link
                          to={item.to}
                          className="text-kote-blue-dark font-bold text-sm hover:text-kote-turquoise transition-colors duration-200 group flex items-center"
                          onClick={() => setActiveSubmenu(null)}
                        >
                          <span className="flex items-center">
                            {item.icon && (
                              <span className="text-lg mr-2 text-kote-turquoise">{item.icon}</span>
                            )}
                            {item.name}
                          </span>
                          <span className="ml-2 text-xs opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex items-center">
                            <span>Tout voir</span>
                            <FaCircleChevronRight className="ml-1 text-kote-turquoise opacity-80 group-hover:opacity-100" />
                          </span>
                        </Link>
                      </div>
                      
                      {/* Arrière-plan décoratif */}
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 -rotate-12 translate-x-8 -translate-y-4">
                        <div className="text-kote-blue-dark text-[100px]">{item.icon}</div>
                      </div>
                      
                      <div className="py-1 relative z-10">
                        {item.submenu?.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            to={subItem.to}
                            role="menuitem"
                            className="block px-4 py-3 text-sm text-kote-blue-dark hover:text-kote-turquoise hover:bg-blue-50 transition-all duration-200 relative group flex items-center"
                            onClick={() => setActiveSubmenu(null)}
                            style={{ 
                              transitionDelay: `${index * 30}ms`,
                              opacity: activeSubmenu === item.name ? 1 : 0,
                              transform: activeSubmenu === item.name ? 'translateX(0)' : 'translateX(-10px)'
                            }}
                          >
                            {subItem.icon && (
                              <span className="text-kote-turquoise mr-3 text-lg transition-transform duration-200 group-hover:scale-110">{subItem.icon}</span>
                            )}
                            <span className="relative z-10">{subItem.name}</span>
                            <span className="absolute left-0 top-0 h-full w-0 bg-blue-50 transition-all duration-200 rounded-r-full opacity-0 group-hover:w-1 group-hover:opacity-100"></span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink to={item.to} exact={item.to === '/'}>
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Icônes sociales - desktop */}
        <div className="hidden lg:flex items-center space-x-7">
          <a 
            href={socialLinks.instagram}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-kote-white hover:text-kote-turquoise transition-colors duration-300 text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a 
            href={socialLinks.facebook}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-kote-white hover:text-kote-turquoise transition-colors duration-300 text-2xl"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a 
            href={socialLinks.maps}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-kote-white hover:text-kote-turquoise transition-colors duration-300 text-2xl"
            aria-label="Itinéraire"
          >
            <FaMapLocationDot />
          </a>
          <a 
            href={socialLinks.phone}
            className="flex items-center bg-kote-turquoise text-white px-5 py-2.5 rounded-full hover:bg-kote-blue-light transition-all duration-300 shadow-md hover:shadow-lg hover:transform hover:-translate-y-1 font-arboria"
          >
            <FaPhone className="mr-2.5 text-lg" /> 
            <span className="font-semibold uppercase tracking-wide text-base text-shadow-sm">{contact.phone.display}</span>
          </a>
        </div>

        {/* Bouton menu mobile */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Icône téléphone mobile - amélioré pour accessibilité elderly */}
          <a 
            href={socialLinks.phone}
            className="flex items-center text-kote-white hover:text-kote-turquoise transition-colors duration-300"
            aria-label="Appeler maintenant"
          >
            <div className="bg-kote-turquoise px-4 py-3 rounded-full text-white shadow-lg flex items-center">
              <FaPhone className="text-lg mr-2" /> 
              <span className="text-lg font-bold">{contact.phone.display}</span>
            </div>
          </a>
          
          <button 
            className="text-kote-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div 
        className={`lg:hidden absolute w-full bg-gradient-to-r from-kote-blue-light to-kote-blue-dark shadow-lg transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="container mx-auto px-4">
          <ul className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.submenu ? (
                  <div className="space-y-1">
                    <button
                      id={`mobile-menu-${item.name.replace(/\s+/g, '-').toLowerCase()}-trigger`}
                      onClick={() => toggleSubmenu(item.name)}
                      className="flex items-center justify-between w-full text-kote-white py-2 relative group"
                      aria-haspopup="true"
                      aria-expanded={activeSubmenu === item.name}
                      aria-controls={`mobile-submenu-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className={`transition-colors duration-300 ${location.pathname.startsWith(item.to) ? 'font-bold text-kote-turquoise text-shadow-glow' : ''}`}>
                        {item.name}
                      </span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 text-kote-white ${activeSubmenu === item.name ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-kote-turquoise transition-all duration-300 ${
                        location.pathname.startsWith(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
                      } opacity-70`}></span>
                    </button>
                    
                    <div 
                      id={`mobile-submenu-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                      role="menu"
                      aria-labelledby={`mobile-menu-${item.name.replace(/\s+/g, '-').toLowerCase()}-trigger`}
                      className={`pl-4 space-y-1 ${activeSubmenu === item.name ? 'block' : 'hidden'}`}
                    >
                      {/* Lien vers la page principale de la section */}
                      <Link
                        to={item.to}
                        className="block py-2 text-kote-white opacity-90 hover:opacity-100 font-semibold border-l-2 border-kote-turquoise pl-2 mb-3 flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon && (
                          <span className="text-kote-turquoise mr-2 text-lg">{item.icon}</span>
                        )}
                        <span>Tout voir {item.name}</span>
                      </Link>
                      
                      <div className="space-y-2.5">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.to}
                            role="menuitem"
                            className="block py-2 text-kote-white opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-200 flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.icon && (
                              <span className="text-kote-turquoise mr-3 text-lg opacity-80 group-hover:opacity-100">{subItem.icon}</span>
                            )}
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink 
                    to={item.to} 
                    exact={item.to === '/'} 
                    className="block py-2 relative group" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          
          {/* Icônes sociales en mobile */}
          <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-kote-blue-light">
            <a 
              href={socialLinks.instagram}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-kote-white hover:text-kote-turquoise transition-colors duration-300 text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href={socialLinks.facebook}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-kote-white hover:text-kote-turquoise transition-colors duration-300 text-2xl"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a 
              href={socialLinks.maps}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-kote-white hover:text-kote-turquoise transition-colors duration-300 text-2xl"
              aria-label="Itinéraire"
            >
              <FaMapLocationDot />
            </a>
            <a 
              href={socialLinks.phone}
              className="flex items-center text-kote-white hover:text-kote-turquoise transition-colors duration-300 group"
            >
              <div className="bg-kote-turquoise p-2 rounded-full mr-2.5 text-white shadow-sm group-hover:bg-kote-blue-light transition-all duration-300">
                <FaPhone className="text-lg" /> 
              </div>
              <span className="font-semibold group-hover:text-kote-turquoise">{contact.phone.display}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Composant NavLink personnalisé avec état actif
interface NavLinkProps {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ to, exact, children, className = "", onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-kote-white relative transition-all duration-300 group ${className} ${
        isActive ? 'font-bold text-kote-turquoise text-shadow-glow' : ''
      }`}
    >
      {children}
      <span 
        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-kote-turquoise transition-all duration-300 ${
          isActive ? 'w-full' : 'group-hover:w-full'
        }`}
      />
    </Link>
  );
};

export default Header; 