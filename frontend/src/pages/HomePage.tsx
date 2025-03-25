import Hero from '../components/home/Hero';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import FeaturedProducts from '../components/home/FeaturedProducts';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Testimonials />
      <FeaturedProducts />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
};

export default HomePage; 