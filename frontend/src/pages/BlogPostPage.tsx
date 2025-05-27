import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContentRenderer from '../components/blog/ContentRenderer';
import ProductCardBlock from '../components/blog/ProductCardBlock';
import CallToAction from '../components/home/CallToAction';
import { blogPosts } from '../config/blog.posts';
import { blogCategories } from '../config/blog.categories';
import { services } from '../config/services';
import React from 'react';
import { FaArrowRight, FaClock, FaCalendar, FaUser, FaTag, FaHome, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import logoBlancRond from '../images/logo/Blanc Rond.png';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Chargement de l'article
  useEffect(() => {
    setLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    }, 300);
  }, [slug]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kote-turquoise mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas.</p>
          <Link to="/blog" className="text-kote-turquoise hover:text-kote-turquoise/80 underline">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => 
    p._id !== post._id && (
      p.categoryId === post.categoryId || 
      p.tags.some(tag => post.tags.includes(tag))
    )
  ).slice(0, 3);

  // Générer l'URL absolue pour les métadonnées
  const currentUrl = `https://www.kotepiscine-guadeloupe.com/blog/article/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `https://www.kotepiscine-guadeloupe.com${post.image}`;

  // Schéma JSON-LD pour SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": imageUrl,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Koté Piscine",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.kotepiscine-guadeloupe.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  return (
    <>
      {/* Métadonnées SEO */}
      <Helmet>
        <title>{post.title} - Conseils Koté Piscine</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:author" content={post.author} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Schéma JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <article>
        {/* Hero avec section-dark-overlay */}
        <section 
          className="section-dark-overlay min-h-[600px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay sombre avec gradient */}
          <div className="absolute inset-0 z-0 bg-black/70"></div>
          
          {/* Breadcrumb en haut à gauche */}
          <nav aria-label="Breadcrumb" className="absolute top-8 left-8 z-20">
            <ol className="flex items-center gap-2 text-sm text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <FaHome />
                  <span>Accueil</span>
                </Link>
              </li>
              <li><FaChevronRight className="text-xs text-white/60" /></li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                  </Link>
              </li>
              <li><FaChevronRight className="text-xs text-white/60" /></li>
              <li className="text-white font-medium">{post.title}</li>
            </ol>
          </nav>
          
          {/* Contenu du hero */}
          <div className="relative z-10 container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo Koté Piscine au-dessus du titre */}
              <div className="flex justify-center mb-6">
                <img src={logoBlancRond} alt="Koté Piscine" className="h-40 w-auto" />
              </div>
              
              {/* Titre avec animation */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                {post.title}
              </h1>
              
              {/* Métadonnées */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/90 mb-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-kote-turquoise" />
                  <span>{post.author}</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-kote-turquoise" />
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-kote-turquoise" />
                  <span>{post.readingTime} min de lecture</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <FaTag className="text-kote-turquoise text-[10px]" />
                        {tag}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Indicateur de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="section-dark-overlay">
          <div className="absolute inset-0 z-0 bg-black/70"></div>
          <div className="container-kote relative z-10">
            {/* Bouton retour */}
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/50 hover:border-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md"
            >
              <FaArrowLeft className="text-kote-turquoise" />
              <span>Retour</span>
            </button>
            
            {/* Contenu de l'article */}
            <div className="rounded-2xl px-6 md:px-8">
              {post.contentBlocks ? (
                <ContentRenderer blocks={post.contentBlocks} />
              ) : (
                <div className="prose prose-lg max-w-none prose-invert">
                  <p className="text-white/90 leading-relaxed whitespace-pre-line">
                    {post.content || post.excerpt}
                  </p>
                </div>
              )}
            </div>

            {/* Section des produits liés */}
            {post.relatedProducts && post.relatedProducts.length > 0 && (
              <aside className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Produits mentionnés</h2>
                <div className="space-y-6">
                  {post.relatedProducts.map((productId, index) => {
                    const layout = ['left', 'right', 'top'][index % 3] as 'left' | 'right' | 'top';
                    return (
                      <ProductCardBlock 
                        key={productId}
                        productId={productId}
                        layout={layout}
                      />
                    );
                  })}
                </div>
              </aside>
            )}

            {/* Section des services liés */}
            {post.relatedServices && post.relatedServices.length > 0 && (
              <aside className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Services associés</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {post.relatedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    if (!service) return null;
                    
                    return (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-4 bg-kote-turquoise/5 border border-kote-turquoise/20 rounded-xl p-4 hover:bg-kote-turquoise/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-kote-turquoise/20 flex items-center justify-center">
                          <span className="text-kote-turquoise text-xl">
                            {React.createElement(service.icon)}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-white group-hover:text-kote-turquoise transition-colors">
                            {service.title}
                          </h3>
                        </div>
                        <FaArrowRight className="text-kote-turquoise flex-shrink-0 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* Articles similaires */}
        <section className="section-dark-overlay">
          <div className="absolute inset-0 z-0 bg-black/70"></div>
          <div className="container-kote relative z-10">
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Articles similaires
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => {
                    const relatedCategory = blogCategories.find(c => c.id === relatedPost.categoryId);
                    return (
                      <Link
                        key={relatedPost._id}
                        to={`/blog/article/${relatedPost.slug}`}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
                        <div className="p-6">
                          {relatedCategory && (
                            <p className="text-kote-turquoise text-sm font-medium mb-2 flex items-center gap-1">
                              {relatedCategory.icon && <span className="text-xs">{React.createElement(relatedCategory.icon)}</span>}
                              {relatedCategory.name}
                            </p>
                          )}
                          <h3 className="font-bold text-white mb-2 group-hover:text-kote-turquoise transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-white/80 text-sm line-clamp-3">{relatedPost.excerpt}</p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-white/70">
                            <span className="flex items-center gap-1">
                              <FaClock />
                              {relatedPost.readingTime} min
                            </span>
                            <span>{new Date(relatedPost.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              )}
            </div>
        </section>
      </article>
      {/* CTA Contact */}
      <CallToAction />
    </>
  );
};

export default BlogPostPage; 