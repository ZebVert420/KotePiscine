import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { categories } from '../config/categories';
import { productsData } from '../config/products';
import { urlService } from '../services/urlService';

const CataloguePage = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { productSlug, category } = useParams<{ productSlug?: string; category?: string }>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gridHeight, setGridHeight] = useState<number>(300);
  const [menuHeight, setMenuHeight] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState<number>(300);

  // Gérer la catégorie depuis l'URL
  useEffect(() => {
    if (category) {
      const categoryData = categories.find(cat => cat.slug === category);
      if (categoryData) {
        setActiveCategory(categoryData.id);
      }
    } else {
      setActiveCategory(null);
    }
  }, [category]);

  // Observer la hauteur du menu catégories
  useEffect(() => {
    if (!categoriesRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMenuHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(categoriesRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Mettre à jour la hauteur de la section
  useEffect(() => {
    setSectionHeight(Math.max(gridHeight, menuHeight));
  }, [gridHeight, menuHeight]);

  // Vérifier si un produit a été demandé par l'URL et trouver sa catégorie
  useEffect(() => {
    if (productSlug) {
      const product = productsData.find(p => p.slug === productSlug);
      if (product) {
        setActiveCategory(typeof product.category === 'number' ? product.category : null);
      }
    }
  }, [productSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  // Force le rafraîchissement des cartes quand on change de catégorie
  useEffect(() => {
    // Forcer un re-rendu complet des cartes
    setRefreshTrigger(prev => prev + 1);
    
    // S'assurer que les cartes sont visibles
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      (card as HTMLElement).style.display = 'block';
      (card as HTMLElement).style.visibility = 'visible';
    });
  }, [activeCategory]);

  const filteredProducts = activeCategory 
    ? productsData.filter(product => product.category === activeCategory)
    : productsData;

  // Fonction pour gérer le changement de catégorie
  const handleCategoryChange = (categoryId: number | null) => {
    // Si un modal est ouvert, on le ferme d'abord
    if (productSlug) {
      window.history.pushState({}, '', category ? urlService.getCatalogueUrl(category) : urlService.getCatalogueUrl());
    }
    
    setActiveCategory(categoryId);

    // Mise à jour de l'URL en fonction de la catégorie
    if (categoryId) {
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      if (selectedCategory) {
        window.history.pushState({}, '', urlService.getCatalogueUrl(selectedCategory.slug));
      }
    } else {
      window.history.pushState({}, '', urlService.getCatalogueUrl());
    }
    
    // Fermer le menu mobile après sélection d'une catégorie
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Fonction pour activer/désactiver le menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fonction pour générer les meta tags spécifiques au produit
  useEffect(() => {
    if (productSlug) {
      const product = productsData.find(p => p.slug === productSlug);
      if (product) {
        document.title = `${product.name} - Koté Piscine`;
        
        // Mettre à jour les meta tags pour le SEO
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', product.description.substring(0, 160));
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = product.description.substring(0, 160);
          document.head.appendChild(meta);
        }
      }
    } else if (category) {
      const currentCategory = categories.find(cat => cat.slug === category);
      document.title = `${currentCategory?.name || 'Catalogue'} - Koté Piscine`;
    } else {
      document.title = 'Catalogue - Koté Piscine';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Découvrez notre sélection de produits et équipements pour l\'entretien de votre espace aquatique.');
      }
    }
  }, [productSlug, category]);

  return (
    <>
      {/* Contenu qui défile */}
      <div className="relative z-10 transition-[min-height] duration-500 ease-in-out" style={{ minHeight: `${sectionHeight + 128 + 300}px` }}>
        {/* Hero section */}
        <section className="relative pt-16 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-kote-blue-dark/70 via-kote-blue-dark/50 to-transparent" />
          
          <div className="container-kote relative z-10 pt-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-sm">
                Notre Gamme
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Découvrez notre sélection de produits et équipements 
                pour l'entretien de votre espace aquatique.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="tel:0590681662" 
                  className="w-full sm:w-56 btn-primary bg-kote-blue-light text-white py-3 px-6 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 group"
                >
                  <svg 
                    className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  Demander conseil
                </a>
                <a 
                  href="https://goo.gl/maps/PVn9oQwTHN5ZuDLZ9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-56 btn-primary bg-[#B0C852] text-white py-3 px-6 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 group"
                >
                  <svg 
                    className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Itinéraire
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section catalogue */}
        <section className="py-16 relative overflow-hidden">
          {/* Overlay foncé pour la section catalogue */}
          <div 
            className="absolute inset-0 z-0 bg-black/70 transition-all duration-500 ease-in-out" 
            style={{ height: `${sectionHeight + 128}px` }}
          />
          
          {/* Container principal */}
          <div className="container-kote relative z-10">
            <div className="flex flex-col lg:flex-row gap-8" style={{ alignItems: 'flex-start' }}>
              
              {/* Menu catégories mobile - affiché uniquement sur mobile */}
              <div className="lg:hidden w-full mb-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-4 animate-fade-in-up">
                  <button
                    onClick={toggleMobileMenu}
                    className="flex items-center justify-between w-full text-white py-2 focus:outline-none"
                  >
                    <span className="text-xl font-bold">
                      {activeCategory === null 
                        ? 'Tout les produits' 
                        : categories.find(cat => cat.id === activeCategory)?.name || 'Sélectionner une catégorie'}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {/* Menu déroulant mobile */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileMenuOpen 
                        ? 'max-h-96 opacity-100 mt-4' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-2 px-1">
                      <li>
                        <button
                          onClick={() => handleCategoryChange(null)}
                          className={`w-full text-left px-4 py-2.5 rounded-full transition-all duration-300 ${
                            activeCategory === null 
                              ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          Tout les produits
                        </button>
                      </li>
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => handleCategoryChange(category.id)}
                            className={`w-full text-left px-4 py-2.5 rounded-full transition-all duration-300 ${
                              activeCategory === category.id 
                                ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Sidebar catégories en glassmorphisme - visible uniquement sur desktop */}
              <div className="hidden lg:block lg:w-1/4" ref={categoriesRef}>
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-6 sticky animate-fade-in-up" 
                  style={{ 
                    animationDelay: '0.3s',
                    position: 'sticky',
                    top: '6rem',
                    maxHeight: 'calc(100vh - 8rem)',
                    overflowY: 'auto',
                    alignSelf: 'flex-start'
                  }}
                >
                  <h2 className="text-xl font-bold text-white mb-6">Catégories</h2>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => handleCategoryChange(null)}
                        className={`w-full text-left px-4 py-3 rounded-full transition-all duration-300 ${
                          activeCategory === null 
                            ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                          Tous les produits
                        </div>
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategoryChange(category.id)}
                          className={`w-full text-left px-4 py-3 rounded-full transition-all duration-300 ${
                            activeCategory === category.id 
                              ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">
                              {<category.icon />}
                            </span>
                            {category.name}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-6 backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl">
                    <h3 className="font-bold text-white mb-4">Besoin d'information ?</h3>
                    <p className="text-white/80 text-sm mb-5">
                      N'hésitez pas a nous appeler !
                    </p>
                    <a
                      href="tel:0590681662"
                      className="text-kote-turquoise font-bold hover:text-white flex items-center transition-colors duration-300"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      05 90 68 16 62
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Version mobile du bloc "Besoin d'aide" */}
              {isMobile && (
                <div className="w-full mb-6 mt-2">
                  <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl p-4 animate-fade-in-up shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-sm">Besoin d'information ?</h3>
                        <p className="text-white/80 text-xs">
                          N'hésitez pas a nous appeler !
                        </p>
                      </div>
                      <a
                        href="tel:0590681662"
                        className="bg-kote-turquoise text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 text-sm font-semibold"
                      >
                        <svg 
                          className="w-4 h-4 mr-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                          />
                        </svg>
                        Appeler
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Liste des produits en utilisant ProductGrid */}
              <div className="lg:w-3/4 w-full" ref={productsContainerRef}>
                <ProductGrid 
                  key={`product-grid-${activeCategory}-${refreshTrigger}`}
                  products={filteredProducts} 
                  columns={isMobile ? 2 : 3}
                  emptyMessage="Aucun produit disponible dans cette catégorie."
                  onHeightChange={setGridHeight}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CataloguePage; 