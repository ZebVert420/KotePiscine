import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import { blogPosts } from '../../config/blog.posts';
import { blogCategories } from '../../config/blog.categories';

interface ArticleCTABlockProps {
  articleId?: string;
  articleTitle?: string;
  customTitle?: string;
  customText?: string;
  autoExcerpt?: boolean;
}

const ArticleCTABlock: React.FC<ArticleCTABlockProps> = ({ 
  articleId,
  articleTitle,
  customTitle, 
  customText,
  autoExcerpt = true
}) => {
  // Chercher l'article par ID ou par titre
  const article = articleId
    ? blogPosts.find(p => p._id === articleId)
    : blogPosts.find(p => p.title.toLowerCase() === articleTitle?.toLowerCase());
  
  if (!article) {
    // Afficher un message d'erreur en développement
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="my-8 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300">
          <p className="font-bold">Article non trouvé</p>
          <p className="text-sm">
            {articleId ? `ID: ${articleId}` : `Titre: ${articleTitle}`}
          </p>
        </div>
      );
    }
    return null;
  }

  const category = blogCategories.find(c => c.id === article.categoryId);

  return (
    <div className="my-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-kote-turquoise/20 to-kote-blue-light/20 rounded-2xl"></div>
      <Link to={`/blog/article/${article.slug}`} className="relative block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-kote-turquoise/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
        <div className="flex items-start gap-6">
          {/* Image */}
          <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden hidden md:block">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Contenu */}
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-3">
              <p className="text-kote-turquoise font-semibold text-sm">
                À lire aussi
              </p>
              {category && (
                <span className="text-xs text-white/70 flex items-center gap-1">
                  {category.icon && <span className="text-xs">{React.createElement(category.icon)}</span>}
                  {category.name}
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-kote-turquoise transition-colors">
              {customTitle || article.title}
            </h3>
            
            <p className="text-white/80 text-sm mb-3 line-clamp-2">
              {customText || (autoExcerpt ? article.excerpt : customText) || article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <FaClock />
                  {article.readingTime} min de lecture
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-kote-turquoise font-medium group-hover:gap-3 transition-all">
                <span>Lire l'article</span>
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCTABlock; 