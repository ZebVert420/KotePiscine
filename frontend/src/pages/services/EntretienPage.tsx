import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';

const EntretienPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Entretien de Piscines | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Services d\'entretien professionnel pour votre piscine en Guadeloupe. Nettoyage, équilibre de l\'eau et maintenance.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Services d\'entretien professionnel pour votre piscine en Guadeloupe. Nettoyage, équilibre de l\'eau et maintenance.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <AnimatedElement>
        <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
          Entretien de Piscines
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Profitez de votre piscine sans vous soucier de son entretien grâce à nos services professionnels.
          </p>
          
          {/* Contenu à venir */}
          <div className="bg-blue-50 p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
              Nos formules d'entretien
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

export default EntretienPage; 