import { MdAutoAwesome } from 'react-icons/md';
import { TbPool } from 'react-icons/tb';
import { IconType } from 'react-icons'; // Importer IconType pour typer les icônes React

export interface RealisationCategory {
  id: string;
  slug: string;
  title: string;
  icon: IconType; // Changer iconName en icon et utiliser IconType
  description: string; // Description courte pour la catégorie
  heroTitle: string;
  heroSubtitle: string;
}

export const realisationCategories: RealisationCategory[] = [
  {
    id: 'piscines-autonettoyantes',
    slug: 'auto-nettoyantes',
    title: 'Piscines Autonettoyantes',
    icon: MdAutoAwesome, // Utiliser le composant d'icône directement
    description: 'Découvrez nos solutions innovantes pour une piscine toujours propre, sans effort.',
    heroTitle: "Piscines Autonettoyantes : L'innovation au service de votre tranquillité",
    heroSubtitle: "Profitez d'une eau cristalline et d'un entretien minimal grâce à nos systèmes de piscines intelligentes et autonomes. Moins de contraintes, plus de baignades !"
  },
  {
    id: 'piscines-traditionnelles',
    slug: 'traditionnelles',
    title: 'Piscines Traditionnelles',
    icon: TbPool, // Utiliser le composant d'icône directement
    description: 'Explorez nos modèles classiques et personnalisables, alliant esthétique et durabilité.',
    heroTitle: "Piscines Traditionnelles : L'élégance intemporelle pour votre jardin",
    heroSubtitle: "Alliez charme et robustesse avec nos piscines traditionnelles. Bénéficiez de notre savoir-faire pour une intégration parfaite à votre environnement et des moments de détente inoubliables."
  },
]; 