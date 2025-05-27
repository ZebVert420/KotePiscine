import { useEffect } from 'react';
import AnimatedElement from '../../components/common/AnimatedElement';
import CtaButton from '../../components/common/CtaButton';
import { contact } from '../../config/contact';
import { assetService } from '../../services/assetService';

const ConstructionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour le titre et la méta description
    document.title = "Construction de Piscines | Koté Piscine";
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experts en construction de piscines personnalisées en Guadeloupe. Béton, liner ou coque, nous réalisons votre projet sur-mesure.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experts en construction de piscines personnalisées en Guadeloupe. Béton, liner ou coque, nous réalisons votre projet sur-mesure.';
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
            src={assetService.getImagePath('illustrations/construction-piscine.webp')}
            alt="Construction de piscine sur mesure"
            className="rounded-t-xl h-64 w-full object-cover mb-8"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = assetService.getImagePath('placeholders/service-default.svg');
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 px-6 md:px-8">
            Construction de Piscines sur-mesure
          </h1>
          <div className="prose prose-lg max-w-none px-6 md:px-8 pb-8">
            <p className="text-xl text-white/90 mb-8">
              Vous rêvez d'une piscine parfaitement adaptée à votre espace et à vos envies&nbsp;? Chez Koté Piscine, nous concevons et réalisons des piscines sur-mesure, robustes et élégantes, pour sublimer votre extérieur et valoriser votre maison.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Pourquoi choisir Koté Piscine&nbsp;?</h2>
            <ul className="mb-8 text-white/90">
              <li>✔️ <b>Étude personnalisée</b> de votre terrain et de vos besoins</li>
              <li>✔️ <b>Conception sur-mesure</b> (forme, dimensions, finitions, équipements)</li>
              <li>✔️ <b>Matériaux haut de gamme</b> (béton armé, liner, carrelage, etc.)</li>
              <li>✔️ <b>Respect des normes</b> et garantie décennale</li>
              <li>✔️ <b>Accompagnement de A à Z</b> : démarches, terrassement, installation, mise en eau</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Nos techniques de construction</h2>
            <ul className="mb-8 text-white/90">
              <li><b>Piscine béton</b> : solidité, personnalisation totale, longévité</li>
              <li><b>Piscine à débordement</b> : effet visuel haut de gamme, intégration paysagère</li>
              <li><b>Piscine avec système autonettoyant</b> : confort d'utilisation, entretien facilité</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">Votre projet, notre expertise</h2>
            <p className="mb-8 text-white/90">
              Nous vous accompagnons à chaque étape, du premier rendez-vous à la première baignade. Notre équipe locale, à taille humaine, privilégie l'écoute, la transparence et la qualité d'exécution. Chaque piscine est unique, conçue pour durer et vous offrir un plaisir sans souci.
            </p>

            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Prêt à concrétiser votre projet&nbsp;?</h3>
              <p className="mb-4 text-white/90">Contactez-nous pour une étude gratuite et personnalisée de votre future piscine en Guadeloupe.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CtaButton to="/contact" text="Demander un devis gratuit" color="green" size="large" icon="arrow" />
                <CtaButton to={`tel:${contact.phone.tel}`} text={contact.phone.display} external={true} color="turquoise" size="default" icon="phone" />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default ConstructionPage; 