import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';
import CtaButton from '../../components/common/CtaButton';
import { contact } from '../../config/contact';
import entretienPiscine from '../../images/illustrations/entretien-piscine.webp';
import serviceDefaultImage from '../../images/placeholders/service-default.svg';

const EntretienPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Entretien de Piscines | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Service d\'entretien régulier ou ponctuel pour votre piscine en Guadeloupe. Traitement de l\'eau, nettoyage et maintenance par des experts.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Service d\'entretien régulier ou ponctuel pour votre piscine en Guadeloupe. Traitement de l\'eau, nettoyage et maintenance par des experts.';
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
            src={entretienPiscine}
            alt="Entretien professionnel de piscine"
            className="rounded-t-xl h-64 w-full object-cover mb-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = serviceDefaultImage;
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 px-6 md:px-8">
            Entretien de Piscines
          </h1>
          <div className="prose prose-lg max-w-none px-6 md:px-8 pb-8">
            <p className="text-xl text-white/90 mb-8">
              Profitez de votre piscine sans contrainte&nbsp;: Koté Piscine prend en charge l'entretien complet de votre bassin, pour une eau toujours propre, saine et un matériel qui dure.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Nos formules d'entretien</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Entretien régulier</b> (hebdomadaire, mensuel ou à la demande)</li>
              <li>✔️ <b>Nettoyage complet</b> du bassin, des skimmers, filtres et plages</li>
              <li>✔️ <b>Analyse et traitement de l'eau</b> (pH, chlore, sel, etc.)</li>
              <li>✔️ <b>Contrôle et maintenance</b> des équipements (pompe, filtration, robot...)</li>
              <li>✔️ <b>Conseils personnalisés</b> pour prolonger la durée de vie de votre installation</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Pourquoi nous confier l'entretien&nbsp;?</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Gain de temps</b> : profitez de votre piscine sans vous soucier des contraintes techniques</li>
              <li>✔️ <b>Qualité professionnelle</b> : produits adaptés, gestes experts, suivi régulier</li>
              <li>✔️ <b>Intervention rapide</b> en cas de problème ou de panne</li>
              <li>✔️ <b>Tranquillité d'esprit</b> toute l'année, même en votre absence</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Un service sur-mesure, local et humain</h2>
            <p className="mb-8 text-white/90">
              Nous adaptons nos prestations à vos besoins et à votre budget. Notre équipe, basée en Guadeloupe, privilégie la proximité, la réactivité et le conseil personnalisé.
            </p>

            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Besoin d'un entretien professionnel&nbsp;?</h3>
              <p className="mb-4 text-white/90">Contactez-nous pour un devis gratuit ou pour mettre en place un contrat d'entretien adapté à votre piscine.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CtaButton to="/contact" text="Demander un devis entretien" color="green" size="large" icon="arrow" />
                <CtaButton to={`tel:${contact.phone.tel}`} text={contact.phone.display} external={true} color="turquoise" size="default" icon="phone" />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default EntretienPage; 