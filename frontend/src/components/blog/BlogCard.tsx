import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import { BlogPost } from '../../config/blog.posts';
import { blogCategories } from '../../config/blog.categories';
import { IconType } from 'react-icons';

// Animation variants pour les cartes
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
  onTagClick?: (tag: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0, featured = false, size = 'medium', onTagClick }) => {
  const category = blogCategories.find(cat => cat.id === post.categoryId);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Définir les classes selon la taille
  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return {
          container: 'md:col-span-2',
          image: 'aspect-[16/10]',
          title: 'text-xl md:text-2xl',
          excerpt: 'line-clamp-4',
          padding: 'px-6 py-4 md:px-7 md:py-5'
        };
      case 'small':
        return {
          container: '',
          image: 'aspect-[4/3]',
          title: 'text-base',
          excerpt: 'line-clamp-2',
          padding: 'p-4'
        };
      default: // medium
        return {
          container: '',
          image: 'aspect-[4/3]',
          title: 'text-lg md:text-xl',
          excerpt: 'line-clamp-3',
          padding: 'p-5'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  // Card pour article mis en avant
  if (featured && post.featured) {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="relative group card-glass-opaque overflow-hidden hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-lg hover:shadow-2xl"
      >
        <Link to={`/blog/article/${post.slug}`} className="block">
          <div className="relative">
            {/* Badge "À la une" */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-kote-yellow text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm">
                <FaStar className="text-xs" />
                À la une
              </div>
            </div>

            {/* Image avec overlay */}
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Contenu */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                {category && (
                  <span className={`${category.color} px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-opacity-90`}>
                    {category.icon && React.createElement(category.icon)} {category.name}
                  </span>
                )}
                <span className="text-xs text-white/80 flex items-center gap-1">
                  <FaClock /> {post.readingTime} min
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-kote-turquoise transition-colors text-shadow-sm">
                {post.title}
              </h3>
              <p className="text-sm text-white/90 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Card standard
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group card-glass-opaque overflow-hidden hover:border-white/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col text-white cursor-pointer h-full ${sizeClasses.container}`}
    >
      <Link to={`/blog/article/${post.slug}`} className="block h-full">
        <div className="h-full flex flex-col">
          {/* Image */}
          <div className={`${sizeClasses.image} bg-black/20 relative overflow-hidden`}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Catégorie en overlay */}
            {category && category.icon && (
              <div className="absolute top-3 left-3 flex items-center text-white z-10 bg-slate-900/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span className={`${isSmall ? 'h-5 w-5' : 'h-6 w-6'} mr-2`}>
                  {React.createElement(category.icon as IconType, {
                    className: `${isSmall ? 'h-5 w-5' : 'h-6 w-6'} transition-transform duration-300 group-hover:text-kote-turquoise transition-colors duration-200`
                  })}
                </span>
                <span className={`${isSmall ? 'text-xs' : 'text-sm'} font-semibold text-white group-hover:text-kote-turquoise transition-colors duration-200 ease-in-out`}>
                  {category.name}
                </span>
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className={`${sizeClasses.padding} flex flex-col flex-grow`}>
            {/* Métadonnées */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaCalendarAlt className="text-kote-turquoise text-xs" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-white/70">
                <FaClock className="text-kote-turquoise text-xs" />
                <span>{post.readingTime} min</span>
              </div>
            </div>

            {/* Titre et extrait */}
            <h3 className={`${sizeClasses.title} font-semibold text-white mb-1.5 group-hover:text-kote-turquoise transition-colors duration-200`}>
              {post.title}
            </h3>
            <p className={`text-white/90 text-sm line-clamp-3 mb-4 flex-grow`}>
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, isLarge ? 4 : isSmall ? 2 : 3).map(tag => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onTagClick?.(tag);
                    }}
                    className="inline-block px-3 py-1 text-xs bg-white/10 text-kote-turquoise font-medium rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
                {!isLarge && post.tags.length > (isSmall ? 2 : 3) && (
                  <span className="inline-block px-2 py-1 text-xs bg-white/5 text-white/60 rounded-full">
                    +{post.tags.length - (isSmall ? 2 : 3)}
                  </span>
                )}
              </div>
            )}

            {/* Lien "Lire la suite" */}
            <div className="pt-4 flex items-center gap-2 text-white font-medium group-hover:text-kote-turquoise transition-colors">
              <span>Lire l'article</span>
              <FaArrowRight className="transform group-hover:translate-x-2 transition-transform text-sm" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard; 