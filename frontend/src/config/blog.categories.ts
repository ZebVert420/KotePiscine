import React from 'react';
import { 
  FaHammer, 
  FaLightbulb, 
  FaRocket, 
  FaHeart
} from 'react-icons/fa';
import { 
  MdCleaningServices 
} from 'react-icons/md';
import { 
  TbTool 
} from 'react-icons/tb';
import { 
  GiTrowel, 
  GiPalmTree 
} from 'react-icons/gi';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string; // Couleur Tailwind pour la catégorie
  icon?: React.ComponentType; // Icône React Component
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'construction',
    name: 'Construction',
    slug: 'construction-piscine',
    description: 'Conseils et guides pour vos projets de construction de piscine',
    color: 'bg-kote-blue-dark',
    icon: FaHammer
  },
  {
    id: 'entretien',
    name: 'Entretien',
    slug: 'entretien-piscine',
    description: 'Tout savoir sur l\'entretien et le traitement de l\'eau',
    color: 'bg-kote-turquoise',
    icon: MdCleaningServices
  },
  {
    id: 'renovation',
    name: 'Rénovation',
    slug: 'renovation-piscine',
    description: 'Idées et conseils pour rénover votre piscine',
    color: 'bg-kote-blue-light',
    icon: GiTrowel
  },
  {
    id: 'equipements',
    name: 'Équipements',
    slug: 'equipements-piscine',
    description: 'Guides d\'achat et comparatifs d\'équipements',
    color: 'bg-kote-green',
    icon: TbTool
  },
  {
    id: 'conseils-pro',
    name: 'Conseils Pro',
    slug: 'conseils-professionnels',
    description: 'Les secrets et astuces de nos experts piscinistes',
    color: 'bg-purple-600',
    icon: FaLightbulb
  },
  {
    id: 'climat-tropical',
    name: 'Climat Tropical',
    slug: 'piscine-climat-tropical',
    description: 'Spécificités des piscines en Guadeloupe et aux Antilles',
    color: 'bg-orange-500',
    icon: GiPalmTree
  },
  {
    id: 'innovations',
    name: 'Innovations',
    slug: 'innovations-technologie',
    description: 'Dernières technologies et tendances du monde de la piscine',
    color: 'bg-indigo-600',
    icon: FaRocket
  },
  {
    id: 'temoignages',
    name: 'Témoignages',
    slug: 'temoignages-clients',
    description: 'Retours d\'expérience et projets réalisés par Koté Piscine',
    color: 'bg-pink-600',
    icon: FaHeart
  }
]; 