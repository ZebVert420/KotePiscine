import { Link } from 'react-router-dom';
import CallToAction from '../components/home/CallToAction';

// Données des services
const servicesData = [
  {
    id: 1,
    title: 'Construction de piscines',
    slug: 'construction',
    image: '/images/illustrations/construction-piscine.webp',
    description: `Nous concevons et construisons des piscines sur mesure pour répondre exactement à vos envies, votre espace et votre budget. Notre équipe d'experts vous accompagne de la conception à la mise en eau.`,
    features: [
      'Étude personnalisée de votre projet',
      'Création de plans détaillés en 3D',
      'Gestion complète du chantier',
      'Garantie décennale'
    ]
  },
  {
    id: 2,
    title: 'Entretien régulier',
    slug: 'entretien',
    image: '/images/illustrations/entretien-piscine.webp',
    description: `Un entretien régulier est essentiel pour profiter pleinement de votre piscine et prolonger sa durée de vie. Nos forfaits d'entretien s'adaptent à vos besoins, qu'il s'agisse d'interventions ponctuelles ou d'un suivi annuel.`,
    features: [
      'Nettoyage complet du bassin et des équipements',
      'Analyse et traitement de l\'eau',
      'Contrôle du système de filtration',
      'Hivernage et remise en service'
    ]
  },
  {
    id: 3,
    title: 'Rénovation complète',
    slug: 'renovation',
    image: '/images/illustrations/renovation-liner.webp',
    description: `Redonnez une seconde jeunesse à votre piscine grâce à nos services de rénovation. Du simple changement de liner à la refonte complète de votre espace aquatique, nous mettons notre expertise à votre service.`,
    features: [
      'Diagnostic complet de votre installation',
      'Remplacement de liner et membrane armée',
      'Modernisation des systèmes de filtration',
      'Mise aux normes de sécurité'
    ]
  },
  {
    id: 4,
    title: 'Installation d\'automatismes',
    slug: 'automatismes',
    image: '/images/illustrations/domotique-piscine.webp',
    description: `Simplifiez-vous la vie grâce aux systèmes automatisés pour piscine. Contrôlez à distance la filtration, le chauffage, l'éclairage et bien plus encore pour une expérience utilisateur optimale.`,
    features: [
      'Systèmes de régulation automatique du pH et du chlore',
      'Robots nettoyeurs performants',
      'Contrôle à distance via smartphone',
      'Économies d\'énergie garanties'
    ]
  },
  {
    id: 5,
    title: 'Pose de revêtements',
    slug: 'revetement',
    image: '/images/illustrations/renovation-liner.webp',
    description: `Le revêtement est l'élément qui détermine l'esthétique et le confort de votre piscine. Nous proposons une large gamme de solutions adaptées à vos goûts et à votre budget.`,
    features: [
      'Liner sur mesure (unis, motifs, frises)',
      'Membrane armée haute résistance',
      'Carrelage et mosaïque',
      'Enduit minéral (type Silico-marbreux)'
    ]
  },
];

const ServicesPage = () => {
  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-kote-blue-dark to-kote-blue-light py-16 text-white">
        <div className="container-kote text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Nos services</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            Koté Piscine vous propose une gamme complète de services pour répondre 
            à tous vos besoins en matière de piscine. De la construction à l'entretien, 
            nous vous garantissons des prestations de qualité.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16">
        <div className="container-kote">
          <div className="space-y-20">
            {servicesData.map((service, index) => (
              <div 
                key={service.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-lg shadow-xl object-cover w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '';
                      e.currentTarget.alt = 'Image non disponible';
                      e.currentTarget.className = 'hidden';
                    }}
                  />
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl font-bold text-kote-blue-dark mb-4">{service.title}</h2>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  
                  <h3 className="font-bold text-kote-blue-dark mb-3">Nos prestations incluent :</h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg 
                          className="w-5 h-5 text-kote-turquoise mt-1 mr-2 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="btn-primary inline-block"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
};

export default ServicesPage; 