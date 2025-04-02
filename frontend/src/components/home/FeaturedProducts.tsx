import { Link } from 'react-router-dom';
import { Product } from '../../types';
import ProductGrid from '../products/ProductGrid';
import CtaButton from '../common/CtaButton';

// Import des images produits
import algastopCtxpro from '../../images/photos/products/algastop-ctxpro.jpg';
import robotMaytronicsS100 from '../../images/photos/products/robot-maytronics-s100.png';
import epuissetteDeFond from '../../images/photos/products/epuissette-de-fond.jpg';

// Produits à la une (reprenant 3 produits réels du catalogue)
const featuredProducts: Product[] = [
  {
    _id: '1',
    name: 'AlgaStop CTX Pro',
    slug: 'algastop-ctx-pro',
    description: 'Anti-algues concentré pour piscine, efficace contre tous types d\'algues. Traitement préventif et curatif.',
    price: 34.99,
    category: 1,
    inStock: true,
    rating: 4.8,
    numReviews: 56,
    images: [algastopCtxpro]
  },
  {
    _id: '5',
    name: 'Robot Maytronics S100',
    slug: 'robot-maytronics-s100',
    description: 'Robot nettoyeur autonome Dolphin S100 pour piscines jusqu\'à 10m. Nettoyage optimal du fond et des parois.',
    price: 699.99,
    category: 3,
    inStock: true,
    rating: 4.9,
    numReviews: 48,
    images: [robotMaytronicsS100]
  },
  {
    _id: '2',
    name: 'Épuisette de fond',
    slug: 'epuisette-de-fond',
    description: `🌊 Offrez à votre piscine un entretien de qualité supérieure avec l'épuisette de fond Blue Devil !

    Alliant robustesse, design ergonomique et efficacité, cette épuisette de fond premium est l'outil idéal pour un nettoyage en profondeur. Sa structure en aluminium léger et son filet renforcé permettent de collecter feuilles, sable et sédiments sans effort. Compatible avec les manches standards, elle s'adapte facilement à tous types de bassins.`,
    price: 19.99,
    category: 4,
    inStock: true,
    rating: 4.5,
    numReviews: 28,
    images: [epuissetteDeFond]
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-black/30 backdrop-blur-sm">
      <div className="container-kote relative z-10">
        <h2 className="section-title text-white">Produits à la une</h2>
        <p className="text-center text-white/90 max-w-3xl mx-auto mb-12">
          Découvrez notre sélection de produits de qualité pour l'entretien et l'équipement de votre piscine.
          Tous nos produits sont disponibles dans notre magasin en Guadeloupe.
        </p>
        
        <ProductGrid products={featuredProducts} columns={3} />
        
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton
              to="/catalogue"
              text="Voir tous nos produits"
              color="blue"
              size="large"
              icon="arrow"
            />
            {featuredProducts.map((product) => (
              <Link 
                key={product._id}
                to={`/catalogue/${product.slug}`}
                className="hidden"
                aria-hidden="true"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 