import whyChooseUsImage from '../../images/illustrations/construction-piscine.webp';

const reasons = [
  {
    id: 1,
    title: "Expertise de 20 ans",
    description: "Notre équipe possède plus de 20 ans d'expérience dans le domaine de la piscine en Guadeloupe.",
  },
  {
    id: 2,
    title: "Service personnalisé",
    description: "Nous adaptons nos prestations à vos besoins spécifiques pour une satisfaction garantie.",
  },
  {
    id: 3,
    title: "Matériaux de qualité",
    description: "Nous utilisons uniquement des produits et équipements de haute qualité pour assurer la durabilité de votre piscine.",
  },
  {
    id: 4,
    title: "Garantie des travaux",
    description: "Tous nos travaux sont garantis pour vous offrir une tranquillité d'esprit totale.",
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-dark-overlay relative">
      <div className="container-kote relative z-10">
        <h2 className="section-title text-white">Pourquoi nous choisir ?</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <img 
              src={whyChooseUsImage} 
              alt="Koté Piscine - Notre expertise" 
              className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[600px]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '';
                e.currentTarget.alt = 'Image non disponible';
                e.currentTarget.className = 'hidden';
              }}
            />
          </div>
          
          <div>
            <p className="text-white/90 mb-8">
              Depuis 20 ans, Koté Piscine s'est imposé comme le spécialiste de référence pour la construction et 
              l'entretien de piscines en Guadeloupe. Notre passion pour l'excellence et notre engagement envers 
              la satisfaction client font de nous le partenaire idéal pour votre projet aquatique.
            </p>
            
            <div className="space-y-6">
              {reasons.map(reason => (
                <div key={reason.id} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-kote-blue-dark flex items-center justify-center text-white">
                    {reason.id}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                    <p className="mt-1 text-white/80">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 