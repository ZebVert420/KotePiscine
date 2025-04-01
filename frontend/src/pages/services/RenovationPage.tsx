import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedElement from '../../components/common/AnimatedElement';

const RenovationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Rénovation de Piscines | Koté Piscine</title>
        <meta name="description" content="Service de rénovation de piscines. Nous redonnons une seconde vie à votre espace aquatique avec des solutions adaptées à vos besoins." />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
            Rénovation de Piscines
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Nous redonnons une seconde vie à votre piscine avec des solutions adaptées à vos besoins.
            </p>
            
            {/* Contenu à venir */}
            <div className="bg-blue-50 p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
                Notre expertise en rénovation
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

export default RenovationPage; 