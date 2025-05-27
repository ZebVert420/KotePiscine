import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';
import CtaButton from '../../components/common/CtaButton';
import { contact } from '../../config/contact';
import { assetService } from '../../services/assetService';

const ReparationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Réparation d'Équipements de Piscine | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Service de réparation pour tous vos équipements de piscine en Guadeloupe. Pompes, filtres, robots et systèmes de chauffage.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Service de réparation pour tous vos équipements de piscine en Guadeloupe. Pompes, filtres, robots et systèmes de chauffage.';
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
            src={assetService.getImagePath('illustrations/reparation-pompe2.webp')}
            alt="Réparation de pompe de piscine"
            className="rounded-t-xl h-64 w-full object-cover mb-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = assetService.getImagePath('placeholders/service-default.svg');
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 px-6 md:px-8">
            Réparation d'Équipements de Piscine
          </h1>
          <div className="prose prose-lg max-w-none px-6 md:px-8 pb-8">
            <p className="text-xl text-white/90 mb-8">
              Un problème avec votre pompe, votre robot ou votre système de filtration&nbsp;? Koté Piscine intervient rapidement pour diagnostiquer et réparer tous vos équipements, afin de garantir le bon fonctionnement de votre bassin toute l'année.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Nos services de réparation</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Diagnostic précis</b> sur place ou en atelier</li>
              <li>✔️ <b>Réparation de pompes, filtres, robots, électrolyseurs, chauffages</b></li>
              <li>✔️ <b>Remplacement de pièces défectueuses</b> (joints, moteurs, cartes électroniques...)</li>
              <li>✔️ <b>Maintenance préventive</b> pour éviter les pannes récurrentes</li>
              <li>✔️ <b>Service express</b> pour limiter l'immobilisation de votre piscine</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Pourquoi choisir Koté Piscine&nbsp;?</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Techniciens expérimentés</b> et formés aux dernières technologies</li>
              <li>✔️ <b>Pièces détachées d'origine</b> et garanties</li>
              <li>✔️ <b>Transparence des tarifs</b> et devis avant intervention</li>
              <li>✔️ <b>Conseils personnalisés</b> pour prolonger la durée de vie de vos équipements</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Intervention rapide en Guadeloupe</h2>
            <p className="mb-8 text-white/90">
              Nous intervenons sur toute la Guadeloupe, à domicile ou en atelier, pour assurer la remise en service rapide de votre piscine. Notre priorité&nbsp;: votre tranquillité et la pérennité de vos installations.
            </p>

            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Besoin d'une réparation&nbsp;?</h3>
              <p className="mb-4 text-white/90">Contactez-nous pour un diagnostic rapide ou un devis de réparation personnalisé.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CtaButton to="/contact" text="Demander un devis réparation" color="green" size="large" icon="arrow" />
                <CtaButton to={`tel:${contact.phone.tel}`} text={contact.phone.display} external={true} color="turquoise" size="default" icon="phone" />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default ReparationPage; 