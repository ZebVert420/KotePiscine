import { Product } from '../types';

// Import des images produits
import algastopCtxpro from '../images/photos/products/algastop-ctxpro.jpg';
import epuissetteDeFond from '../images/photos/products/epuissette-de-fond.jpg';
import balaisLinerAValve from '../images/photos/products/balais-liner-a-valve.jpg';
import brosseDeNettoyage from '../images/photos/products/brosse-de-nettoyage.jpg';
import robotMaytronicsS100 from '../images/photos/products/robot-maytronics-s100.png';
import robotMaytronicsS300i from '../images/photos/products/robot-maytronics-s300i.png';

export const productsData: Product[] = [
  {
    _id: '1',
    name: 'AlgaStop CTX Pro',
    slug: 'algastop-ctx-pro',
    description: 'Anti-algues concentré pour piscine, efficace contre tous types d\'algues. Traitement préventif et curatif.',
    price: 34.99,
    category: 1,
    inStock: true,
    images: [algastopCtxpro]
  },
  {
    _id: '2',
    name: 'Épuisette de fond',
    slug: 'epuisette-de-fond',
    description: `🌊 Offrez à votre piscine un entretien de qualité supérieure avec l'épuisette de fond Blue Devil !

    Alliant robustesse, design ergonomique et efficacité, cette épuisette de fond premium est l'outil idéal pour un nettoyage en profondeur. Sa structure en aluminium léger et son filet renforcé permettent de collecter feuilles, sable et sédiments sans effort. Compatible avec les manches standards, elle s'adapte facilement à tous types de bassins.`,
    price: 19.99,
    category: 2,
    inStock: true,
    images: [epuissetteDeFond]
  },
  {
    _id: '3',
    name: 'Balais liner à valve',
    slug: 'balais-liner-a-valve',
    description: 'Balais de nettoyage spécial liner avec valve pour une aspiration optimale. S\'adapte à tous les manches télescopiques standard.',
    price: 29.99,
    category: 2,
    inStock: true,
    images: [balaisLinerAValve]
  },
  {
    _id: '4',
    name: 'Brosse de nettoyage',
    slug: 'brosse-de-nettoyage',
    description: 'Brosse de qualité professionnelle pour nettoyer efficacement les parois et le fond de votre piscine.',
    price: 15.99,
    category: 2,
    inStock: true,
    images: [brosseDeNettoyage]
  },
  {
    _id: '5',
    name: 'Robot Maytronics S100',
    slug: 'robot-maytronics-s100',
    description: 'Robot nettoyeur autonome Dolphin S100 pour piscines jusqu\'à 10m. Nettoyage optimal du fond et des parois.',
    price: 699.99,
    category: 3,
    inStock: true,
    images: [robotMaytronicsS100]
  },
  {
    _id: '6',
    name: 'Robot Maytronics S300i',
    slug: 'robot-maytronics-s300i',
    description: 'Robot haut de gamme avec contrôle via smartphone. Nettoyage complet fond, parois et ligne d\'eau. Technologie PowerStream.',
    price: 1299.99,
    category: 3,
    inStock: false,
    images: [robotMaytronicsS300i]
  },
  {
    _id: '7',
    name: 'pH Moins liquide - 20L',
    slug: 'ph-moins-liquide-20l',
    description: 'Solution acide concentrée pour réduire le pH de l\'eau de votre piscine. Format économique.',
    price: 24.99,
    category: 1,
    inStock: true,
    images: [algastopCtxpro]
  },
  {
    _id: '8',
    name: 'Pompe de filtration Pentair',
    slug: 'pompe-filtration-pentair',
    description: 'Pompe de filtration haut de gamme, silencieuse et économe en énergie. Débit optimal.',
    price: 549.99,
    category: 4,
    inStock: true,
    images: [robotMaytronicsS300i]
  },
  {
    _id: '9',
    name: 'Chlore choc granulés - 5kg',
    slug: 'chlore-choc-granules',
    description: 'Traitement choc au chlore en granulés. Action rapide contre les algues et les bactéries. Idéal pour une eau verte ou trouble.',
    price: 39.99,
    category: 1,
    inStock: true,
    images: [algastopCtxpro]
  },
  {
    _id: '10',
    name: 'Filtre à sable Premium',
    slug: 'filtre-sable-premium',
    description: 'Filtre à sable haute performance avec vanne multivoies. Capacité de filtration optimale pour une eau cristalline.',
    price: 399.99,
    category: 4,
    inStock: true,
    images: [robotMaytronicsS300i]
  },
  {
    _id: '11',
    name: 'Kit raccords PVC pression',
    slug: 'kit-raccords-pvc',
    description: 'Kit complet de raccords PVC pour circuit de filtration. Comprend coudes, manchons et raccords union.',
    price: 45.99,
    category: 5,
    inStock: true,
    images: [brosseDeNettoyage]
  },
  {
    _id: '12',
    name: 'Robot électrique Zodiac',
    slug: 'robot-zodiac-premium',
    description: 'Robot nettoyeur électrique Zodiac avec navigation intelligente. Idéal pour les piscines jusqu\'à 12m. Nettoyage fond, parois et ligne d\'eau.',
    price: 899.99,
    category: 3,
    inStock: true,
    images: [robotMaytronicsS100]
  },
  {
    _id: '13',
    name: 'Vanne papillon PVC',
    slug: 'vanne-papillon-pvc',
    description: 'Vanne papillon en PVC pour isolation des circuits. Installation facile et maintenance réduite.',
    price: 29.99,
    category: 5,
    inStock: true,
    images: [brosseDeNettoyage]
  },
  {
    _id: '14',
    name: 'Pompe doseuse pH',
    slug: 'pompe-doseuse-ph',
    description: 'Pompe doseuse automatique pour régulation du pH. Installation simple et régulation précise.',
    price: 299.99,
    category: 4,
    inStock: true,
    images: [robotMaytronicsS300i]
  }
]; 