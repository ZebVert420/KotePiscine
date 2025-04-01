import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';

const ConstructionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Construction de Piscines | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experts en construction de piscines personnalisées en Guadeloupe. Béton, liner ou coque, nous réalisons votre projet sur-mesure.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experts en construction de piscines personnalisées en Guadeloupe. Béton, liner ou coque, nous réalisons votre projet sur-mesure.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <AnimatedElement>
        <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
          Construction de Piscines
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Réalisez votre rêve avec une piscine parfaitement adaptée à votre espace et à vos envies.
          </p>
          
          {/* Contenu à venir */}
          <div className="bg-blue-50 p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
              Nos techniques de construction
            </h2>
            <p>
              Contenu détaillé à venir...
            </p>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default ConstructionPage; 