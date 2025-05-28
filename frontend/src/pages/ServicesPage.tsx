import { motion } from 'framer-motion';
import { FaCheckCircle, FaSwimmingPool, FaTools, FaRegSmile } from 'react-icons/fa';
import { services } from '../config/services';
import AnimatedElement from '../components/common/AnimatedElement';
import CtaButton from '../components/common/CtaButton';
import { contact } from '../config/contact';
import BlogArticlesSection from '../components/common/BlogArticlesSection';
import CallToAction from '../components/home/CallToAction';
import RealisationsSection from '../components/common/RealisationsSection';

// Import des images
import magasinIllustration from '../images/illustrations/magasin illustration.jpg';
import serviceDefaultImage from '../images/placeholders/service-default.svg';
import constructionPiscine from '../images/illustrations/construction-piscine.webp';
import renovationLiner from '../images/illustrations/renovation-liner.webp';
import entretienPiscine from '../images/illustrations/entretien-piscine.webp';
import reparationPompe from '../images/illustrations/reparation-pompe2.webp';
import reparationRobot from '../images/illustrations/reparation-robot2.webp';

// Fonction pour obtenir l'image du service par son ID
const getServiceImage = (serviceId: string) => {
  switch (serviceId) {
    case 'construction':
      return constructionPiscine;
    case 'renovation':
      return renovationLiner;
    case 'entretien':
      return entretienPiscine;
    case 'reparation':
      return reparationPompe;
    case 'automatisme':
      return reparationRobot;
    default:
      return serviceDefaultImage;
  }
};

// Données des statistiques
const stats = [
  {
    value: '22+',
    label: 'Années d\'expérience',
    icon: <FaSwimmingPool className="text-3xl text-white" />,
    description: 'Un savoir-faire pisciniste à votre service'
  },
  {
    value: '1000+',
    label: 'Piscines entretenues',
    icon: <FaTools className="text-3xl text-white" />,
    description: 'Des clients satisfaits dans toute la région'
  },
  {
    value: '100%',
    label: 'Satisfaction client',
    icon: <FaRegSmile className="text-3xl text-white" />,
    description: 'La qualité et le service avant tout'
  }
];


const ServicesPage = () => {
  return (
    <>
      {/* Section principale avec patchwork d'informations et services */}
      <section className="relative pt-4 pb-16 overflow-hidden w-full">
        <div className="container-kote relative z-10">
          {/* Titre intégré plus subtilement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Services
          </h1>
            <p className="text-lg max-w-2xl mx-auto text-white/90">
            De la construction à l'entretien, nous vous accompagnons dans tous vos projets piscine 
            avec expertise et professionnalisme.
          </p>
        </motion.div>

          {/* Patchwork unifié des cartes, statistiques et services */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Grande carte de présentation */}
            <div className="md:col-span-6 lg:col-span-8">
              <div className="relative h-full">
                {/* Effet d'ombre projetée */}
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full p-6 md:p-8 card-glass-transparent card-glass-reflect overflow-hidden">
                  {/* Effet de reflet en haut */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                  
                  <AnimatedElement delay={0.05} className="relative z-10 h-full flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Notre savoir-faire à votre service</h2>
                    <p className="text-white/90 mb-6">
                      Chez Koté Piscine, nous mettons notre expérience au service de tous vos besoins liés à votre piscine. 
                      Que vous souhaitiez une nouvelle installation ou rénover votre espace aquatique existant,
                      nous vous proposons des solutions adaptées à votre projet et votre budget.
                    </p>

                  </AnimatedElement>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            {stats.slice(0, 2).map((stat, index) => (
              <div className="md:col-span-6 lg:col-span-2">
                <div className="relative h-full">
                  <div className="card-shadow-projected" aria-hidden="true"></div>
                  
                  <div className="relative h-full p-5 card-glass-transparent card-glass-reflect overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                    
                    <AnimatedElement key={stat.label} delay={0.1 + index * 0.1} className="relative z-10 flex flex-col items-center text-center h-full">
                      <div className="p-3  mb-3">
                  {stat.icon}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.value}</h3>
                      <p className="text-white/90 font-medium">{stat.label}</p>
                    </AnimatedElement>
                  </div>
                </div>
              </div>
            ))}

            {/* Configurateur de devis amélioré - design plus attractif */}
            <div className="md:col-span-6 lg:col-span-4">
              <div className="relative h-full">
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full overflow-hidden backdrop-blur-xl bg-gradient-to-br from-kote-turquoise/80 to-kote-blue-light/70 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-2xl">
                  {/* Effet de bulle d'eau */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                  
                  <AnimatedElement delay={0.4} className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="p-3 bg-white/20 rounded-2xl mb-5">
                      <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5.25H3C2.59 5.25 2.25 5.59 2.25 6V18C2.25 18.41 2.59 18.75 3 18.75H21C21.41 18.75 21.75 18.41 21.75 18V6C21.75 5.59 21.41 5.25 21 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.75 15.75H18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.25 15.75H12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.25 15.75H9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.25 15.75H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.25 9H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.75 12.75H18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.25 12.75H12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.25 12.75H9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.25 12.75H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Votre devis <span className="text-kote-blue-dark">en ligne</span>
                    </h3>
                    
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <span className="inline-block w-3 h-3 bg-white rounded-full"></span>
                      <span className="inline-block w-16 h-0.5 bg-white/50"></span>
                      <span className="inline-block w-3 h-3 bg-white rounded-full"></span>
                      <span className="inline-block w-16 h-0.5 bg-white/50"></span>
                      <span className="inline-block w-3 h-3 bg-white rounded-full"></span>
                    </div>
                    
                    <p className="text-white font-medium mb-2">
                      Simple • Rapide • Sans engagement
                    </p>
                    
                    <ul className="text-white/90 mb-8 text-sm space-y-1.5 text-left">
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 mr-2 flex-shrink-0 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">1</span>
                        <span>Sélectionnez votre type de projet</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 mr-2 flex-shrink-0 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">2</span>
                        <span>Définissez vos caractéristiques</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 mr-2 flex-shrink-0 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">3</span>
                        <span>Recevez votre estimation</span>
                      </li>
                    </ul>
                    
                    <CtaButton 
                      to="/configurateur"
                      text="Lancer l'estimation"
                      color="green"
                      size="default"
                      icon="arrow"
                      outline={true}
                      fullWidth={true}
                    />
                  </AnimatedElement>
                </div>
              </div>
            </div>

            {/* Dernière statistique */}
            <div className="md:col-span-6 lg:col-span-4">
              <div className="relative h-full">
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full p-5 card-glass-transparent card-glass-reflect overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                  
                  <AnimatedElement delay={0.5} className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <div className="p-3 rounded-full bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-dark/20 mb-3">
                      {stats[2].icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">{stats[2].value}</h3>
                    <p className="text-white/90 font-medium mb-2">{stats[2].label}</p>
                    <p className="text-white/80 text-sm">{stats[2].description}</p>
                  </AnimatedElement>
                </div>
              </div>
            </div>

            {/* Image de piscine */}
            <div className="md:col-span-6 lg:col-span-4">
              <div className="relative h-full">
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
                  <img 
                    src={magasinIllustration} 
                    alt="Piscine de luxe" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kote-blue-dark/90 to-transparent"></div>
                  <AnimatedElement delay={0.6} className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-semibold text-sm uppercase tracking-wider">Magasin Koté Piscine</p>
                  </AnimatedElement>
                </div>
              </div>
            </div>

            {/* SERVICES EN FORMAT UNIFORMES AVEC IMAGE/CONTENU ALTERNÉS */}
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              const imageRight = index % 2 !== 0; // Alterne position de l'image (gauche ou droite)
              
              return (
                <div className="md:col-span-12">
                  <div className="relative h-full">
                    <div className="card-shadow-projected" aria-hidden="true"></div>
                    
                    <div className="relative h-full card-glass-transparent card-glass-reflect overflow-hidden">
                      <AnimatedElement 
                        key={service.id}
                        delay={0.15}
                        className="flex flex-col lg:flex-row"
                      >
                        {/* Image */}
                        <div className={`w-full lg:w-1/2 relative ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                          <img
                            src={getServiceImage(service.id)}
                            alt={service.title}
                            className="w-full h-96 object-cover object-[25%_75%]"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = serviceDefaultImage;
                            }}
                          />
                        </div>
                        
                        {/* Contenu */}
                        <div className={`relative z-10 p-6 lg:p-8 lg:w-1/2 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-kote-turquoise/30 to-kote-blue-light/20">
                              <ServiceIcon className="text-3xl text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h2>
                          </div>

                          {service.id === 'construction' && (
                            <p className="text-white/90 mb-6">
                              Réalisez votre rêve d'avoir une piscine sur mesure. Nous concevons et construisons votre piscine selon vos goûts et la configuration de votre terrain pour un résultat qui vous ressemble.
                            </p>
                          )}
                          
                          {service.id === 'renovation' && (
                            <p className="text-white/90 mb-6">
                              Donnez une seconde vie à votre piscine ! Nous prenons en charge la rénovation complète de votre espace aquatique : changement de liner, modernisation des équipements ou réparation structurelle.
                            </p>
                          )}
                          
                          {service.id === 'entretien' && (
                            <p className="text-white/90 mb-6">
                              Profitez de votre piscine sans contraintes. Nous assurons l'entretien régulier, le traitement de l'eau et les contrôles nécessaires pour garder votre piscine en parfait état toute l'année.
                            </p>
                          )}
                          
                          {service.id === 'reparation' && (
                            <p className="text-white/90 mb-6">
                              Un problème avec votre équipement ? Nous réparons rapidement pompes, filtres et robots de piscine. Notre diagnostic précis permet d'intervenir efficacement pour minimiser les périodes d'indisponibilité.
                            </p>
                          )}
                          
                          {service.id === 'automatisme' && (
                            <p className="text-white/90 mb-6">
                              Simplifiez-vous la vie avec nos solutions d'automatisation. Nous installons des systèmes intelligents pour le traitement de l'eau, la régulation de température et le contrôle à distance de votre piscine.
                            </p>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <FaCheckCircle className="text-kote-turquoise mt-1 flex-shrink-0" />
                                <span className="text-white/90 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <CtaButton 
                              to={`/services/${service.slug}`}
                              text="En savoir plus"
                              color="green"
                              size="slim"
                              icon="arrow"
                            />
                            <CtaButton 
                              to={`tel:${contact.phone.tel}`}
                              text={contact.phone.display}
                              external={true}
                              color="turquoise"
                              size="slim"
                              icon="phone"
                            />
                          </div>
                        </div>
                      </AnimatedElement>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Articles de Blog */}
      <BlogArticlesSection numberOfArticles={3} />

      {/* Section Réalisations */}
      <RealisationsSection numberOfRealisations={3} />

      {/* CTA final */}
      <CallToAction />
    </>
  );
};

export default ServicesPage; 