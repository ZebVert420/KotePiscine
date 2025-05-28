import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { blogCategories } from '../config/blog.categories';
import { blogPosts } from '../config/blog.posts';
import BlogCard from '../components/blog/BlogCard';
import AnimatedElement from '../components/common/AnimatedElement';
import CallToAction from '../components/home/CallToAction';
import { FaSearch, FaArrowRight, FaNewspaper } from 'react-icons/fa';

import React from 'react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(13);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Vérifier si l'appareil est mobile
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

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Compter les articles par catégorie
  const categoryPostCount = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach((post) => {
      counts[post.categoryId] = (counts[post.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtrer les articles
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = debouncedSearchTerm === '' || 
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === null || post.categoryId === selectedCategory;
      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [debouncedSearchTerm, selectedCategory, selectedTag]);

  // Articles à afficher (avec pagination)
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  // Charger plus d'articles
  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 12);
  };

  // Gérer le clic sur un tag
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gérer la sélection de catégorie
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedTag(null);
    
    // Fermer le menu mobile après sélection
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Fonction pour activer/désactiver le menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Trouver la catégorie actuellement sélectionnée
  const currentCategory = selectedCategory 
    ? blogCategories.find(cat => cat.id === selectedCategory) 
    : null;

  return (
    <>
      {/* Hero Section avec overlay sombre */}
      <section className="relative pt-20 pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-kote-blue-dark/90 via-kote-blue-dark/70 to-transparent" />
        <div className="container-kote relative z-10">
          <AnimatedElement delay={0.1}>
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-md text-white">
                Les Conseils Koté Piscine
              </h1>
              <p className="text-lg md:text-xl mb-10 text-white/90 text-shadow">
                Conseils d'experts, guides pratiques et actualités du monde de la piscine en Guadeloupe. 
                Découvrez nos articles pour créer et entretenir votre oasis aquatique.
              </p>

              {/* Barre de recherche améliorée */}
              <div className="relative max-w-lg mx-auto">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <div className="relative flex items-center">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 text-sm" />
                    <input
                      type="text"
                      placeholder="Rechercher un article, un conseil, une astuce..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder-white/60 focus:outline-none outline-none text-shadow-sm text-left text-sm focus:placeholder-white/40 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Section principale avec fond sombre */}
      <section className="section-dark-overlay">
        <div className="absolute inset-0 z-0 bg-black/70"></div>
        <div className="container-kote relative z-10">
          
          {/* Filtres de catégories améliorés - taille réduite */}
          <div className="mb-12">
            <AnimatedElement delay={0.2}>
              {/* Tag sélectionné */}
              {selectedTag && (
                <div className="text-center mb-6">
                  <p className="text-white/70 mb-2">Filtré par tag :</p>
                  <div className="inline-flex items-center gap-2 bg-kote-turquoise/20 border border-kote-turquoise/50 px-3 py-1.5 rounded-full">
                    <span className="text-kote-turquoise font-medium text-sm">#{selectedTag}</span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="text-white/70 hover:text-white ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Menu mobile déroulant - affiché uniquement sur mobile et tablette */}
              <div className="lg:hidden w-full mb-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-4 animate-fade-in-up">
                  <button
                    onClick={toggleMobileMenu}
                    className="flex items-center justify-between w-full text-white py-2 focus:outline-none"
                  >
                    <span className="text-xl font-bold flex items-center ">
                       {/* Afficher l'icône si une catégorie est sélectionnée ou l'icône par défaut */}
                       <span className={`mr-6 ml-3 h-5 w-5 text-kote-turquoise/80`}>
                         {React.createElement(currentCategory?.icon || FaNewspaper)}
                       </span>
                       {!selectedCategory 
                        ? 'Tous les articles' 
                        : currentCategory?.name || 'Sélectionner une catégorie'}
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
                        ? 'max-h-screen opacity-100 mt-4'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-2 px-1">
                      <li>
                        <button
                          onClick={() => handleCategorySelect(null)}
                          className={`w-full text-left px-4 py-2.5 rounded-full transition-all duration-300 ${
                            selectedCategory === null && selectedTag === null
                              ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center justify-center">
                              <FaNewspaper className={`${selectedCategory === null ? 'text-white' : 'text-kote-turquoise/80'} mr-4 h-5 w-5`} />
                              <span>Tous les articles</span>
                            </div>
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-white/10 text-xs rounded-full">
                              {blogPosts.length}
                            </span>
                          </div>
                        </button>
                      </li>
                      {blogCategories.map((category) => {
                        const postCount = categoryPostCount[category.id] || 0;
                        return (
                          <li key={category.id}>
                            <button
                              onClick={() => handleCategorySelect(category.id)}
                              className={`w-full text-left px-4 py-2.5 rounded-full transition-all duration-300 ${
                                selectedCategory === category.id 
                                  ? 'bg-kote-turquoise text-white font-semibold shadow-md' 
                                  : 'text-white hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {category.icon && (
                                      <span className={`mr-4 h-5 w-5 inline-flex items-center justify-center ${selectedCategory === category.id ? 'text-white' : 'text-kote-turquoise/80'}`}>
                                        {React.createElement(category.icon)}
                                      </span>
                                  )}
                                  <span>{category.name}</span>
                                </div>
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-white/10 text-xs rounded-full">
                                  {postCount}
                                </span>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Boutons de filtrage - visibles uniquement sur desktop large */}
              <div className="hidden lg:flex flex-wrap justify-center gap-2">
                {/* Bouton "Tous" - taille réduite */}
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedTag(null);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === null && selectedTag === null
                      ? 'bg-kote-turquoise text-white shadow-lg text-shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <FaNewspaper className="inline-block mr-1 text-sm" />
                  Tous les articles
                  <span className="ml-1 text-xs opacity-75">({blogPosts.length})</span>
                </button>

                {/* Catégories - taille réduite */}
                {blogCategories.map((category) => {
                  const postCount = categoryPostCount[category.id] || 0;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedTag(null);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 ${
                        selectedCategory === category.id
                          ? 'bg-kote-turquoise text-white shadow-lg text-shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                    >
                      {category.icon && (
                        <span className="text-sm">
                          {React.createElement(category.icon)}
                        </span>
                      )}
                      {category.name}
                      <span className="text-xs opacity-75">({postCount})</span>
                    </button>
                  );
                })}
              </div>

              {/* Description de la catégorie sélectionnée */}
              {selectedCategory && (
                <div className="mt-6 text-center">
                  <p className="text-white/80 max-w-2xl mx-auto">
                    {blogCategories.find(cat => cat.id === selectedCategory)?.description}
                  </p>
                </div>
              )}
            </AnimatedElement>
          </div>

        
          {/* Grille d'articles principale */}
          {displayedPosts.length > 0 ? (
            <>
              {/* Grille en mosaic adaptative selon le nombre d'articles */}
              <div className={`grid gap-4 md:gap-6 auto-rows-max ${
                displayedPosts.length <= 2 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : displayedPosts.length <= 4
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              }`}>
                <AnimatePresence mode="popLayout">
                  {displayedPosts.map((post, index) => {
                    // Logique adaptative pour déterminer la taille de la carte
                    const getCardSize = (idx: number, totalArticles: number) => {
                      // Si très peu d'articles, tout en medium pour éviter les espaces vides
                      if (totalArticles <= 3) return 'medium';
                      
                      // Si peu d'articles (4-6), une seule carte large au début
                      if (totalArticles <= 6) {
                        if (idx === 0) return 'large';
                        return 'medium';
                      }
                      
                      // Pour beaucoup d'articles, pattern plus sophistiqué
                      if (totalArticles > 6) {
                        // Première carte large
                        if (idx === 0) return 'large';
                        // Une carte large tous les 7 articles (évite trop de répétition)
                        if ((idx + 2) % 7 === 0) return 'large';
                        // Quelques cartes small pour la variété, mais pas trop
                        if (idx % 6 === 0 && idx !== 0) return 'small';
                        return 'medium';
                      }
                      
                      return 'medium';
                    };

                    return (
                      <BlogCard
                        key={post._id}
                        post={post}
                        index={index}
                        size={getCardSize(index, displayedPosts.length)}
                        onTagClick={handleTagClick}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Bouton "Charger plus" */}
              {hasMorePosts && (
                <AnimatedElement delay={0.2}>
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMorePosts}
                      className="group relative inline-flex items-center gap-3 bg-kote-turquoise text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Charger plus d'articles</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <FaArrowRight className="transform rotate-90" />
                      </div>
                    </button>
                  </div>
                </AnimatedElement>
              )}

              {/* Indicateur de progression */}
              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm">
                  Affichage de {displayedPosts.length} sur {filteredPosts.length} articles
                </p>
                <div className="mt-2 w-full max-w-xs mx-auto bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-kote-turquoise h-full rounded-full transition-all duration-500"
                    style={{ width: `${(displayedPosts.length / filteredPosts.length) * 100}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <AnimatedElement delay={0.2}>
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Aucun article trouvé
                </h2>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Nous n'avons trouvé aucun article correspondant à vos critères de recherche.
                  Essayez avec d'autres mots-clés ou explorez nos catégories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setSelectedTag(null);
                    setVisiblePosts(13);
                  }}
                  className="bg-kote-turquoise text-white px-6 py-3 rounded-full font-medium hover:bg-kote-turquoise/90 transition-all hover:scale-105 shadow-lg"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </AnimatedElement>
          )}
        </div>
      </section>

      {/* CTA Contact */}
      <CallToAction />
    </>
  );
};

export default BlogPage; 