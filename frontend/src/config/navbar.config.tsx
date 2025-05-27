import React from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { 
  MdOutlineMiscellaneousServices, 
} from 'react-icons/md';
import { 
  GiPoolDive,
} from 'react-icons/gi';
import { TbCards } from "react-icons/tb";
import { categories, Category } from './categories';
import { services } from './services';
import { getServiceSubMenuItems } from '../utils/servicesMenu';
import contact from './contact';

// Interface pour les éléments du sous-menu
export interface SubMenuItem {
  name: string;
  to: string;
  icon?: React.ReactNode;
}

// Interface pour les éléments du menu principal qui peuvent avoir des sous-menus
export interface MenuItem {
  name: string;
  to: string;
  icon?: React.ReactNode;
  submenu?: SubMenuItem[];
}

// Configuration des liens sociaux utilisant les vraies informations de contact
export const socialLinks = {
  instagram: contact.social.instagram,
  facebook: contact.social.facebook,
  phone: `tel:${contact.phone.tel}`,
  maps: contact.social.maps
};

// Configuration des éléments de menu
export const getMenuItems = (): MenuItem[] => {
  const serviceSubMenu = getServiceSubMenuItems(services);

  return [
    { name: 'Accueil', to: '/' },
    { 
      name: 'Nos Services', 
      to: '/services',
      icon: <MdOutlineMiscellaneousServices />,
      submenu: serviceSubMenu
    },
    { 
      name: 'Notre Gamme', 
      to: '/catalogue',
      icon: <TbCards />,
      submenu: categories.map((cat: Category) => ({
        name: cat.name,
        to: `/catalogue/${cat.slug}`,
        icon: cat.icon ? React.createElement(cat.icon) : null
      }))
    },
    { 
      name: 'Nos Travaux', 
      to: '/realisations',
      icon: <GiPoolDive />
    },
    { 
      name: 'Nos Conseils', 
      to: '/blog',
      icon: <TbCards />
    },
    { 
      name: 'Notre Magasin', 
      to: '/contact',
      icon: <FaMapLocationDot />
    }
  ];
}; 