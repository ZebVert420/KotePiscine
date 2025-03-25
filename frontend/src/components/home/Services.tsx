import { Link } from 'react-router-dom';

const servicesData = [
  {
    id: 1,
    title: 'Construction de piscines',
    description: 'Des piscines sur-mesure adaptées à votre terrain et vos envies. Nous prenons en charge la totalité du projet, de la conception à la mise en eau.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-kote-turquoise mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    link: '/services/construction'
  },
  {
    id: 2,
    title: 'Entretien hebdomadaire',
    description: 'Confiez-nous l\'entretien régulier de votre piscine pour une eau saine et limpide. Nettoyage, contrôle technique et traitement de l\'eau.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-kote-turquoise mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    link: '/services/entretien'
  },
  {
    id: 3,
    title: 'Rénovation de piscines',
    description: 'Redonnez une seconde vie à votre piscine. Changement de revêtement, modernisation des équipements ou modification de structure.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-kote-turquoise mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    link: '/services/renovation'
  },
  {
    id: 4,
    title: 'Automatismes',
    description: 'Simplifiez la gestion de votre piscine grâce à nos solutions d\'automatisation. Traitement de l\'eau, filtration et nettoyage automatisés.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-kote-turquoise mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: '/services/automatismes'
  }
];

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
          {servicesData.map((service, index) => (
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
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-kote-blue-dark group-hover:text-kote-turquoise transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="mb-6 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <Link 
                    to={service.link} 
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
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services; 