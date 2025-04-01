import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';

const AutomatismesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Automatismes de Piscine | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Solutions d\'automatisation pour votre piscine. Contrôlez facilement la filtration, le chauffage et l\'éclairage de votre bassin.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Solutions d\'automatisation pour votre piscine. Contrôlez facilement la filtration, le chauffage et l\'éclairage de votre bassin.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
            Automatismes de Piscine
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Simplifiez la gestion de votre piscine avec nos solutions d'automatisation intelligentes.
            </p>
            
            {/* Contenu à venir */}
            <div className="bg-blue-50 p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
                Nos solutions d'automatisation
              </h2>
              <p>
                Contenu détaillé à venir...
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </>
  );
};

export default AutomatismesPage; 