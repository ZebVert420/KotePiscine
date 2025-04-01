import { 
  GiChemicalTank,
  GiWaterTank,
  GiRobotGrab,
  GiWarpPipe
} from 'react-icons/gi';
import { MdCleaningServices } from 'react-icons/md';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: React.ComponentType;
}

export const categories: Category[] = [
  { 
    id: 1, 
    name: 'Produits d\'entretien', 
    slug: 'produits-entretien-piscine',
    icon: GiChemicalTank
  },
  { 
    id: 2, 
    name: 'Équipements d\'entretien', 
    slug: 'equipements-entretien-piscine',
    icon: MdCleaningServices
  },
  { 
    id: 3, 
    name: 'Robots & Nettoyeurs', 
    slug: 'robots-piscine',
    icon: GiRobotGrab
  },
  { 
    id: 4, 
    name: 'Équipements de filtration', 
    slug: 'equipements-filtration-piscine',
    icon: GiWaterTank
  },
  { 
    id: 5, 
    name: 'Tuyauterie', 
    slug: 'tuyauterie-piscine',
    icon: GiWarpPipe
  }
]; 