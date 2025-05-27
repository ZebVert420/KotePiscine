// frontend/src/config/fictiveRealisations.config.ts

// Import des images de réalisations
import piscine1 from '../images/photos/realisations/piscine-1.jpg';
import piscine2 from '../images/photos/realisations/piscine-2.jpg';
import piscine3 from '../images/photos/realisations/piscine-3.jpg';
import piscine4 from '../images/photos/realisations/piscine-4.jpg';
import piscine5 from '../images/photos/realisations/piscine-5.jpg';
import piscine6 from '../images/photos/realisations/piscine-6.jpg';

// Interface pour les données de réalisation (identique à celle dans RealisationsPage.tsx pour la cohérence)
export interface FictiveRealisationData {
  id: number;
  title: string;
  location: string;
  description: string;
  services: string[]; // Tags secondaires, ex: ['Filtration Sel', 'Terrasse Bois', 'Volet Roulant']
  images: string[]; // Les imports d'images génèrent des chaînes (URL)
  categorySlug: 'auto-nettoyantes' | 'traditionnelles';
}

export const fictiveRealisationsData: FictiveRealisationData[] = [
  {
    id: 1,
    title: "Piscine Miroir d'Exception à Saint-Barthélemy",
    location: "Saint-Barthélemy",
    description: "Création d'une piscine miroir luxueuse avec débordement sur quatre côtés, offrant une vue imprenable sur l'océan. Système autonettoyant intégré et plage en marbre de Carrare.",
    services: ["Piscine Miroir", "Débordement Total", "Filtration Avancée", "Domotique"],
    images: [
      piscine1,
      piscine2,
      piscine3,
    ],
    categorySlug: 'auto-nettoyantes'
  },
  {
    id: 2,
    title: "Couloir de Nage Élégant en Milieu Urbain",
    location: "Baie-Mahault",
    description: "Intégration d'un couloir de nage de 15m dans un jardin de ville. Revêtement en béton ciré, chauffage solaire et système de nage à contre-courant puissant.",
    services: ["Couloir de Nage", "Béton Ciré", "Chauffage Solaire", "Nage à Contre-Courant"],
    images: [
      piscine2
    ],
    categorySlug: 'traditionnelles'
  },
  {
    id: 3,
    title: "Lagon Naturel avec Plage Immergée",
    location: "Sainte-Rose",
    description: "Conception d'une piscine forme libre style lagon, avec plage immergée en sable, rochers décoratifs et cascade. Filtration biologique et éclairage d'ambiance LED.",
    services: ["Forme Libre", "Plage Immergée", "Cascade", "Filtration Biologique"],
    images: [
      piscine3,
      piscine4,
      piscine5,
      piscine6
    ],
    categorySlug: 'traditionnelles'
  },
  {
    id: 4,
    title: "Piscine Intérieure avec Espace Bien-Être",
    location: "Pointe-Noire",
    description: "Réalisation d'une piscine intérieure chauffée avec déshumidification, complétée par un jacuzzi et un sauna. Gestion domotique complète pour un confort optimal.",
    services: ["Piscine Intérieure", "Chauffage", "Jacuzzi", "Sauna", "Domotique"],
    images: [
      piscine4,
      piscine5,
      piscine6
    ],
    categorySlug: 'auto-nettoyantes' 
  },
  {
    id: 5,
    title: "Rénovation Éco-responsable d'une Piscine Ancienne",
    location: "Le Moule",
    description: "Transformation d'une piscine des années 80 en un bassin moderne et économe en énergie. Remplacement du système de filtration, ajout d'une pompe à chaleur et d'un volet solaire.",
    services: ["Rénovation Énergétique", "Pompe à Chaleur", "Volet Solaire", "Étanchéité"],
    images: [
      piscine5,
      piscine6
    ],
    categorySlug: 'traditionnelles'
  },
  {
    id: 6,
    title: "Piscine sur Toit-Terrasse avec Vue Panoramique",
    location: "Le Gosier",
    description: "Installation d'une piscine légère et sécurisée sur un toit-terrasse, offrant une vue spectaculaire. Structure adaptée, étanchéité renforcée et système autonettoyant.",
    services: ["Toit-Terrasse", "Structure Légère", "Étanchéité Spécifique", "Vue Mer"],
    images: [
      piscine6
    ],
    categorySlug: 'auto-nettoyantes'
  },
  {
    id: 7,
    title: "Rénovation Éco-responsable d'une Piscine Ancienne",
    location: "Le Moule",
    description: "Transformation d'une piscine des années 80 en un bassin moderne et économe en énergie. Remplacement du système de filtration, ajout d'une pompe à chaleur et d'un volet solaire.",
    services: ["Rénovation Énergétique", "Pompe à Chaleur", "Volet Solaire", "Étanchéité"],
    images: [
      piscine5,
      piscine6
    ],
    categorySlug: 'traditionnelles'
  },
  {
    id: 8,
    title: "Piscine sur Toit-Terrasse avec Vue Panoramique",
    location: "Le Gosier",
    description: "Installation d'une piscine légère et sécurisée sur un toit-terrasse, offrant une vue spectaculaire. Structure adaptée, étanchéité renforcée et système autonettoyant.",
    services: ["Toit-Terrasse", "Structure Légère", "Étanchéité Spécifique", "Vue Mer"],
    images: [
      piscine6
    ],
    categorySlug: 'auto-nettoyantes'
  },
]; 