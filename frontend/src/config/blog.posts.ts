// Import des images illustrations
import magasinIllustration from '../images/illustrations/magasin illustration.jpg';
import renovationLiner from '../images/illustrations/renovation-liner.webp';
import reparationPompe2 from '../images/illustrations/reparation-pompe2.webp';
import produitEntretien from '../images/illustrations/produit-entretien.webp';
import reparationRobot2 from '../images/illustrations/reparation-robot2.webp';
import constructionPiscine from '../images/illustrations/construction-piscine.webp';
import entretienPiscine from '../images/illustrations/entretien-piscine.webp';

// Types pour le contenu structuré
export type ContentBlockType = 'text' | 'product-card' | 'article-cta' | 'service-cta';

interface BaseContentBlock {
  type: ContentBlockType;
  id: string;
}

export interface TextBlock extends BaseContentBlock {
  type: 'text';
  content: string; // Markdown supporté
}

export interface ProductCardBlock extends BaseContentBlock {
  type: 'product-card';
  productId?: string;
  productName?: string; // Nouveau : chercher par nom
  autoDescription?: boolean; // Utiliser la description du produit automatiquement
  layout?: 'left' | 'right' | 'top' | 'simple';
}

export interface ArticleCTABlock extends BaseContentBlock {
  type: 'article-cta';
  articleId?: string;
  articleTitle?: string; // Nouveau : chercher par titre
  customTitle?: string; // Override du titre si besoin
  customText?: string; // Texte personnalisé
  autoExcerpt?: boolean; // Utiliser l'excerpt de l'article automatiquement
}

export interface ServiceCTABlock extends BaseContentBlock {
  type: 'service-cta';
  serviceId?: string;
  serviceName?: string; // Nouveau : chercher par nom
  customTitle?: string;
  customText?: string;
  autoDescription?: boolean; // Utiliser la description du service automatiquement
  layout?: 'simple' | 'card';
}

export type ContentBlock = TextBlock | ProductCardBlock | ArticleCTABlock | ServiceCTABlock;

// === HELPERS POUR SIMPLIFIER L'ÉCRITURE ===

// Helper pour créer un bloc de texte
export const text = (content: string, id?: string): TextBlock => ({
  type: 'text',
  id: id || `text-${Date.now()}`,
  content
});

// Helper pour créer un bloc produit
export const product = (
  productName: string, 
  id?: string,
  layout?: 'left' | 'right' | 'top' | 'simple'
): ProductCardBlock => ({
  type: 'product-card',
  id: id || `product-${Date.now()}`,
  productName,
  autoDescription: true,
  layout
} as ProductCardBlock);

// Helper pour créer un CTA article
export const article = (
  articleTitle: string, 
  customTitle?: string,
  id?: string
): ArticleCTABlock => ({
  type: 'article-cta',
  id: id || `article-${Date.now()}`,
  articleTitle,
  customTitle,
  autoExcerpt: true
} as ArticleCTABlock);

// Helper pour créer un CTA service
export const service = (
  serviceName: string,
  layout?: 'simple' | 'card',
  id?: string,
  customTitle?: string,
  customText?: string
): ServiceCTABlock => ({
  type: 'service-cta',
  id: id || `service-${Date.now()}`,
  serviceName,
  customTitle,
  customText,
  autoDescription: !customText, // Si pas de texte custom, utiliser la description auto
  layout
} as ServiceCTABlock);

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Contenu complet pour la future page de détail (legacy)
  contentBlocks?: ContentBlock[]; // Nouveau système de contenu structuré
  image: string;
  author: string;
  categoryId: string;
  tags: string[];
  readingTime: number; // En minutes
  createdAt: string;
  updatedAt?: string;
  featured?: boolean; // Article mis en avant
  relatedProducts?: string[]; // IDs des produits liés
  relatedArticles?: string[]; // IDs des articles liés
  relatedServices?: string[]; // IDs des services liés
}

export const blogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Les secrets d\'une piscine qui dure : Guide complet d\'entretien en Guadeloupe',
    slug: 'guide-entretien-piscine-guadeloupe',
    excerpt: 'Découvrez toutes les techniques pour maintenir votre piscine en parfait état sous le climat tropical guadeloupéen.',
    content: 'Contenu complet sur l\'entretien...',
    contentBlocks: [
      text(`# Les secrets d'une piscine qui dure en Guadeloupe

Maintenir une piscine en parfait état sous le climat tropical de la Guadeloupe demande une attention particulière. Entre le soleil intense, l'humidité élevée et les périodes cycloniques, votre piscine fait face à des défis uniques.

Dans ce guide complet, nous partageons notre expertise de **15 ans** pour vous aider à préserver la beauté et la longévité de votre oasis aquatique.`),
      
      text(`## 1. L'équilibre de l'eau : La base de tout

L'équilibre chimique de votre eau est **fondamental** pour :

- Prévenir la prolifération d'algues
- Protéger vos équipements
- Garantir une baignade saine et agréable

### Les paramètres essentiels à surveiller

- **pH** : Maintenez-le entre 7,2 et 7,4. En Guadeloupe, la chaleur tend à faire monter le pH, nécessitant des ajustements fréquents.
- **Chlore** : Entre 1 et 3 ppm pour une désinfection optimale. L'intensité du soleil tropical dégrade rapidement le chlore.
- **Alcalinité** : Entre 80 et 120 ppm pour stabiliser le pH.`),
      
      product('pH Moins liquide - 20L', 'product-ph-left', 'left'),
      
      text(`### Exemple d'affichage avec image à gauche

Cet affichage est parfait pour mettre en valeur le produit tout en gardant une bonne lisibilité du texte descriptif. Idéal pour les bidons et contenants de grande taille.`),
      
      product('Chlore choc granulés - 5kg', 'product-ph-right', 'right'),
      
      text(`### Exemple d'affichage avec image à droite

Cette disposition met l'accent sur le texte en premier, puis attire l'œil sur le produit. Particulièrement efficace pour les descriptions techniques.`),
      
      product('AlgaStop CTX Pro', 'product-ph-top', 'top'),
      
      text(`### Exemple d'affichage avec image en haut

Cet affichage pleine largeur met en valeur l'image du produit et convient parfaitement aux photos de haute qualité ou aux emballages avec beaucoup de détails.`),

      text(`### Exemple d'affichage ultra simplifié sans image

Pour une présentation compacte et minimaliste, idéale pour les listes de produits recommandés ou les références rapides :`),

      product('pH Moins liquide - 20L', 'product-simple-1', 'simple'),
      product('Chlore choc granulés - 5kg', 'product-simple-2', 'simple'),
      product('AlgaStop CTX Pro', 'product-simple-3', 'simple'),
      
      text(`## Exemples des différents styles de service

### Style simple (bouton)

Idéal pour une incitation discrète dans le flux d'un article :`),
      
      service('Construction de Piscine', 'simple'),
      service('Rénovation de Piscine', 'simple'),
      service('Entretien de Piscine', 'simple'),
      
      text(`### Style carte (avec image)

Parfait pour mettre en valeur un service en fin d'article ou dans une section dédiée :`),
      
      service('Réparation Équipements', 'card'),
      service('Automatismes Piscine', 'card'),
      
      text(`## 2. Le traitement anti-algues en climat tropical

Les algues adorent notre climat chaud et humide ! Une prévention active est indispensable.

### Nos recommandations spécifiques


**Traitement préventif hebdomadaire** avec un algicide de qualité

**Brossage régulier** des parois et du fond (2 fois par semaine minimum)

**Filtration continue** pendant les heures les plus chaudes`),
      
      text(`## 3. L'entretien des équipements

Vos équipements sont mis à rude épreuve sous notre climat. Un entretien préventif vous évitera des pannes coûteuses.

### Planning d'entretien recommandé

**Pompe de filtration** :
- Vérification mensuelle du préfiltre
- Nettoyage du panier toutes les 2 semaines
- Contrôle annuel par un professionnel`),
    
      
      text(`## 4. Préparer sa piscine pour la saison cyclonique

La saison des ouragans demande une préparation spécifique pour protéger votre installation.

### Check-list avant un cyclone

- Baisser le niveau d'eau de 30-40 cm
- Retirer tous les accessoires amovibles
- Ajouter un traitement choc préventif
- Protéger la pompe et le système électrique
- Ne jamais vider complètement la piscine`),
      
      article(
        'Entretien piscine en saison cyclonique : Nos conseils',
        'Guide complet : Protéger sa piscine pendant la saison cyclonique'
      ),
      
      text(`## Conclusion

Un entretien régulier et adapté au climat tropical est la clé d'une piscine qui traverse les années en beauté. N'hésitez pas à nous contacter pour des conseils personnalisés ou pour découvrir nos contrats d'entretien sur mesure.

**Votre piscine mérite le meilleur, et nous sommes là pour vous accompagner !**`),

    ],
    author: 'Équipe Koté Piscine',
    image: entretienPiscine,
    categoryId: 'entretien',
    tags: ['entretien', 'climat tropical', 'conseils'],
    readingTime: 8,
    createdAt: '2024-01-15',
    featured: true,
    relatedProducts: ['1', '7', '9'],
    relatedArticles: ['9', '5'],
    relatedServices: ['entretien', 'reparation']
  },
  {
    _id: '2',
    title: 'Construction de piscine en béton : Les étapes clés',
    slug: 'construction-piscine-beton-etapes',
    excerpt: 'De la conception à la mise en eau, découvrez toutes les étapes de construction d\'une piscine en béton.',
    contentBlocks: [
      text(`# Construction de piscine en béton : Les étapes clés

Vous rêvez d'une piscine sur mesure, parfaitement adaptée à votre terrain et à vos envies ? La construction d'une piscine en béton est la solution idéale. Découvrez toutes les étapes de ce projet passionnant.`),
      
      text(`## Pourquoi choisir le béton ?

Le béton offre une **liberté totale** de formes et de dimensions. Robuste et durable, il s'adapte parfaitement au climat tropical de la Guadeloupe et résiste aux mouvements de terrain.`),
      
      text(`## 1. L'étude du projet

Tout commence par une visite de votre terrain. Nous analysons :
- La nature du sol
- L'accessibilité du chantier
- L'exposition et l'environnement
- Vos besoins et envies

Cette étape cruciale permet de définir l'implantation idéale et de prévoir les contraintes techniques.`),
      
      text(`## 2. Le terrassement

Une fois les plans validés, place aux travaux ! Le terrassement consiste à :
- Tracer l'emplacement exact
- Creuser selon les dimensions prévues
- Évacuer la terre
- Préparer le fond de fouille`),
      
      text(`## 3. Le ferraillage

C'est l'ossature de votre piscine. Un treillis métallique est installé pour :
- Renforcer la structure
- Assurer la solidité dans le temps
- Résister aux pressions de l'eau et du terrain`),
      
      text(`## 4. Le coulage du béton

Étape spectaculaire ! Le béton est projeté ou coulé pour former :
- Le radier (fond de la piscine)
- Les parois verticales
- Les escaliers et plages immergées

En Guadeloupe, nous utilisons des bétons spéciaux résistants au sel et à l'humidité.`),
      
      text(`## 5. L'étanchéité

Après séchage, votre piscine reçoit son revêtement étanche :
- Enduit hydrofuge
- Membrane armée
- Ou carrelage selon votre choix`),
      
      text(`## 6. Les équipements techniques

Installation de tous les éléments essentiels :`),
      
      product('Pompe de filtration 15m³/h'),
      
      product('Filtre à sable 14m³/h'),
      
      text(`## 7. Les finitions

Les dernières touches qui font toute la différence :
- Pose des margelles
- Installation de l'éclairage
- Mise en place des équipements de sécurité`),
      
      text(`## 8. La mise en eau

Le moment tant attendu ! Remplissage progressif avec :
- Contrôle de l'étanchéité
- Équilibrage de l'eau
- Mise en route de la filtration`),
      
      text(`## Combien de temps pour construire sa piscine ?

En moyenne, comptez **6 à 8 semaines** pour une piscine béton standard. Ce délai peut varier selon :
- La complexité du projet
- Les conditions météo
- L'accessibilité du terrain`),
      
      text(`## Votre projet de construction`),
      
      service('Construction de Piscine', 'simple'),
      
      text(`## Pour aller plus loin`),
      
      article(
        'Les erreurs à éviter lors de la construction de sa piscine',
        'Évitez les pièges courants'
      )
    ],
    author: 'Jean-Marc Piscines',
    image: constructionPiscine,
    categoryId: 'construction',
    tags: ['construction', 'béton', 'étapes'],
    readingTime: 12,
    createdAt: '2024-01-10',
    featured: false
  },
  {
    _id: '3',
    title: 'Rénover son liner : Quand et comment procéder ?',
    slug: 'renovation-liner-piscine-quand-comment',
    excerpt: 'Signes d\'usure, techniques de pose et conseils pour réussir le changement de votre liner de piscine.',
    contentBlocks: [
      text(`# Rénover son liner : Quand et comment procéder ?

Le liner est l'élément qui assure l'étanchéité de votre piscine. Avec le temps et sous l'effet du climat tropical guadeloupéen, il peut s'user. Découvrez quand et comment le remplacer.`),
      
      text(`## Les signes qui ne trompent pas

### 1. Décoloration importante
Un liner qui perd ses couleurs de manière uniforme est normal après plusieurs années. Mais des taches ou une décoloration irrégulière indiquent un problème.

### 2. Plis et décollements
Des plis qui apparaissent ou le liner qui se décolle des parois sont des signes d'usure avancée.

### 3. Fuites récurrentes
Si vous devez constamment rajouter de l'eau, votre liner est probablement percé ou fissuré.

### 4. Texture rugueuse
Un liner qui devient rugueux au toucher a atteint sa fin de vie.`),
      
      text(`## Durée de vie d'un liner en Guadeloupe

Dans notre climat tropical, un liner dure en moyenne :
- **8 à 12 ans** pour un liner classique
- **12 à 15 ans** pour un liner armé
- **5 à 8 ans** si l'entretien est négligé

Le soleil intense et les variations de température accélèrent le vieillissement.`),
      
      text(`## Le bon moment pour rénover

### Période idéale
En Guadeloupe, privilégiez la saison sèche (janvier à juin) pour :
- Des conditions météo stables
- Un séchage optimal
- Moins de risques de pluie

### À éviter
- La saison cyclonique
- Les périodes de fortes pluies
- Les mois les plus chauds (température de pose idéale : 15-25°C)`),
      
      text(`## Les étapes de la rénovation

### 1. Vidange complète
Évacuation de toute l'eau de la piscine en respectant la réglementation locale.

### 2. Retrait de l'ancien liner
Découpe et évacuation minutieuse de l'ancien revêtement.

### 3. Inspection et réparations
- Vérification de la structure
- Réparation des fissures éventuelles
- Traitement anti-humidité

### 4. Pose du feutre
Installation d'un feutre de protection pour :
- Protéger le nouveau liner
- Améliorer le confort
- Prolonger la durée de vie`),
      
      text(`## Installation du nouveau liner`),
      
      text(`### Préparation
- Nettoyage minutieux du bassin
- Vérification des cotes
- Préparation du matériel

### Mise en place
- Positionnement précis du liner
- Accrochage sur le rail (liner classique)
- Ou soudure (liner armé)

### Mise en eau progressive
- Remplissage lent et contrôlé
- Ajustement des plis
- Aspiration de l'air`),
      
      text(`## Nos solutions de rénovation`),
      
      service('Rénovation de Piscine', 'card'),
      
      text(`## Entretenir son nouveau liner

Pour maximiser sa durée de vie :
- Maintenir un pH entre 7,2 et 7,4
- Éviter les produits agressifs
- Nettoyer régulièrement la ligne d'eau`),
      
      product('Nettoyant ligne d\'eau'),
      
      text(`## Pour aller plus loin`),
      
      article(
        'Rénovation complète : Transformer une ancienne piscine',
        'Découvrez nos projets de rénovation'
      )
    ],
    author: 'Marie Delagrave',
    image: renovationLiner,
    categoryId: 'renovation',
    tags: ['rénovation', 'liner', 'étanchéité'],
    readingTime: 6,
    createdAt: '2024-01-08',
    featured: true
  },
  {
    _id: '4',
    title: 'Choisir sa pompe de piscine : Guide d\'achat 2024',
    slug: 'choisir-pompe-piscine-guide-achat',
    excerpt: 'Débit, puissance, efficacité énergétique : tous nos conseils pour bien choisir votre pompe de filtration.',
    contentBlocks: [
      text(`# Choisir sa pompe de piscine : Guide d'achat 2024

La pompe est le cœur de votre système de filtration. Bien la choisir est essentiel pour une eau cristalline et des économies d'énergie. Voici notre guide complet.`),
      
      text(`## Comprendre le rôle de la pompe

La pompe fait circuler l'eau à travers le filtre pour éliminer les impuretés. Elle doit être dimensionnée selon :
- Le volume de votre piscine
- La distance avec le local technique
- Les équipements additionnels (chauffage, jets...)`),
      
      text(`## Calculer le débit nécessaire

### La règle de base
Votre pompe doit filtrer tout le volume d'eau en **4 heures maximum**.

### Exemple concret
- Piscine de 60 m³
- Débit nécessaire : 60 ÷ 4 = 15 m³/h
- Choisir une pompe de 15-16 m³/h`),
      
      text(`## Les types de pompes

### Pompes classiques
- Les plus courantes
- Bon rapport qualité/prix
- Idéales pour la plupart des piscines`),
      
      product('Pompe de filtration 15m³/h'),
      
      text(`### Pompes à vitesse variable
- **30 à 80% d'économies** d'énergie
- Fonctionnement silencieux
- Adaptation automatique aux besoins
- Investissement rentabilisé en 2-3 ans`),
      
      product('Pompe à vitesse variable'),
      
      text(`## Critères de choix essentiels

### 1. Compatibilité avec le filtre
Le débit de la pompe ne doit pas dépasser la capacité du filtre.

### 2. Niveau sonore
Important si le local technique est proche de la maison.

### 3. Consommation électrique
Une pompe tourne 8-12h/jour : privilégiez l'efficacité énergétique.

### 4. Résistance au climat tropical
En Guadeloupe, choisissez des pompes avec :
- Protection anti-corrosion
- Ventilation renforcée
- Composants résistants à l'humidité`),
      
      text(`## Installation et entretien

### Bonnes pratiques
- Installation au niveau de l'eau ou en-dessous
- Prévoir des vannes d'isolement
- Protéger des intempéries

### Entretien régulier
- Nettoyer le préfiltre toutes les 2 semaines
- Vérifier les joints annuellement
- Surveiller les bruits anormaux`),
      
      text(`## Besoin de conseils personnalisés ?`),
      
      service('Réparation Robots et Pompes', 'simple'),
      
      text(`## Articles complémentaires`),
      
      article(
        'Robot piscine en panne ? Diagnostic et réparation',
        'Guide de dépannage complet'
      )
    ],
    author: 'Équipe Koté Piscine',
    image: reparationPompe2,
    categoryId: 'equipements',
    tags: ['pompe', 'filtration', 'guide d\'achat'],
    readingTime: 10,
    createdAt: '2024-01-05',
    featured: false
  },
  {
    _id: '5',
    title: 'Produits d\'entretien piscine : Lesquels choisir en Guadeloupe ?',
    slug: 'produits-entretien-piscine-guadeloupe',
    excerpt: 'Chlore, brome, oxygène actif... Quel traitement adopter pour une eau cristalline sous les tropiques ?',
    contentBlocks: [
      text(`# Produits d'entretien piscine : Lesquels choisir en Guadeloupe ?

Le climat tropical de la Guadeloupe pose des défis uniques pour l'entretien de votre piscine. Découvrez les produits les plus adaptés à notre environnement.`),
      
      text(`## Les spécificités du climat guadeloupéen

### Facteurs à considérer
- **Température élevée** : accélère les réactions chimiques
- **UV intenses** : dégradent rapidement le chlore
- **Humidité** : favorise le développement d'algues
- **Pluies fréquentes** : diluent les produits

Ces conditions nécessitent des produits spécifiques et des dosages adaptés.`),
      
      text(`## Le chlore : l'incontournable

### Chlore stabilisé
Idéal en Guadeloupe car protégé contre les UV :`),
      
      product('Chlore Choc granulés - 5kg'),
      
      product('Galets de chlore 250g - 5kg'),
      
      text(`### Conseils d'utilisation
- Maintenir entre 1 et 3 ppm
- Traitement choc hebdomadaire en saison chaude
- Vérifier le stabilisant (max 75 ppm)`),
      
      text(`## Le brome : l'alternative douce

### Avantages en climat tropical
- Résiste mieux à la chaleur que le chlore
- Pas d'odeur désagréable
- Moins irritant pour la peau
- Efficace même avec un pH élevé`),
      
      product('Pastilles de brome 20g'),
      
      text(`## L'oxygène actif : le naturel

### Pour qui ?
- Peaux sensibles
- Petites piscines
- Spas et jacuzzis

### Limites
- Plus cher que le chlore
- Efficacité réduite au-dessus de 28°C
- Nécessite des ajouts fréquents`),
      
      text(`## Les indispensables complémentaires

### Régulateur de pH
Essentiel car notre eau est souvent calcaire :`),
      
      product('pH Moins liquide - 20L'),
      
      product('pH Plus poudre - 5kg'),
      
      text(`### Anti-algues
Prévention obligatoire en climat tropical :`),
      
      product('AlgaStop CTX Pro'),
      
      text(`### Clarifiant
Pour une eau cristalline malgré les pluies :`),
      
      product('Clarifiant liquide 1L'),
      
      text(`## Programme d'entretien adapté

### Routine hebdomadaire
1. Test de l'eau (pH, chlore, alcalinité)
2. Ajustement du pH si nécessaire
3. Chloration selon les besoins
4. Ajout d'anti-algues préventif

### Mensuel
- Nettoyage du filtre
- Traitement choc
- Analyse complète de l'eau`),
      
      text(`## Simplifiez-vous la vie`),
      
      service('Entretien de Piscine', 'simple'),
      
      article(
        'Les secrets d\'une piscine qui dure : Guide complet d\'entretien en Guadeloupe',
        'Notre guide complet'
      )
    ],
    author: 'Sophie Martin',
    image: produitEntretien,
    categoryId: 'conseils-pro',
    tags: ['produits', 'traitement eau', 'tropiques'],
    readingTime: 7,
    createdAt: '2024-01-03',
    featured: false
  },
  {
    _id: '6',
    title: 'Robot piscine en panne ? Diagnostic et réparation',
    slug: 'robot-piscine-panne-diagnostic-reparation',
    excerpt: 'Votre robot ne fonctionne plus ? Suivez notre guide de dépannage avant de faire appel à un professionnel.',
    contentBlocks: [
      text(`# Robot piscine en panne ? Diagnostic et réparation

Votre robot de piscine montre des signes de faiblesse ? Avant d'appeler un réparateur, suivez notre guide de diagnostic pour identifier et peut-être résoudre le problème vous-même.`),
      
      text(`## Les pannes les plus fréquentes

### 1. Le robot ne démarre pas
**Causes possibles :**
- Problème d'alimentation électrique
- Programmateur défaillant
- Fusible grillé
- Câble endommagé

**Solutions :**
- Vérifier la prise et le disjoncteur
- Tester sur une autre prise
- Contrôler l'état du câble
- Vérifier les fusibles du boîtier`),
      
      text(`### 2. Le robot n'aspire plus correctement
**Causes possibles :**
- Filtre encrassé
- Turbine bloquée
- Joint défectueux
- Sac plein

**Solutions :**
- Nettoyer ou remplacer le filtre
- Vérifier la turbine
- Contrôler les joints
- Vider et nettoyer le sac`),
      
      text(`### 3. Déplacements anarchiques
**Causes possibles :**
- Programmation perturbée
- Capteurs sales
- Problème de flottabilité
- Roues ou chenilles usées

**Solutions :**
- Réinitialiser le programme
- Nettoyer les capteurs
- Ajuster les flotteurs
- Vérifier l'usure des roues`),
      
      text(`## Entretien préventif

### Après chaque utilisation
- Rincer à l'eau claire
- Nettoyer le filtre
- Vider le sac ou panier

### Hebdomadaire
- Vérifier l'état du câble
- Contrôler les brosses
- Nettoyer les capteurs

### Mensuel
- Inspection complète
- Graissage des axes (si nécessaire)
- Test de tous les programmes`),
      
      text(`## Les pièces d'usure à surveiller

### Brosses
Durée de vie : 1-2 ans selon utilisation
- Vérifier l'usure régulièrement
- Remplacer si les lamelles sont trop courtes`),
      
      product('Brosse de rechange robot'),
      
      text(`### Filtres
À nettoyer après chaque cycle
- Remplacer si déchirés ou trop encrassés
- Avoir un jeu de rechange`),
      
      product('Cassette filtrante robot'),
      
      text(`## Quand faire appel à un professionnel ?

### Signes d'alerte
- Bruits anormaux du moteur
- Fumée ou odeur de brûlé
- Problèmes électriques récurrents
- Panne après diagnostic

### Notre service réparation`),
      
      service('Réparation Robots et Pompes', 'simple'),
      
      text(`## Conseils pour prolonger la durée de vie

1. **Éviter les chocs thermiques** : ne pas utiliser en plein soleil
2. **Stockage correct** : au sec, à l'abri du soleil
3. **Utilisation adaptée** : respecter les cycles recommandés
4. **Eau équilibrée** : un pH correct préserve les composants`),
      
      text(`## Pour aller plus loin`),
      
      article(
        'Choisir sa pompe de piscine : Guide d\'achat 2024',
        'Guide d\'achat pompes'
      )
    ],
    author: 'Équipe Koté Piscine',
    image: reparationRobot2,
    categoryId: 'equipements',
    tags: ['robot', 'dépannage', 'réparation'],
    readingTime: 5,
    createdAt: '2024-01-01',
    featured: false
  },
  {
    _id: '7',
    title: 'Piscines auto-nettoyantes : Innovation et confort',
    slug: 'piscines-auto-nettoyantes-innovation',
    excerpt: 'Découvrez les avantages des systèmes auto-nettoyants pour une piscine toujours propre sans effort.',
    contentBlocks: [
      text(`# Piscines auto-nettoyantes : Innovation et confort

Imaginez une piscine qui se nettoie toute seule, sans robot, sans effort de votre part. C'est la promesse des piscines auto-nettoyantes, une révolution dans le monde de la piscine.`),
      
      text(`## Comment ça fonctionne ?

### Le principe révolutionnaire
Le système auto-nettoyant utilise des **buses de nettoyage intégrées** dans le fond et les parois de la piscine. Ces buses projettent des jets d'eau puissants qui :
- Décollent les saletés
- Les dirigent vers la bonde de fond
- Évitent l'accumulation de débris

### Le cycle automatique
- Les buses fonctionnent en séquence
- Chaque zone est nettoyée méthodiquement
- Le cycle complet dure 2-3 heures
- Programmation personnalisable`),
      
      text(`## Les avantages incomparables

### Gain de temps considérable
**Fini le nettoyage manuel !**
- Plus besoin de passer l'aspirateur
- Pas de robot à sortir et ranger
- Économie de 2-3 heures par semaine

### Économies d'eau et de produits
- Réduction de 30% de la consommation d'eau
- Moins de produits chimiques nécessaires
- Filtration optimisée`),
      
      text(`## Pourquoi c'est parfait en Guadeloupe ?

### Adaptation au climat tropical
- **Feuilles et débris** : évacuation continue
- **Algues** : prévention par circulation constante
- **Sable et poussière** : nettoyage quotidien automatique
- **Fortes pluies** : évacuation rapide des polluants

### Confort absolu
Profitez de votre piscine sans contrainte, même pendant la saison des pluies !`),
      
      text(`## L'installation

### Intégration dès la construction
Le système doit être prévu dès la conception :
- Réseau de canalisations spécifiques
- Pompe dédiée haute pression
- Module de contrôle programmable

### Compatibilité
- Toutes formes de piscines
- Béton, coque ou autre
- Possibilité de retrofit sur certains modèles`),
      
      text(`## Témoignage client

> "Depuis que nous avons opté pour le système auto-nettoyant, c'est un vrai bonheur ! Plus de corvée de nettoyage, l'eau est toujours cristalline. Un investissement que nous ne regrettons pas !" 
> *- Famille Martin, Gosier*`),
      
      text(`## Le coût : un investissement rentable

### Surcoût à la construction
Entre 15 et 25% du prix de la piscine selon :
- La taille du bassin
- La complexité des formes
- Les options choisies

### Retour sur investissement
- Économies d'eau et produits
- Pas d'achat de robot (2000-3000€)
- Augmentation de la valeur du bien
- **Rentabilisé en 5-7 ans**`),
      
      text(`## Votre projet auto-nettoyant`),
      
      service('Construction de Piscine', 'simple'),
      
      text(`## Maintenance simplifiée

Même auto-nettoyante, votre piscine nécessite un entretien minimal :`),
      
      article(
        'Les secrets d\'une piscine qui dure : Guide complet d\'entretien en Guadeloupe',
        'Guide d\'entretien complet'
      )
    ],
    author: 'Équipe Koté Piscine',
    image: constructionPiscine,
    categoryId: 'innovations',
    tags: ['auto-nettoyant', 'innovation', 'confort'],
    readingTime: 9,
    createdAt: '2023-12-28',
    featured: true
  },
  {
    _id: '8',
    title: 'Témoignage : Notre nouvelle piscine transforme notre quotidien',
    slug: 'témoignage-nouvelle-piscine-quotidien',
    excerpt: 'La famille Durand nous raconte comment leur projet piscine avec Koté Piscine a changé leur vie.',
    contentBlocks: [
      text(`# Témoignage : Notre nouvelle piscine transforme notre quotidien

*Rencontre avec la famille Durand, clients satisfaits de Koté Piscine depuis 2023. Ils nous racontent leur expérience, de la première visite à aujourd'hui.*`),
      
      text(`## Le début du rêve

### Marie Durand raconte :
"Nous avions toujours rêvé d'une piscine. Avec trois enfants et le climat de la Guadeloupe, c'était une évidence. Mais nous ne savions pas par où commencer..."

### La rencontre avec Koté Piscine
"Un ami nous a recommandé Koté Piscine. Dès la première visite au magasin de Sainte-Anne, nous avons été conquis par l'accueil et le professionnalisme de l'équipe."`),
      
      text(`## Le projet prend forme

### Les conseils qui ont fait la différence
"L'équipe nous a vraiment écoutés. Ils ont compris que nous voulions :
- Une piscine familiale sécurisée
- Un entretien minimal
- Un design qui s'intègre au jardin

Leurs suggestions étaient parfaites !"`),
      
      text(`## La construction : un suivi impeccable

### Pierre Durand témoigne :
"J'étais inquiet pour les travaux, notre terrain est en pente. Mais tout s'est déroulé comme prévu :
- Respect des délais (6 semaines)
- Chantier propre et organisé
- Communication régulière
- Aucune mauvaise surprise"`),
      
      text(`## Le choix du système auto-nettoyant

"Sur les conseils de Koté Piscine, nous avons opté pour le système auto-nettoyant. Un peu plus cher au départ, mais quel confort !"`),
      
      service('Construction de Piscine', 'simple'),
      
      text(`## La vie avec notre piscine

### Un an après : le bilan
"C'est un vrai changement de vie ! 
- Les enfants nagent tous les jours
- Nous recevons plus souvent
- Les week-ends sont devenus des mini-vacances
- La maison a pris de la valeur"`),
      
      text(`## L'entretien : plus simple que prévu

### Marie ajoute :
"J'avais peur de l'entretien, mais avec le contrat de Koté Piscine, c'est un jeu d'enfant. Ils passent régulièrement, l'eau est toujours parfaite."`),
      
      service('Entretien de Piscine', 'simple'),
      
      text(`## Les produits qui facilitent la vie

"Le magasin est bien fourni, on trouve tout ce qu'il faut. Les conseils sont toujours pertinents."`),
      
      product('Kit d\'entretien complet'),
      
      product('Galets de chlore 250g - 5kg'),
      
      text(`## Leur conseil aux futurs propriétaires

### Les points clés selon les Durand :
1. **Bien réfléchir au projet** : taille, emplacement, options
2. **Écouter les professionnels** : leur expérience est précieuse
3. **Prévoir le budget global** : construction + équipements + entretien
4. **Ne pas hésiter sur la qualité** : c'est un investissement long terme
5. **Penser auto-nettoyant** : le confort n'a pas de prix !`),
      
      text(`## Le mot de la fin

"Si c'était à refaire, on le referait sans hésiter ! Koté Piscine nous a accompagnés du début à la fin, et continue de le faire. Notre piscine, c'est vraiment le cœur de notre maison maintenant."

*- Famille Durand, clients satisfaits*`),
      
      text(`## Envie de réaliser votre rêve ?`),
      
      article(
        'Construction de piscine en béton : Les étapes clés',
        'Découvrez les étapes de construction'
      ),
      
      text(`**Contactez-nous pour discuter de votre projet !**`)
    ],
    author: 'Famille Durand',
    image: magasinIllustration,
    categoryId: 'temoignages',
    tags: ['témoignage', 'famille', 'satisfaction'],
    readingTime: 4,
    createdAt: '2023-12-25',
    featured: false
  },
  {
    _id: '9',
    title: 'Entretien piscine en saison cyclonique : Nos conseils',
    slug: 'entretien-piscine-saison-cyclonique',
    excerpt: 'Comment protéger et entretenir sa piscine pendant la saison des ouragans en Guadeloupe.',
    contentBlocks: [
      text(`# Entretien piscine en saison cyclonique : Nos conseils

La saison cyclonique en Guadeloupe (juin à novembre) représente un défi particulier pour les propriétaires de piscine. Voici notre guide complet pour protéger votre investissement.`),
      
      text(`## Avant l'arrivée d'un cyclone

### 48h avant - Préparation intensive

#### 1. Ajuster le niveau d'eau
**Baisser de 30 à 40 cm** le niveau d'eau pour :
- Éviter les débordements
- Réduire la pression sur les margelles
- Faciliter l'évacuation des pluies

⚠️ **Ne jamais vider complètement** : risque de soulèvement de la piscine !`),
      
      text(`#### 2. Sécuriser les équipements
- **Retirer** : échelles, plongeoirs, jeux flottants
- **Ranger** : robots, accessoires de nettoyage
- **Protéger** : pompes et armoires électriques
- **Démonter** : abris télescopiques si possible`),
      
      text(`#### 3. Traitement chimique préventif

Un **traitement choc** est indispensable :`),
      
      product('Chlore Choc granulés - 5kg'),
      
      text(`Dosage spécial cyclone : **doubler la dose habituelle**

Ajouter également un algicide longue durée :`),
      
      product('AlgaStop CTX Pro'),
      
      text(`### 24h avant - Derniers préparatifs

#### Protéger le système de filtration
1. **Arrêter la filtration**
2. **Fermer toutes les vannes**
3. **Débrancher électriquement**
4. **Protéger le local technique**

#### Sécuriser les abords
- Élaguer les branches dangereuses
- Ranger le mobilier de jardin
- Vérifier les écoulements`),
      
      text(`## Pendant le cyclone

### Règles de sécurité absolues
- **Ne jamais s'approcher de la piscine**
- **Rester à l'intérieur**
- **Ne pas tenter d'intervention**
- **Attendre la fin de l'alerte**`),
      
      text(`## Après le passage du cyclone

### Évaluation des dégâts
Avant toute intervention :
1. Vérifier l'absence de danger électrique
2. Examiner la structure de la piscine
3. Contrôler l'état des équipements
4. Photographier les dégâts éventuels`),
      
      text(`### Nettoyage d'urgence

#### 1. Retirer les gros débris
- Branches, feuilles, objets divers
- Utiliser une épuisette renforcée
- Porter des gants de protection`),
      
      text(`#### 2. Vidanger si nécessaire
Si l'eau est trop polluée :
- Vidanger partiellement (max 1/3)
- Remplacer par de l'eau propre
- Ne jamais vider entièrement`),
      
      text(`### Remise en route du système

#### Étapes essentielles :
1. **Nettoyer le préfiltre** de la pompe
2. **Vérifier le filtre** (backwash si nécessaire)
3. **Redémarrer la filtration** progressivement
4. **Contrôler les fuites** éventuelles`),
      
      text(`### Rééquilibrage de l'eau

Après un cyclone, l'eau est déséquilibrée :`),
      
      text(`#### Analyse complète nécessaire
- pH (souvent très bas après les pluies)
- Chlore (dilué par les précipitations)
- Alcalinité (tampon du pH)
- Stabilisant (vérifier le niveau)`),
      
      product('pH Plus poudre - 5kg'),
      
      text(`#### Traitement intensif
- Ajuster d'abord le pH
- Traitement choc au chlore
- Anti-algues préventif
- Clarification si nécessaire`),
      
      product('Clarifiant liquide 1L'),
      
      text(`## Programme de récupération sur 7 jours

### Jour 1-2 : Nettoyage et remise en route
### Jour 3-4 : Traitements chimiques intensifs
### Jour 5-6 : Ajustements fins
### Jour 7 : Retour à la normale`),
      
      text(`## Nos services post-cyclone`),
      
      service('Entretien de Piscine', 'simple'),
      
      text(`## Prévention : le contrat annuel

Un contrat d'entretien inclut :
- Préparation pré-cyclonique
- Intervention prioritaire post-cyclone
- Produits de traitement d'urgence
- Tranquillité d'esprit garantie`),
      
      text(`## Check-list récapitulative

### Avant le cyclone ✓
- [ ] Baisser le niveau d'eau
- [ ] Retirer tous les accessoires
- [ ] Traitement choc préventif
- [ ] Sécuriser les équipements
- [ ] Couper l'électricité

### Après le cyclone ✓
- [ ] Vérifier la sécurité
- [ ] Retirer les débris
- [ ] Analyser l'eau
- [ ] Rééquilibrer la chimie
- [ ] Filtration 24/24h pendant 48h`),
      
      text(`## Pour une protection optimale`),
      
      article(
        'Les secrets d\'une piscine qui dure : Guide complet d\'entretien en Guadeloupe',
        'Notre guide d\'entretien complet'
      )
    ],
    author: 'Équipe Koté Piscine',
    image: entretienPiscine,
    categoryId: 'climat-tropical',
    tags: ['cyclone', 'protection', 'entretien'],
    readingTime: 6,
    createdAt: '2023-12-20',
    featured: false
  },
  {
    _id: '10',
    title: 'Rénovation complète : Transformer une ancienne piscine',
    slug: 'renovation-complete-ancienne-piscine',
    excerpt: 'Projet de rénovation complète : revêtement, équipements et aménagements pour une piscine comme neuve.',
    contentBlocks: [
      text(`# Rénovation complète : Transformer une ancienne piscine

Votre piscine a perdu de son charme ? Une rénovation complète peut lui donner une seconde vie. Découvrez comment transformer votre bassin vieillissant en un espace de baignade moderne et fonctionnel.`),
      
      text(`## Quand envisager une rénovation complète ?

### Les signes qui ne trompent pas

- **Fuites récurrentes** malgré les réparations
- **Équipements obsolètes** ou énergivores
- **Structure fragilisée** (fissures, affaissements)
- **Esthétique datée** ou démodée
- **Coûts d'entretien** en augmentation constante`),
      
      text(`## Les étapes d'une rénovation réussie

### 1. Diagnostic complet

Notre équipe réalise un audit détaillé :
- État de la structure
- Performance des équipements
- Qualité de l'étanchéité
- Conformité aux normes actuelles
- Potentiel d'amélioration`),
      
      text(`### 2. Définition du projet

En fonction du diagnostic, nous établissons un plan de rénovation qui peut inclure :
- Reprise de l'étanchéité
- Modernisation de la filtration
- Mise aux normes électriques
- Amélioration du design
- Ajout de fonctionnalités`),
      
      text(`## Les points clés de la rénovation

### Étanchéité et revêtement
Plusieurs solutions selon votre budget :`),
      
      text(`**Le liner**

- Solution économique
- Pose rapide
- Large choix de couleurs
- Durée de vie 8-12 ans`),
      
      text(`#### La membrane armée
- Plus résistante que le liner
- Soudure sur mesure
- Durée de vie 15-20 ans
- Idéale en climat tropical`),
      
      text(`#### Le carrelage
- Aspect haut de gamme
- Durabilité maximale
- Personnalisation totale
- Valorisation du bien`),
      
      text(`### Filtration moderne`),
      
      product('Pompe à vitesse variable'),
      
      product('Filtre à sable 14m³/h'),
      
      text(`### Équipements de confort
Profitez de la rénovation pour ajouter :
- Éclairage LED
- Nage à contre-courant
- Chauffage solaire
- Électrolyseur au sel`),
      
      text(`## Cas concret : La rénovation de la famille Martin

### Situation initiale
- Piscine de 1995
- Nombreuses fuites
- Pompe énergivore
- Aspect vieillot

### Solutions apportées
1. Reprise complète de l'étanchéité
2. Installation d'une filtration moderne
3. Nouveaux skimmers et refoulements
4. Éclairage LED dernière génération

### Résultat
- **60% d'économies** sur la consommation électrique
- Eau cristalline garantie
- Design contemporain
- Plus-value immobilière significative`),
      
      text(`## Financement et retour sur investissement

### Budget à prévoir
Une rénovation complète représente environ 40-60% du coût d'une piscine neuve.

### Économies réalisées
- Réduction de la consommation électrique
- Baisse des frais d'entretien
- Diminution des réparations
- **Rentabilité sur 5-7 ans**`),
      
      service('Rénovation de Piscine', 'simple'),
      
      text(`## Conseils pour votre projet

### 1. Ne pas négliger le diagnostic
Un audit complet évite les mauvaises surprises.

### 2. Penser global
Rénover par étapes peut coûter plus cher à long terme.

### 3. Privilégier la qualité
Les matériaux et équipements premium sont rentables.

### 4. Anticiper l'avenir
Prévoyez des évolutions futures (domotique, automatisation).`),
      
      text(`## Articles complémentaires`),
      
      article(
        'Rénover son liner : Quand et comment procéder ?',
        'Guide complet sur la rénovation du liner'
      ),
      
      article(
        'Les erreurs à éviter lors de la construction de sa piscine',
        'Évitez les erreurs courantes'
      ),
      
      text(`## Prêt à transformer votre piscine ?
Contactez-nous pour un diagnostic gratuit et personnalisé de votre projet de rénovation.`)
    ],
    author: 'Équipe Koté Piscine',
    image: renovationLiner,
    categoryId: 'renovation',
    tags: ['rénovation complète', 'modernisation', 'projet'],
    readingTime: 11,
    createdAt: '2023-12-18',
    featured: false
  },
  {
    _id: '11',
    title: 'Les erreurs à éviter lors de la construction de sa piscine',
    slug: 'erreurs-eviter-construction-piscine',
    excerpt: 'Évitez les pièges les plus courants grâce à notre expérience de 15 ans dans la construction de piscines.',
    contentBlocks: [
      text(`# Les erreurs à éviter lors de la construction de sa piscine

En 15 ans d'expérience dans la construction de piscines en Guadeloupe, nous avons vu de nombreux projets compromis par des erreurs évitables. Voici les pièges à éviter absolument.`),
      
      text(`## 1. Négliger l'étude du terrain

### L'erreur
Se précipiter sans analyse approfondie du sol et de l'environnement.

### Les conséquences
- Fissures structurelles
- Affaissements
- Surcoûts importants
- Retards de chantier

### La bonne approche
✓ Étude géotechnique
✓ Analyse de la pente
✓ Vérification des réseaux
✓ Prise en compte de la végétation`),
      
      text(`## 2. Sous-dimensionner la filtration

### L'erreur
Choisir une pompe ou un filtre trop petit pour économiser.

### Les conséquences
- Eau trouble persistante
- Surconsommation électrique
- Usure prématurée
- Entretien difficile`),
      
      product('Pompe à vitesse variable'),
      
      text(`## 3. Mal positionner la piscine

### L'erreur
Ne pas tenir compte de :
- L'ensoleillement
- Les vents dominants
- La vue depuis la maison
- L'intimité

### La bonne approche
✓ Étudier la course du soleil
✓ Observer les zones d'ombre
✓ Prévoir les aménagements futurs
✓ Penser à la surveillance des enfants`),
      
      text(`## 4. Économiser sur l'étanchéité

### L'erreur
Choisir des matériaux bas de gamme ou une pose approximative.

### Les conséquences
- Fuites récurrentes
- Réparations coûteuses
- Durée de vie réduite
- Aspect inesthétique`),
      
      service('Construction de Piscine', 'simple'),
      
      text(`## 5. Oublier les normes de sécurité

### L'erreur
Négliger les dispositifs de sécurité obligatoires.

### Les conséquences
- Risques d'accidents
- Non-conformité légale
- Responsabilité engagée
- Assurance compromise

### Les équipements requis
- Alarme ou barrière
- Couverture de sécurité
- Volet roulant
- Abri de piscine`),
      
      text(`## 6. Mal évaluer le budget global

### L'erreur
Ne considérer que le coût de construction.

### À ne pas oublier
- Terrassement
- Raccordements
- Équipements
- Aménagements
- Entretien futur
- Consommables`),
      
      text(`## 7. Négliger le local technique

### L'erreur
Local trop petit ou mal ventilé.

### Les conséquences
- Maintenance difficile
- Surchauffe des équipements
- Durée de vie réduite
- Interventions compliquées`),
      
      text(`## 8. Sous-estimer l'importance du drainage

### L'erreur
Système d'évacuation des eaux insuffisant.

### Les conséquences
- Infiltrations
- Déstabilisation du terrain
- Dégâts aux abords
- Problèmes structurels`),
      
      text(`## 9. Choisir le mauvais revêtement

### L'erreur
Ne pas adapter le revêtement au climat tropical.

### La solution
Privilégier :
- Membrane armée haute résistance
- Carrelage spécial piscine
- Liner traité anti-UV`),
      
      text(`## 10. Ignorer la maintenance future

### L'erreur
Ne pas penser à l'entretien dès la conception.

### Points à considérer
- Accès au local technique
- Facilité de nettoyage
- Stockage des produits
- Robot de nettoyage adapté`),
      
      product('Kit d\'entretien complet'),
      
      text(`## Comment éviter ces erreurs ?

### 1. S'entourer de professionnels
- Bureau d'études compétent
- Constructeur expérimenté
- Artisans qualifiés

### 2. Planifier minutieusement
- Prendre son temps
- Comparer les devis
- Vérifier les références
- Étudier les garanties`),
      
      text(`## Articles complémentaires`),
      
      article(
        'Construction de piscine en béton : Les étapes clés',
        'Les étapes d\'une construction réussie'
      ),
      
      article(
        'Piscines auto-nettoyantes : Innovation et confort',
        'Découvrez les piscines nouvelle génération'
      ),
      
      text(`## Besoin de conseils ?
Nos experts sont là pour vous guider dans votre projet et éviter ces erreurs courantes. Contactez-nous pour un rendez-vous personnalisé.`)
    ],
    author: 'Jean-Marc Piscines',
    image: constructionPiscine,
    categoryId: 'conseils-pro',
    tags: ['erreurs', 'construction', 'conseils pro'],
    readingTime: 8,
    createdAt: '2023-12-15',
    featured: false
  },
  {
    _id: '12',
    title: 'Visitez notre showroom : Découvrez nos réalisations',
    slug: 'visitez-showroom-realisations-kote-piscine',
    excerpt: 'Venez découvrir notre magasin et showroom à Sainte-Anne pour voir nos équipements et discuter de votre projet.',
    contentBlocks: [
      text(`# Visitez notre showroom : L'expérience Koté Piscine

Rien ne vaut une visite en personne pour découvrir nos produits et services. Notre showroom de Sainte-Anne vous accueille dans un espace moderne et convivial, où vous pourrez visualiser concrètement votre futur projet.`),
      
      text(`## Un espace d'exposition unique

### Ce qui vous attend
- **400m² d'exposition**
- Maquettes de piscines
- Équipements en fonctionnement
- Échantillons de matériaux
- Conseils personnalisés

### Nos zones thématiques
1. Espace Construction
2. Corner Rénovation
3. Pôle Équipements
4. Zone Entretien
5. Coin Détente et Discussion`),
      
      text(`## Nos produits en situation réelle

### Équipements de filtration`),
      
      product('Pompe à vitesse variable'),
      
      product('Filtre à sable 14m³/h'),
      
      text(`### Produits d'entretien`),
      
      product('Kit d\'entretien complet'),
      
      text(`### Robots et automatismes`),
      
      product('Robot de piscine'),
      
      text(`## Nos experts à votre écoute

### Une équipe dédiée
- **Conseillers techniques** pour les aspects pratiques
- **Experts construction** pour vos projets
- **Spécialistes SAV** pour l'entretien
- **Commerciaux** pour les devis

### Services disponibles
- Conseils personnalisés
- Devis gratuits
- Diagnostics techniques
- Échantillons à emporter`),
      
      text(`## Horaires d'ouverture

### En semaine
- Lundi au vendredi : 8h00 - 17h00
- Samedi : 8h00 - 12h00

### Périodes spéciales
- Ouvertures exceptionnelles certains jours fériés
- Horaires étendus en haute saison
- Rendez-vous possible hors horaires`),
      
      text(`## Comment nous trouver

### Adresse
1 Route du Helleux
97180 Sainte-Anne
Guadeloupe

### Points de repère
- À 5 minutes du centre-ville
- Parking gratuit
- Accès facile depuis la N4
- Panneau "Koté Piscine" visible depuis la route`),
      
      text(`## Préparez votre visite

### Documents utiles à apporter
- Photos de votre terrain/piscine
- Plans si disponibles
- Mesures approximatives
- Liste de questions

### Pour un rendez-vous efficace
- Précisez vos attentes
- Notez vos contraintes
- Définissez votre budget
- Listez vos priorités`),
      
      text(`## Nos services en magasin`),
      
      service('Construction de Piscine', 'simple'),
      
      service('Entretien de Piscine', 'simple'),
      
      text(`## Promotions et offres spéciales

### Avantages showroom
- **-10%** sur votre première commande
- Échantillons gratuits
- Diagnostic offert
- Devis détaillé immédiat

### Programme fidélité
- Points cumulés à chaque achat
- Remises exclusives
- Invitations événements
- SAV prioritaire`),
      
      text(`## Articles associés`),
      
      article(
        'Les secrets d\'une piscine qui dure : Guide complet d\'entretien en Guadeloupe',
        'Notre guide d\'entretien'
      ),
      
      article(
        'Produits d\'entretien piscine : Lesquels choisir en Guadeloupe ?',
        'Guide des produits'
      ),
      
      text(`## Prenez rendez-vous

Pour un conseil personnalisé ou une présentation détaillée, n'hésitez pas à prendre rendez-vous. Notre équipe vous accueillera dans les meilleures conditions.

**Appelez-nous au 05 90 68 16 62 ou utilisez notre formulaire de contact.**`)
    ],
    author: 'Équipe Koté Piscine',
    image: magasinIllustration,
    categoryId: 'temoignages',
    tags: ['showroom', 'visite', 'équipements'],
    readingTime: 3,
    createdAt: '2023-12-12',
    featured: false
  },
  {
    _id: '13',
    title: 'Guide express : Préparer sa piscine pour l\'été',
    slug: 'guide-express-preparer-piscine-ete',
    excerpt: 'Les étapes essentielles pour une remise en route réussie de votre piscine après l\'hivernage.',
    contentBlocks: [
      text(`# Préparer sa piscine pour l'été en 5 étapes

L'été approche et il est temps de réveiller votre piscine ! Voici notre guide express pour une remise en route efficace.`),
      
      text(`## 1. Nettoyer et vérifier

Commencez par retirer la bâche d'hivernage et nettoyer soigneusement le bassin. Vérifiez l'état du liner et des équipements.`),
      
      text(`## 2. Remettre en route la filtration

Remettez en service votre système de filtration et vérifiez que tout fonctionne correctement.`),
      
      product('Pompe de filtration 15m³/h'),
      
      text(`## 3. Analyser et équilibrer l'eau

L'analyse de l'eau est cruciale. Ajustez le pH et les autres paramètres pour garantir une eau saine.`),
      
      product('pH Moins liquide - 20L'),
      
      text(`## 4. Traitement choc

Un traitement choc éliminera les bactéries et algues qui ont pu se développer pendant l'hiver.`),
      
      product('Chlore Choc granulés - 5kg'),
      
      text(`## 5. Prévention des algues

Pour maintenir une eau cristalline tout l'été, un traitement préventif anti-algues est indispensable.`),
      
      product('AlgaStop CTX Pro'),
      
      text(`## Nos services pour un été serein

### Service standard

Pour un entretien régulier de votre piscine :`),
      
      service('Entretien de Piscine', 'simple'),
      
      text(`### Service premium

Pour une rénovation complète avant l'été :`),
      
      service('Rénovation de Piscine', 'card'),
      
      text(`## Pour aller plus loin`),
      
      article(
        'Les secrets d\'une piscine qui dure : Guide complet d\'entretien en Guadeloupe',
        'Découvrez notre guide complet d\'entretien'
      )
    ],
    author: 'Équipe Koté Piscine',
    image: entretienPiscine,
    categoryId: 'conseils-pro',
    tags: ['remise en route', 'été', 'entretien', 'guide express'],
    readingTime: 5,
    createdAt: '2024-03-15',
    featured: true
  }
]; 