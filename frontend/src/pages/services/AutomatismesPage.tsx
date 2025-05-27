import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';
import CtaButton from '../../components/common/CtaButton';
import { contact } from '../../config/contact';
import { assetService } from '../../services/assetService';

const AutomatismesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Automatismes de Piscine | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Solutions d'automatisation pour votre piscine. Contrôlez facilement la filtration, le chauffage et l'éclairage de votre bassin.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Solutions d'automatisation pour votre piscine. Contrôlez facilement la filtration, le chauffage et l'éclairage de votre bassin.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="relative">
      <div className="card-shadow-projected" aria-hidden="true"></div>
      <div className="relative card-glass-transparent card-glass-reflect overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
        <AnimatedElement className="relative z-10">
          <img 
            src={assetService.getImagePath('illustrations/magasin illustration.jpg')}
            alt="Automatismes et domotique pour piscine"
            className="rounded-t-xl h-64 w-full object-cover mb-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = assetService.getImagePath('placeholders/service-default.svg');
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 px-6 md:px-8">
            Automatismes de Piscine
          </h1>
          <div className="prose prose-lg max-w-none px-6 md:px-8 pb-8">
            <p className="text-xl text-white/90 mb-8">
              Simplifiez la gestion de votre piscine grâce à nos solutions d'automatisation&nbsp;: confort, sécurité et économies d'énergie au quotidien.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Nos solutions d'automatisation</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Régulation automatique du traitement de l'eau</b> (pH, chlore, sel...)</li>
              <li>✔️ <b>Programmation de la filtration</b> selon la saison et l'utilisation</li>
              <li>✔️ <b>Gestion à distance</b> via smartphone ou tablette</li>
              <li>✔️ <b>Contrôle de la température, de l'éclairage et des équipements</b></li>
              <li>✔️ <b>Alertes et sécurité</b> (niveau d'eau, détection de fuite, etc.)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Les avantages de l'automatisation</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Confort d'utilisation</b> : moins de contraintes, plus de plaisir</li>
              <li>✔️ <b>Optimisation des consommations</b> (eau, énergie, produits)</li>
              <li>✔️ <b>Surveillance en temps réel</b> et intervention rapide en cas d'anomalie</li>
              <li>✔️ <b>Valorisation de votre piscine</b> et de votre maison</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Un accompagnement sur-mesure</h2>
            <p className="mb-8 text-white/90">
              Nous vous conseillons sur les solutions les plus adaptées à votre bassin et à votre mode de vie. Installation professionnelle, paramétrage, formation à l'utilisation&nbsp;: nous nous occupons de tout, pour une piscine connectée et sereine.
            </p>

            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Envie de piloter votre piscine du bout des doigts&nbsp;?</h3>
              <p className="mb-4 text-white/90">Contactez-nous pour un devis ou une démonstration de nos solutions d'automatisation en Guadeloupe.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CtaButton to="/contact" text="Demander un devis automatisme" color="green" size="large" icon="arrow" />
                <CtaButton to={`tel:${contact.phone.tel}`} text={contact.phone.display} external={true} color="turquoise" size="default" icon="phone" />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default AutomatismesPage; 