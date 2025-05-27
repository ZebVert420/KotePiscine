import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';
import CtaButton from '../../components/common/CtaButton';
import { contact } from '../../config/contact';
import renovationLiner from '../../images/illustrations/renovation-liner.webp';
import serviceDefaultImage from '../../images/placeholders/service-default.svg';

const RenovationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Rénovation de Piscines | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experts en rénovation et restauration de piscines en Guadeloupe. Changement de liner, étanchéité, modernisation des équipements.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experts en rénovation et restauration de piscines en Guadeloupe. Changement de liner, étanchéité, modernisation des équipements.';
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
            src={renovationLiner}
            alt="Rénovation de piscine"
            className="rounded-t-xl h-64 w-full object-cover mb-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = serviceDefaultImage;
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 px-6 md:px-8">
            Rénovation de Piscines
          </h1>
          <div className="prose prose-lg max-w-none px-6 md:px-8 pb-8">
            <p className="text-xl text-white/90 mb-8">
              Votre piscine montre des signes de fatigue&nbsp;? Liner abîmé, équipements vieillissants, fuites ou esthétique dépassée&nbsp;? Koté Piscine vous accompagne pour redonner vie à votre bassin et le moderniser selon vos envies.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Pourquoi rénover votre piscine&nbsp;?</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Améliorer l'étanchéité</b> et la sécurité</li>
              <li>✔️ <b>Moderniser l'esthétique</b> (liner, margelles, éclairage, etc.)</li>
              <li>✔️ <b>Optimiser la consommation d'eau et d'énergie</b></li>
              <li>✔️ <b>Ajouter des équipements</b> (chauffage, traitement automatique, domotique)</li>
              <li>✔️ <b>Valoriser votre bien immobilier</b></li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Nos solutions de rénovation</h2>
            <ul className="mb-8 text-white/90">
              <li><b>Changement de liner ou de revêtement</b> : large choix de coloris et textures</li>
              <li><b>Réparation structurelle</b> : traitement des fissures, reprise béton</li>
              <li><b>Remplacement ou ajout d'équipements</b> : filtration, pompe, éclairage LED, escaliers, etc.</li>
              <li><b>Transformation esthétique</b> : margelles, plage, intégration paysagère</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Un accompagnement sur-mesure</h2>
            <p className="mb-8 text-white/90">
              Nous réalisons un diagnostic complet de votre bassin et vous proposons un devis détaillé, transparent et adapté à votre budget. Notre équipe locale assure un suivi rigoureux et des travaux de qualité, dans le respect des délais annoncés.
            </p>

            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Envie de redonner vie à votre piscine&nbsp;?</h3>
              <p className="mb-4 text-white/90">Contactez-nous pour une étude gratuite et découvrez toutes les possibilités de rénovation pour votre piscine en Guadeloupe.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CtaButton to="/contact" text="Demander un devis rénovation" color="green" size="large" icon="arrow" />
                <CtaButton to={`tel:${contact.phone.tel}`} text={contact.phone.display} external={true} color="turquoise" size="default" icon="phone" />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default RenovationPage; 