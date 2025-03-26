import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="py-32">
      <div className="container-kote">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-kote-blue-dark">404</h1>
          
          <div className="relative mt-5 mb-8">
            <div className="h-1 bg-gradient-to-r from-kote-blue-light to-kote-turquoise w-24 mx-auto"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-kote-blue-dark mb-6">Page non trouvée</h2>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="mb-16 mx-auto max-w-md">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => handleNavigation('/')}
                className="btn-primary"
              >
                Retourner à l'accueil
              </button>
              <button 
                onClick={() => handleNavigation('/catalogue')}
                className="btn-outline"
              >
                Voir notre catalogue
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden max-w-xl mx-auto">
            <svg 
              viewBox="0 0 600 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Fond avec vagues */}
              <path 
                d="M0 150C0 150 100 100 200 150C300 200 400 150 600 250V400H0V150Z" 
                fill="#F5F8FC" 
              />
              <path 
                d="M0 250C0 250 150 200 300 250C450 300 500 250 600 300V400H0V250Z" 
                fillOpacity="0.8" 
                fill="#0099D9" 
              />
              <path 
                d="M0 300C0 300 150 320 250 300C350 280 450 350 600 320V400H0V300Z" 
                fillOpacity="0.5" 
                fill="#40C0F0" 
              />
              
              {/* Illustration piscine */}
              <rect x="200" y="100" width="200" height="150" rx="10" fill="#244F82" />
              <rect x="210" y="110" width="180" height="130" rx="5" fill="#40C0F0" />
              
              {/* Échelle */}
              <rect x="210" y="90" width="5" height="30" fill="#B0C852" />
              <rect x="235" y="90" width="5" height="30" fill="#B0C852" />
              <rect x="210" y="95" width="30" height="5" fill="#B0C852" />
              <rect x="210" y="110" width="30" height="5" fill="#B0C852" />
              
              {/* Bouée */}
              <circle cx="350" cy="150" r="20" fill="#FFF" />
              <circle cx="350" cy="150" r="12" fill="#F44336" />
              
              {/* Texte 404 dans la piscine */}
              <text 
                x="300" 
                y="180" 
                textAnchor="middle" 
                fill="white" 
                fontWeight="bold" 
                fontSize="36"
                fontFamily="Arboria, sans-serif"
              >
                404
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 