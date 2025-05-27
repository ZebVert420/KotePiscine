import React from 'react';
import { Service } from '../config/services';

export interface ServiceSubMenuItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

/**
 * Génère dynamiquement les items du sous-menu "Nos Services" à partir de la source de vérité Service[]
 */
export function getServiceSubMenuItems(services: Service[]): ServiceSubMenuItem[] {
  return services.map(service => ({
    name: service.title.replace(' de Piscine', ''), // Pour garder le label court comme dans la navbar
    to: `/services/${service.slug}`,
    icon: service.icon ? React.createElement(service.icon) : null
  }));
} 