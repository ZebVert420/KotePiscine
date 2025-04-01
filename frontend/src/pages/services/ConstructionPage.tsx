import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedElement from '../../components/common/AnimatedElement';

const ConstructionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Construction de Piscines | Koté Piscine</title>
        <meta name="description" content="Découvrez nos services de construction de piscines sur-mesure. Nous réalisons votre projet de A à Z avec expertise et professionnalisme." />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
            Construction de Piscines
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Nous réalisons votre projet de piscine sur-mesure, parfaitement adaptée à votre terrain et à vos envies.
            </p>
            
            {/* Contenu à venir */}
            <div className="bg-blue-50 p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
                Notre expertise en construction
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

export default ConstructionPage; 