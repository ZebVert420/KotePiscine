import { useState } from 'react';
import CallToAction from '../components/home/CallToAction';

// Données des réalisations
const realisationsData = [
  {
    id: 1,
    title: "Piscine à débordement avec vue mer",
    location: "Saint-François",
    description: "Construction d'une piscine à débordement avec vue panoramique sur la mer des Caraïbes. Finition en revêtement gris anthracite et plage en bois exotique.",
    services: ["Construction", "Aménagement extérieur"],
    images: [
      '/images/illustrations/construction-piscine.webp',
      '/images/illustrations/entretien-piscine.webp',
      '/images/illustrations/renovation-liner.webp',
    ]
  },
  {
    id: 2,
    title: "Rénovation piscine et terrasse",
    location: "Le Gosier",
    description: "Rénovation complète d'une piscine familiale comprenant le remplacement du liner, la modernisation du système de filtration et la réfection des margelles.",
    services: ["Rénovation", "Revêtement"],
    images: [
      '/images/illustrations/renovation-liner.webp',
      '/images/illustrations/reparation-pompe.webp',
      '/images/illustrations/produit-entretien.webp',
    ]
  },
  {
    id: 3,
    title: "Installation d'une piscine coque moderne",
    location: "Sainte-Anne",
    description: "Installation d'une piscine coque polyester avec escalier intégré et système de nage à contre-courant. Plage immergée et éclairage LED.",
    services: ["Installation", "Équipement"],
    images: [
      '/images/illustrations/construction-piscine.webp',
      '/images/illustrations/entretien-piscine.webp',
    ]
  },
  {
    id: 4,
    title: "Piscine design avec fond mobile",
    location: "Petit-Bourg",
    description: "Construction d'une piscine design avec fond mobile permettant d'ajuster la profondeur. Équipée d'un système de chauffage solaire et d'un volet automatique.",
    services: ["Construction", "Automatisation", "Innovation"],
    images: [
      '/images/illustrations/domotique-piscine.webp',
      '/images/illustrations/construction-piscine.webp',
      '/images/illustrations/entretien-piscine.webp',
    ]
  },
  {
    id: 5,
    title: "Espace bien-être complet",
    location: "Deshaies",
    description: "Création d'un espace bien-être comprenant une piscine avec nage à contre-courant, un spa intégré et un hammam. Éclairage d'ambiance personnalisable.",
    services: ["Construction", "Spa", "Bien-être"],
    images: [
      '/images/illustrations/entretien-piscine.webp',
      '/images/illustrations/renovation-liner.webp',
    ]
  },
  {
    id: 6,
    title: "Réhabilitation d'une piscine hôtelière",
    location: "Basse-Terre",
    description: "Réhabilitation complète d'une piscine hôtelière de 150m². Nouveau système de filtration écologique, revêtement en mosaïque et éclairage architectural.",
    services: ["Rénovation", "Professionnel", "Filtration"],
    images: [
      '/images/illustrations/entretien-piscine.webp',
      '/images/illustrations/reparation-pompe2.webp',
    ]
  },
];


const RealisationsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  // Filtrer les réalisations selon le tag sélectionné
  const filteredRealisations = activeFilter === null
    ? realisationsData
    : realisationsData.filter(item => item.services.includes(activeFilter));

  // Ouvrir la lightbox pour visualiser une image
  const openLightbox = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setLightboxOpen(true);
  };

  // Fermer la lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-kote-blue-dark to-kote-blue-light py-16 text-white">
        <div className="container-kote text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Nos réalisations</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            Découvrez nos plus belles réalisations en Guadeloupe. Chaque projet est
            unique et personnalisé selon les souhaits de nos clients.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="bg-kote-white py-8 border-b border-gray-200">
        <div className="container-kote">
          <div className="pb-4 mb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 pt-4">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeFilter === null ? 'bg-kote-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              {Array.from(new Set(realisationsData.flatMap(item => item.services))).map(service => (
                <button
                  key={service}
                  onClick={() => setActiveFilter(service)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === service ? 'bg-kote-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galerie de réalisations */}
      <section className="py-16">
        <div className="container-kote">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRealisations.map(realisation => (
              <div key={realisation.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img 
                    src={realisation.images[0]} 
                    alt={realisation.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-kote-blue-dark">{realisation.title}</h3>
                  <p className="text-gray-500 text-sm">{realisation.location}</p>
                  <p className="text-gray-700 mt-2 text-sm line-clamp-3">{realisation.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {realisation.services.map(service => (
                      <span key={service} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openLightbox(realisation.images[0])} 
                    className="mt-4 w-full py-2 bg-kote-blue text-white rounded hover:bg-kote-blue-dark transition-colors text-sm"
                  >
                    Voir le projet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeLightbox}
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
          <div className="max-w-5xl max-h-[80vh]">
            <img 
              src={currentImage} 
              alt="Affichage plein écran" 
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      <CallToAction />
    </>
  );
};

export default RealisationsPage; 