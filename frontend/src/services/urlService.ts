const BASE_URL = '/KotePiscine';

export const urlService = {
  getPath: (path: string): string => {
    // Si le chemin commence par '/', on le retire pour éviter un double slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BASE_URL}/${cleanPath}`;
  },

  // Pour les liens externes (réseaux sociaux, etc.)
  getExternalUrl: (url: string): string => url,
};

export default urlService; 