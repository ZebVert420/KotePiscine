import Hero from '../components/home/Hero';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BlogArticlesSection from '../components/common/BlogArticlesSection';
import RealisationsSection from '../components/common/RealisationsSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Testimonials />
      <FeaturedProducts />
      <BlogArticlesSection numberOfArticles={3} />
      <RealisationsSection numberOfRealisations={3} />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
};

export default HomePage; 