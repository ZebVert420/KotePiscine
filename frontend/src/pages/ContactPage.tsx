import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import contact from '../config/contact';
import AnimatedElement from '../components/common/AnimatedElement';
import CtaButton from '../components/common/CtaButton';
import { assetService } from '../services/assetService';
import { motion } from 'framer-motion';

// Images de la galerie du magasin
const magasinImages = [
  assetService.getImagePath('illustrations/magasin illustration.jpg'),
  assetService.getImagePath('illustrations/construction-piscine.webp'),
  assetService.getImagePath('illustrations/entretien-piscine.webp'),
  assetService.getImagePath('illustrations/produit-entretien.webp'),
];

// Données de l'équipe Koté Piscine
const teamMembers = [
  {
    id: 1,
    name: 'Philippe',
    role: 'Fondateur & Gérant',
    image: assetService.getImagePath('illustrations/construction-piscine.webp'),
    description: 'Plus de 20 ans d\'expérience dans la construction et l\'entretien de piscines en Guadeloupe.'
  },
  {
    id: 2,
    name: 'Julien',
    role: 'Technicien Spécialiste',
    image: assetService.getImagePath('illustrations/reparation-pompe2.webp'),
    description: 'Expert en maintenance et réparation de pompes et d\'équipements de filtration.'
  },
  {
    id: 3,
    name: 'Sophie',
    role: 'Conseillère Commerciale',
    image: assetService.getImagePath('illustrations/entretien-piscine.webp'),
    description: 'Spécialiste des produits d\'entretien et des équipements pour piscine.'
  },
  {
    id: 4,
    name: 'Marc',
    role: 'Technicien Installation',
    image: assetService.getImagePath('illustrations/renovation-liner.webp'),
    description: 'Expert en installation et rénovation de systèmes de filtration et d\'automatismes.'
  },
  {
    id: 5,
    name: 'Laura',
    role: 'Responsable Administration',
    image: assetService.getImagePath('illustrations/produit-entretien.webp'),
    description: 'Gestion administrative et relation client pour tous vos projets piscine.'
  },
  {
    id: 6,
    name: 'Thomas',
    role: 'Technicien Entretien',
    image: assetService.getImagePath('illustrations/reparation-robot2.webp'),
    description: 'Spécialiste de l\'entretien régulier et du traitement de l\'eau pour piscines.'
  }
];

const ContactPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { address } = contact;

  // Changement d'image pour la galerie
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % magasinImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + magasinImages.length) % magasinImages.length);
  };

  // Effet de défilement automatique pour la galerie
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // SEO
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Notre Magasin | Koté Piscine Guadeloupe";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Visitez notre magasin Koté Piscine à Sainte-Anne en Guadeloupe. Produits d\'entretien, équipements et conseils personnalisés pour votre piscine.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Visitez notre magasin Koté Piscine à Sainte-Anne en Guadeloupe. Produits d\'entretien, équipements et conseils personnalisés pour votre piscine.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="py-20">
      <div className="container-kote">
        {/* Titre principal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notre Magasin
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-white/90">
            Venez découvrir notre espace dédié à l'univers de la piscine au cœur de Sainte-Anne.
            Notre équipe vous accueille et vous conseille.
          </p>
        </motion.div>

        {/* Organisation avec un système de grille principal */}
        <div className="grid grid-cols-12 gap-6">
          {/* SECTION 1: Galerie et Informations complémentaires */}
          <div className="col-span-12 grid grid-cols-12 gap-6 mb-6">
            {/* Galerie photos du magasin */}
            <AnimatedElement delay={0.4} className="col-span-12 md:col-span-8">
              <div className="relative h-full">
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full card-glass-transparent card-glass-reflect overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                  
                  <div className="relative z-10 p-6">
                    <h2 className="text-3xl font-bold text-white mb-8">Notre magasin en images</h2>
                    
                    <div className="relative overflow-hidden rounded-xl h-[500px] mb-4">
                      {/* Images du diaporama */}
                      <div className="relative w-full h-full">
                        {magasinImages.map((image, index) => (
                          <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                          >
                            <img 
                              src={image} 
                              alt={`Magasin Koté Piscine - Image ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        
                        {/* Overlay avec texte */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20 flex items-end">
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Votre espace piscine</h3>
                            <p className="text-white/90">
                              Découvrez notre magasin avec une large gamme de produits et d'équipements pour votre piscine.
                            </p>
                          </div>
                        </div>
                        
                        {/* Contrôles de navigation */}
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                        >
                          <FaChevronLeft />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                    </div>
                    
                    {/* Indicateurs de position */}
                    <div className="flex justify-center gap-2 mb-4">
                      {magasinImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-kote-turquoise w-6' 
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`Image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Colonne droite: Informations complémentaires */}
            <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-6">
              {/* Carte des horaires */}
              <AnimatedElement delay={0.5}>
                <div className="relative h-full">
                  <div className="card-shadow-projected" aria-hidden="true"></div>
                  
                  <div className="relative h-full card-glass-transparent card-glass-reflect overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                    
                    <div className="relative z-10 p-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Nos horaires</h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-center p-5 rounded-xl bg-gradient-to-r from-kote-blue-light/40 to-kote-turquoise/30 backdrop-blur-md border border-white/30 shadow-lg transform-gpu transition-all duration-300 hover:scale-[1.02]">
                          <div className="mr-4 p-3 bg-white/30 rounded-full shadow-inner">
                            <FaClock className="h-7 w-7 text-white drop-shadow-md" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-white drop-shadow-sm">Lundi - Vendredi</h3>
                            <p className="text-white text-lg font-medium">9h - 18h</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-5 rounded-xl bg-gradient-to-r from-kote-turquoise/40 to-kote-blue-light/30 backdrop-blur-md border border-white/30 shadow-lg transform-gpu transition-all duration-300 hover:scale-[1.02]">
                          <div className="mr-4 p-3 bg-white/30 rounded-full shadow-inner">
                            <FaClock className="h-7 w-7 text-white drop-shadow-md" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-white drop-shadow-sm">Samedi</h3>
                            <p className="text-white text-lg font-medium">9h - 12h</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <div className="inline-block py-3 px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-md">
                          <p className="text-white/90 text-sm font-medium">Fermé le dimanche et jours fériés</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              {/* Réseaux sociaux */}
              <AnimatedElement delay={0.5}>
                <div className="relative h-full">
                  <div className="card-shadow-projected" aria-hidden="true"></div>
                  
                  <div className="relative h-full p-6 card-glass-transparent card-glass-reflect overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <h2 className="text-2xl font-bold text-white mb-6">Suivez-nous</h2>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <a 
                          href={contact.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-500/40 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300"
                        >
                          <div className="mr-4 p-3 bg-white/20 rounded-full">
                            <FaInstagram className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">Instagram</h3>
                            <p className="text-white/80 text-sm">@kotepiscine.guadeloupe</p>
                          </div>
                        </a>

                        <a 
                          href={contact.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-600/40 to-blue-400/40 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300"
                        >
                          <div className="mr-4 p-3 bg-white/20 rounded-full">
                            <FaFacebook className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">Facebook</h3>
                            <p className="text-white/80 text-sm">kotepiscine.guadeloupe</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>

          {/* SECTION 2: Carte Google Maps complète */}
          <AnimatedElement delay={0.6} className="col-span-12">
            <div className="relative h-full">
              <div className="card-shadow-projected" aria-hidden="true"></div>
              
              <div className="relative h-full card-glass-transparent card-glass-reflect overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                
                <div className="relative z-10 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Notre emplacement</h2>
                    
                    <div className="flex items-center space-x-4">
                      <CtaButton 
                        to={contact.social.maps}
                        text="Trouver un itinéraire"
                        external={true}
                        color="green"
                        icon="map"
                        size="large"
                        outline={false}
                        className="shadow-xl text-white font-bold text-xl bg-kote-green hover:bg-kote-green/90 border-white/30 px-8 py-4"
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden h-[450px] border border-white/30 shadow-xl">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5162.112589466171!2d-61.34588892486029!3d16.24934398445657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c134b816a602235%3A0xddd845e855cd6a88!2sKot%C3%A9%20Piscine!5e1!3m2!1sfr!2sfr!4v1748299388619!5m2!1sfr!2sfr"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localisation Koté Piscine"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 mb-4 md:mb-0">
                      <FaMapMarkerAlt className="mr-3 text-kote-turquoise" />
                      <span className="text-white font-medium">{address.road}, {address.city}, {address.region}</span>
                    </div>
                    
                    <div className="text-white/80 text-sm">
                      <span className="block md:inline">Coordonnées GPS : </span>
                      <span className="font-medium">16.249344, -61.345889</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* SECTION 3: Moyens de contact (2 colonnes) */}
          <div className="col-span-12 grid grid-cols-12 gap-6 mb-6">
            {/* CTA téléphone principal */}
            <AnimatedElement delay={0.1} className="col-span-12 md:col-span-6">
              <div className="relative h-full">
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full overflow-hidden backdrop-blur-xl bg-gradient-to-br from-kote-turquoise/80 to-kote-blue-light/70 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-2xl">
                  {/* Effet de bulle d'eau */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="p-3 bg-white/20 rounded-2xl mb-5">
                      <FaPhone className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Appelez-nous <span className="text-kote-blue-dark">directement</span>
                    </h3>
                    
                    <p className="text-white font-medium mb-6">
                      Notre équipe est à votre écoute pour répondre à toutes vos questions
                    </p>
                    
                    <CtaButton 
                      to={`tel:${contact.phone.tel}`}
                      text={contact.phone.display}
                      external={true}
                      color="blue"
                      size="large"
                      icon="phone"
                      outline={false}
                      className="shadow-xl text-white font-bold text-xl bg-kote-blue-light hover:bg-kote-blue-light/90 border-white/30 px-8 py-4"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* CTA email */}
            <AnimatedElement delay={0.2} className="col-span-12 md:col-span-6">
              <div className="relative h-full">
                <div className="card-shadow-projected" aria-hidden="true"></div>
                
                <div className="relative h-full overflow-hidden backdrop-blur-xl bg-gradient-to-br from-kote-blue-light/80 to-kote-blue-dark/70 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-2xl">
                  {/* Effet de bulle d'eau */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="p-3 bg-white/20 rounded-2xl mb-5">
                      <FaEnvelope className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Écrivez-nous <span className="text-kote-turquoise">par email</span>
                    </h3>
                    
                    <p className="text-white font-medium mb-6">
                      Pour vos demandes de devis ou informations sur nos produits
                    </p>
                    
                    <CtaButton 
                      to={`mailto:${contact.email}`}
                      text="Envoyer un Mail"
                      external={true}
                      color="turquoise"
                      size="large"
                      icon="envelope"
                      outline={false}
                      className="shadow-xl text-white font-bold text-xl bg-kote-turquoise hover:bg-kote-turquoise/90 border-white/30 px-8 py-4"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* SECTION 4: Notre équipe */}
          <AnimatedElement delay={0.7} className="col-span-12">
            <div className="relative h-full">
              <div className="card-shadow-projected" aria-hidden="true"></div>
              
              <div className="relative h-full card-glass-transparent card-glass-reflect overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                
                <div className="relative z-10 p-6">
                  <h2 className="text-3xl font-bold text-white mb-8">L'équipe Koté Piscine</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                      <div 
                        key={member.id}
                        className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/20 border border-white/10 group hover:transform hover:scale-105 transition-all duration-500"
                      >
                        <div className="h-56 overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Overlay de l'image */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="mb-2 flex items-center">
                            <div className="p-2 mr-2 rounded-full bg-kote-turquoise/50">
                              <FaUser className="h-3 w-3" />
                            </div>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                          </div>
                          <p className="text-white/90 text-sm mb-2">{member.role}</p>
                          <p className="text-white/80 text-xs">{member.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 