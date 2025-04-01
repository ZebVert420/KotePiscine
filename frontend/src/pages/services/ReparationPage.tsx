import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedElement from '../../components/common/AnimatedElement';

const ReparationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Réparation de Robots et Pompes | Koté Piscine</title>
        <meta name="description" content="Service technique spécialisé dans la réparation de robots et pompes de piscine. Expertise et intervention rapide pour tous vos équipements." />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
            Réparation de Robots et Pompes
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Service technique spécialisé dans la réparation et maintenance de vos équipements de piscine.
            </p>
            
            {/* Contenu à venir */}
            <div className="bg-blue-50 p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
                Notre expertise technique
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

export default ReparationPage; 