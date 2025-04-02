import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CtaButton from '../components/common/CtaButton';

// Données de test à remplacer par API
const mockPostData = {
  _id: '1',
  title: 'Comment choisir la pompe à chaleur idéale pour votre piscine',
  slug: 'comment-choisir-pompe-chaleur-ideale-piscine',
  content: `
# Comment choisir la pompe à chaleur idéale pour votre piscine

Investir dans une pompe à chaleur est l'une des meilleures décisions que vous puissiez prendre pour profiter pleinement de votre piscine. Cet équipement vous permettra de prolonger votre saison de baignade et d'atteindre une température de l'eau parfaite, tout en maîtrisant votre consommation énergétique.

## Comprendre le fonctionnement d'une pompe à chaleur

Une pompe à chaleur fonctionne en captant les calories présentes dans l'air ambiant pour les transférer à l'eau de votre piscine. Ce processus est particulièrement efficace et écologique, puisqu'il utilise majoritairement une énergie renouvelable : l'air !

Le coefficient de performance (COP) est un indicateur essentiel lors du choix de votre équipement. Plus le COP est élevé, plus la pompe est efficace. Un bon COP se situe généralement au-dessus de 5, ce qui signifie que pour 1 kWh d'électricité consommée, la pompe restitue 5 kWh de chaleur à votre piscine.

## Les critères essentiels à considérer

### La puissance adaptée à votre bassin

La puissance nécessaire dépend principalement de la taille de votre piscine. Pour une estimation rapide, comptez environ 1,2 kW pour 10 m³ d'eau à chauffer. D'autres facteurs entrent également en jeu :

- L'exposition de votre piscine au vent
- La présence d'une couverture isolante
- Votre région et son climat
- La température souhaitée pour l'eau

### La technologie Full Inverter

Les pompes à chaleur Full Inverter représentent ce qui se fait de mieux actuellement sur le marché. Contrairement aux modèles ON/OFF qui fonctionnent à pleine puissance puis s'arrêtent, la technologie Inverter adapte sa puissance en fonction des besoins.

Avantages de l'Inverter :
- Économies d'énergie significatives (jusqu'à 30%)
- Niveau sonore réduit
- Durée de vie prolongée des composants
- Montée en température plus rapide

### Le niveau sonore

Cet aspect est souvent négligé mais peut devenir problématique, surtout si votre pompe est installée près d'une terrasse ou des chambres. Privilégiez les modèles proposant un mode "silence" ou indiquant clairement leur niveau sonore en décibels.

## Installation et entretien

L'emplacement de votre pompe à chaleur joue un rôle crucial dans son efficacité. Quelques règles d'or :

- Prévoir un espace suffisant autour de l'appareil (minimum 50 cm)
- Éviter de l'installer sous un arbre ou près d'une zone poussiéreuse
- Respecter une distance minimale du bassin selon les recommandations du fabricant
- Prévoir une évacuation pour les condensats

L'entretien est relativement simple mais essentiel. Un nettoyage régulier de l'évaporateur et une vérification annuelle par un professionnel garantiront la longévité de votre équipement.

## Les meilleures marques du marché

Plusieurs fabricants se démarquent par la qualité et la fiabilité de leurs produits :

- Pentair : réputée pour ses innovations technologiques et la robustesse de ses équipements
- Hayward : offre un excellent rapport qualité-prix et une gamme complète
- Zodiac : propose des modèles particulièrement silencieux et économes

N'hésitez pas à venir en magasin pour bénéficier des conseils personnalisés de nos experts, qui vous aideront à choisir la pompe à chaleur parfaitement adaptée à votre configuration.
  `,
  author: 'Marc Durand',
  image: '/images/illustrations/reparation-pompe2.webp',
  tags: ['Équipement', 'Chauffage', 'Économie d\'énergie'],
  createdAt: '2023-04-15T08:30:00Z',
  relatedProducts: [
    {
      _id: '1',
      name: 'Pompe à chaleur Pentair UltraTemp',
      image: '/images/illustrations/reparation-pompe2.webp',
      price: 2499,
      category: 'Chauffage'
    },
    {
      _id: '2',
      name: 'Pompe à chaleur Hayward EnergyLine Pro',
      image: '/images/illustrations/entretien-piscine.webp',
      price: 1899,
      category: 'Chauffage'
    },
    {
      _id: '3',
      name: 'Couverture isothermique Premium',
      image: '/images/illustrations/renovation-liner.webp',
      price: 129,
      category: 'Accessoires'
    }
  ]
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulation chargement article
  useEffect(() => {
    // Remplacer par un vrai appel API
    setLoading(true);
    setTimeout(() => {
      setPost(mockPostData);
      setLoading(false);
    }, 500);
  }, [slug]);

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Rendu riche du contenu avec style Markdown
  const renderContent = (content: string) => {
    const sections = content.split(/\n## |\n# /);
    
    return (
      <div className="prose prose-lg max-w-none">
        {sections.map((section, index) => {
          if (index === 0) return <p key={index} className="text-lg leading-relaxed">{section.trim()}</p>;
          
          const [title, ...contentParts] = section.split('\n');
          const sectionContent = contentParts.join('\n');
          
          // Traitement des sous-sections (###)
          const subSections = sectionContent.split('\n### ');
          
          return (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-kote-blue-dark mb-4">{title}</h2>
              
              {subSections.map((subSection, subIdx) => {
                if (subIdx === 0) {
                  // Premier élément (texte avant sous-section ou section entière sans sous-section)
                  return (
                    <div key={`${index}-${subIdx}`} className="mb-4">
                      {subSection.split('\n').map((paragraph, pIdx) => {
                        if (paragraph.trim().startsWith('- ')) {
                          return (
                            <div key={`p-${pIdx}`} className="flex items-start mb-2">
                              <span className="text-kote-turquoise mr-2">•</span>
                              <span>{paragraph.replace('- ', '')}</span>
                            </div>
                          );
                        }
                        return paragraph.trim() ? <p key={`p-${pIdx}`} className="mb-4">{paragraph}</p> : null;
                      })}
                    </div>
                  );
                } else {
                  // Sous-sections
                  const [subTitle, ...subContentParts] = subSection.split('\n');
                  const subSectionContent = subContentParts.join('\n');
                  
                  return (
                    <div key={`${index}-${subIdx}`} className="mb-6">
                      <h3 className="text-xl font-bold text-kote-blue-dark mb-3">{subTitle}</h3>
                      {subSectionContent.split('\n').map((paragraph, pIdx) => {
                        if (paragraph.trim().startsWith('- ')) {
                          return (
                            <div key={`subp-${pIdx}`} className="flex items-start mb-2">
                              <span className="text-kote-turquoise mr-2">•</span>
                              <span>{paragraph.replace('- ', '')}</span>
                            </div>
                          );
                        }
                        return paragraph.trim() ? <p key={`subp-${pIdx}`} className="mb-3">{paragraph}</p> : null;
                      })}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Formatage du prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container-kote py-32">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-kote-turquoise"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-kote py-32">
        <div className="text-center">
          <h2 className="text-2xl text-kote-blue-dark font-bold mb-4">Article non trouvé</h2>
          <p className="mb-8">Désolé, nous n'avons pas pu trouver l'article que vous recherchez.</p>
          <CtaButton 
            to="/blog"
            text="Retourner au blog"
            color="blue"
            size="default"
            icon="arrow"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="container-kote">
        {/* Fil d'Ariane */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-kote-blue-dark hover:text-kote-turquoise">
                  Accueil
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/blog" className="text-kote-blue-dark hover:text-kote-turquoise">
                    Conseils d'Experts
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 truncate max-w-[250px]">{post.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image principale */}
          <div className="h-96 overflow-hidden relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">{post.title}</h1>
                <div className="flex flex-wrap items-center text-sm">
                  <span className="mr-4">{formatDate(post.createdAt)}</span>
                  <span className="mr-4">Par {post.author}</span>
                  <div className="flex flex-wrap mt-2 md:mt-0">
                    {post.tags.map((tag: string, index: number) => (
                      <span 
                        key={index} 
                        className="bg-kote-turquoise bg-opacity-20 text-white px-2 py-1 rounded-full text-xs mr-2 mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className="p-8 md:p-12">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Produits associés */}
        <section className="mt-16">
          <h2 className="section-title">Produits associés à cet article</h2>
          <p className="text-center text-gray-600 mb-8">
            Découvrez notre sélection de produits en lien avec cet article
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {post.relatedProducts.map((product: any) => (
              <Link 
                to={`/catalogue/${product._id}`} 
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-kote-turquoise mb-1">{product.category}</p>
                  <h3 className="text-xl font-bold text-kote-blue-dark mb-2">{product.name}</h3>
                  {product.price && (
                    <p className="text-lg font-bold text-kote-blue-dark">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <CtaButton
              to="/catalogue"
              text="Découvrir tous nos produits"
              color="blue"
              size="large"
              icon="arrow"
            />
          </div>
        </section>

        {/* CTA Conseil */}
        <div className="mt-16 bg-gradient-to-r from-kote-blue-dark to-kote-blue-light rounded-xl shadow-lg text-white p-8 md:p-10">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-3">Besoin de conseils personnalisés ?</h3>
              <p className="mb-6 md:mb-0">
                Nos experts sont à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet piscine.
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <CtaButton 
                to="/contact"
                text="Contactez-nous"
                color="turquoise"
                size="default"
                icon="arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage; 