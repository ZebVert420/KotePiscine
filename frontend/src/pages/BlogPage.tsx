import { useState } from 'react';
import { Link } from 'react-router-dom';

// Articles de blog simulés
const blogPosts = [
  {
    _id: '1',
    title: "Guide complet sur le traitement de l'eau de piscine en climat tropical",
    slug: "guide-traitement-eau-piscine-climat-tropical",
    excerpt: "Découvrez les spécificités du traitement de l'eau en Guadeloupe et comment maintenir une eau cristalline toute l'année malgré la chaleur et l'humidité.",
    image: '/images/illustrations/entretien-piscine.webp',
    author: "Marc Durand",
    tags: ["Entretien", "Traitement eau", "Climat tropical"],
    createdAt: "2023-05-12T10:30:00Z"
  },
  {
    _id: '2',
    title: "Les étapes clés pour construire sa piscine en Guadeloupe",
    slug: "etapes-cles-construire-piscine-guadeloupe",
    excerpt: "De la conception à la mise en eau, suivez notre guide détaillé pour mener à bien votre projet de construction de piscine aux Antilles.",
    image: '/images/illustrations/construction-piscine.webp',
    author: "Sophie Martin",
    tags: ["Construction", "Réglementation", "Conseils"],
    createdAt: "2023-04-28T14:15:00Z"
  },
  {
    _id: '3',
    title: "Comment automatiser l'entretien de votre piscine avec les dernières technologies",
    slug: "automatiser-entretien-piscine-nouvelles-technologies",
    excerpt: "Robots nettoyeurs, électrolyseurs au sel, régulateurs automatiques... Découvrez comment la technologie peut vous faire gagner du temps et améliorer l'efficacité de l'entretien.",
    image: '/images/illustrations/domotique-piscine.webp',
    author: "Thomas Bernard",
    tags: ["Automatisation", "Technologie", "Innovation"],
    createdAt: "2023-04-15T09:45:00Z"
  },
  {
    _id: '4',
    title: "Préparer sa piscine pour la saison cyclonique en Guadeloupe",
    slug: "preparer-piscine-saison-cyclonique-guadeloupe",
    excerpt: "Conseils et mesures préventives pour protéger votre piscine et ses équipements pendant la saison des ouragans aux Antilles.",
    image: '/images/illustrations/entretien-piscine.webp',
    author: "Marie Lambert",
    tags: ["Sécurité", "Saison cyclonique", "Prévention"],
    createdAt: "2023-04-02T11:20:00Z"
  },
  {
    _id: '5',
    title: "Les tendances piscine 2024 : design, matériaux et innovations",
    slug: "tendances-piscine-2024-design-materiaux-innovations",
    excerpt: "Découvrez les dernières tendances en matière de conception de piscines, des formes contemporaines aux nouvelles options écologiques.",
    image: '/images/illustrations/construction-piscine.webp',
    author: "Julie Moreau",
    tags: ["Design", "Tendances", "Écologie"],
    createdAt: "2023-03-20T16:30:00Z"
  },
  {
    _id: '6',
    title: "Témoignage : notre rénovation de piscine complète par Koté Piscine",
    slug: "temoignage-renovation-piscine-complete-kote-piscine",
    excerpt: "Découvrez le récit détaillé d'une famille guadeloupéenne qui a confié la rénovation complète de sa piscine à notre équipe.",
    image: '/images/illustrations/renovation-liner.webp',
    author: "Famille Dubois",
    tags: ["Témoignage", "Rénovation", "Satisfaction client"],
    createdAt: "2023-03-10T08:50:00Z"
  },
];

// Liste de tous les tags uniques
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filtrer les articles en fonction de la recherche et du tag sélectionné
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Formater la date en français
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-kote-blue-dark to-kote-blue-light py-16 text-white">
        <div className="container-kote text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Notre blog</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            Conseils, astuces et actualités sur l'univers de la piscine en Guadeloupe.
            Suivez nos articles pour entretenir et profiter au mieux de votre piscine.
          </p>
        </div>
      </section>

      {/* Section de recherche et filtrage */}
      <section className="bg-kote-white py-8 border-b border-gray-200">
        <div className="container-kote">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Barre de recherche */}
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Rechercher un article..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-kote-blue-dark"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            
            {/* Filtres par tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-kote-blue-dark text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tous
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-kote-blue-dark text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16">
        <div className="container-kote">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article 
                  key={post._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '';
                          e.currentTarget.alt = 'Image non disponible';
                          e.currentTarget.className = 'w-full h-full object-cover bg-gray-200 flex items-center justify-center text-gray-400';
                          e.currentTarget.textContent = 'Image non disponible';
                        }}
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{post.author}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-kote-blue-dark mb-2 hover:text-kote-turquoise transition-colors">{post.title}</h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-kote-blue-light/10 text-kote-blue-dark px-2 py-0.5 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-kote-turquoise font-medium hover:text-kote-blue-dark transition-colors">
                        Lire l'article →
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-bold text-kote-blue-dark mb-2">Aucun article trouvé</h2>
              <p className="text-gray-700">
                Aucun article ne correspond à votre recherche. Essayez avec d'autres termes ou filtres.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag(null);
                }}
                className="mt-4 text-kote-turquoise hover:text-kote-blue-dark font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call-to-action newsletter */}
      <section className="bg-gradient-to-br from-kote-blue-light/10 to-kote-turquoise/10 py-12">
        <div className="container-kote text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-kote-blue-dark mb-4">Restez informé !</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Abonnez-vous à notre newsletter pour recevoir nos conseils d'entretien,
            astuces et offres spéciales directement dans votre boîte mail.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kote-blue-dark"
              required
            />
            <button 
              type="submit" 
              className="btn-primary whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            En vous abonnant, vous acceptez de recevoir nos emails. 
            Vous pourrez vous désabonner à tout moment.
          </p>
        </div>
      </section>
    </>
  );
};

export default BlogPage; 