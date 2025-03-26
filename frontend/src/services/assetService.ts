const BASE_URL = '/KotePiscine';

export const assetService = {
  getAssetPath: (path: string): string => {
    // Si le chemin commence par '/', on le retire pour éviter un double slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BASE_URL}/${cleanPath}`;
  },

  getImagePath: (imageName: string): string => {
    // Si le chemin commence par '/', on le retire pour éviter un double slash
    const cleanPath = imageName.startsWith('/') ? imageName.slice(1) : imageName;
    return `${BASE_URL}/images/${cleanPath}`;
  },

  getBackgroundPath: (imageName: string): string => {
    // Si le chemin commence par '/', on le retire pour éviter un double slash
    const cleanPath = imageName.startsWith('/') ? imageName.slice(1) : imageName;
    return `${BASE_URL}/images/background/${cleanPath}`;
  },

  getAvatarPath: (avatarName: string): string => {
    // Si le chemin commence par '/', on le retire pour éviter un double slash
    const cleanPath = avatarName.startsWith('/') ? avatarName.slice(1) : avatarName;
    return `${BASE_URL}/images/avatars/${cleanPath}`;
  }
};

export default assetService; 