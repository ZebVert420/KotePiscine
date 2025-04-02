import { IconType } from 'react-icons';
import { FaSwimmingPool, FaTools, FaWrench, FaCog, FaMagic } from 'react-icons/fa';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: IconType;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'construction',
    title: 'Construction de Piscine',
    slug: 'construction-piscine',
    description: 'Réalisez votre rêve avec une piscine sur mesure. Notre expertise en construction vous garantit un résultat exceptionnel.',
    image: 'illustrations/construction-piscine.webp',
    icon: FaSwimmingPool,
    features: [
      'Étude personnalisée de votre projet',
      'Conception sur mesure',
      'Respect des normes en vigueur',
      'Garantie décennale'
    ]
  },
  {
    id: 'renovation',
    title: 'Rénovation de Piscine',
    slug: 'renovation-piscine',
    description: 'Donnez une seconde vie à votre piscine avec nos services de rénovation complets.',
    image: 'illustrations/renovation-liner.webp',
    icon: FaTools,
    features: [
      'Diagnostic complet',
      'Rénovation structurelle',
      'Modernisation des équipements',
      'Étanchéité garantie'
    ]
  },
  {
    id: 'entretien',
    title: 'Entretien de Piscine',
    slug: 'entretien-piscine',
    description: 'Profitez de votre piscine en toute sérénité avec nos services d\'entretien régulier.',
    image: 'illustrations/entretien-piscine.webp',
    icon: FaWrench,
    features: [
      'Nettoyage complet',
      'Traitement de l\'eau',
      'Maintenance des équipements',
      'Contrôles réguliers'
    ]
  },
  {
    id: 'reparation',
    title: 'Réparation Équipements',
    slug: 'reparation-piscine',
    description: 'Service de réparation rapide et efficace pour tous vos équipements de piscine.',
    image: 'illustrations/reparation-pompe2.webp',
    icon: FaCog,
    features: [
      'Diagnostic précis',
      'Réparation pompes et filtres',
      'Maintenance robots',
      'Service express'
    ]
  },
  {
    id: 'automatisme',
    title: 'Automatismes Piscine',
    slug: 'automatismes-piscine',
    description: 'Simplifiez-vous la vie avec nos solutions d\'automatisation pour piscine.',
    image: 'illustrations/reparation-robot2.webp',
    icon: FaMagic,
    features: [
      'Traitement automatique',
      'Régulation intelligente',
      'Domotique piscine',
      'Installation professionnelle'
    ]
  }
];