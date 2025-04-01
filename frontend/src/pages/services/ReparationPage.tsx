import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';

const ReparationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Réparation d'Équipements de Piscine | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Service de réparation pour tous vos équipements de piscine en Guadeloupe. Pompes, filtres, robots et systèmes de chauffage.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Service de réparation pour tous vos équipements de piscine en Guadeloupe. Pompes, filtres, robots et systèmes de chauffage.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <AnimatedElement>
        <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
          Réparation d'Équipements
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Nos techniciens qualifiés réparent tous vos équipements de piscine rapidement et efficacement.
          </p>
          
          {/* Contenu à venir */}
          <div className="bg-blue-50 p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
              Nos services de réparation
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

export default ReparationPage; 