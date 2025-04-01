import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedElement from '../../components/common/AnimatedElement';

const EntretienPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Entretien de Piscines | Koté Piscine</title>
        <meta name="description" content="Service d'entretien professionnel pour votre piscine. Nous assurons la maintenance régulière pour une eau saine et limpide toute l'année." />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-kote-blue-dark mb-8">
            Entretien de Piscines
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Nous assurons l'entretien régulier de votre piscine pour une eau saine et limpide toute l'année.
            </p>
            
            {/* Contenu à venir */}
            <div className="bg-blue-50 p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">
                Notre expertise en entretien
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

export default EntretienPage; 