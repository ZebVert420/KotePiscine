import React, { useState, useEffect } from 'react';
import { blogPosts } from '../../config/blog.posts';
import BlogCard from '../blog/BlogCard';
import { Link } from 'react-router-dom';
import AnimatedElement from './AnimatedElement';
import { FaArrowRight } from 'react-icons/fa';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface BlogArticlesSectionProps {
  articleSlugs?: string[];
  numberOfArticles?: number;
}

const BlogArticlesSection: React.FC<BlogArticlesSectionProps> = ({ articleSlugs, numberOfArticles }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  let articlesToDisplay = blogPosts;

  if (articleSlugs) {
    articlesToDisplay = blogPosts.filter(post => articleSlugs.includes(post.slug));
  } else if (numberOfArticles) {
    articlesToDisplay = blogPosts.slice(0, numberOfArticles);
  }

  // Ensure we have an array of articles to map over, even if empty
  if (!articlesToDisplay) {
    articlesToDisplay = [];
  }

  // Mettre à jour l'état mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialisation
    handleResize();
    
    // Debounce le redimensionnement pour de meilleures performances
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative py-16 section-dark-overlay w-full">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="container-kote relative z-10">
        <AnimatedElement delay={0.1}>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Nos derniers conseils et réalisations
          </h2>
        </AnimatedElement>
        
        {isMobile ? (
          // Vue mobile avec Swiper
          <div className="relative mb-8">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full"
            >
              {articlesToDisplay.map(article => (
                <SwiperSlide key={article._id}>
                  <Link to={`/blog/${article.slug}`} className="h-full">
                    <BlogCard post={article} size="medium" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // Vue desktop avec grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesToDisplay.map(article => (
              <Link to={`/blog/${article.slug}`} key={article._id} className="h-full">
                <BlogCard post={article} size="medium" />
              </Link>
            ))}
          </div>
        )}

        {/* CTA Voir tout */}
        <AnimatedElement delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="group relative inline-flex items-center gap-3 bg-kote-turquoise text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Voir tous nos conseils</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <FaArrowRight className="transform" />
              </div>
            </Link>
          </div>
        </AnimatedElement>

      </div>
    </section>
  );
};

export default BlogArticlesSection; 