import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 relative">
      {/* Filtre foncé */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <div className="container-kote relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à donner vie à votre projet piscine ?
          </h2>
          <p className="text-white/90 mb-8">
            Nos experts sont là pour vous accompagner dans la réalisation de votre rêve aquatique.
            Contactez-nous dès maintenant pour un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+590590838509" 
              className="btn-primary"
            >
              Appelez-nous
            </a>
            <Link 
              to="/contact" 
              className="btn-secondary"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 