const BASE_URL = '/KotePiscine';

// Définir l'interface pour le service d'URL
export interface UrlService {
  getPath: (path: string) => string;
  getExternalUrl: (url: string) => string;
  isInCatalogue: (path: string) => boolean;
  getCatalogueUrl: (category?: string, productSlug?: string) => string;
}

export const urlService: UrlService = {
  getPath: (path: string): string => {
    // Si le chemin commence par '/', on le retire pour éviter un double slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BASE_URL}/${cleanPath}`;
  },

  // Pour les liens externes (réseaux sociaux, etc.)
  getExternalUrl: (url: string): string => url,

  // Vérifie si un chemin est dans le catalogue
  isInCatalogue: (path: string): boolean => {
    return path.startsWith(`${BASE_URL}/catalogue`);
  },

  // Construit l'URL du catalogue
  getCatalogueUrl: (category?: string, productSlug?: string): string => {
    if (productSlug && category) {
      return `${BASE_URL}/catalogue/${category}/${productSlug}`;
    }
    if (category) {
      return `${BASE_URL}/catalogue/${category}`;
    }
    return `${BASE_URL}/catalogue`;
  }
};

export default urlService; 