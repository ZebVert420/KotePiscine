import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import ServicesPage from '../pages/ServicesPage';
import CataloguePage from '../pages/CataloguePage';
import RealisationsPage from '../pages/RealisationsPage';
import BlogPage from '../pages/BlogPage';
import PageTransition from '../components/common/PageTransition';

// Chargement paresseux des composants pour résoudre les erreurs de linter
const BlogPostPage = lazy(() => import('../pages/BlogPostPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="container-kote py-32 flex justify-center items-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-kote-turquoise"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MainLayout><PageTransition><HomePage /></PageTransition></MainLayout>} />
          <Route path="/services" element={<MainLayout><PageTransition><ServicesPage /></PageTransition></MainLayout>} />
          <Route path="/catalogue" element={<MainLayout><PageTransition><CataloguePage /></PageTransition></MainLayout>} />
          <Route path="/catalogue/:productSlug" element={<MainLayout><PageTransition><CataloguePage /></PageTransition></MainLayout>} />
          <Route path="/realisations" element={<MainLayout><PageTransition><RealisationsPage /></PageTransition></MainLayout>} />
          <Route path="/blog" element={<MainLayout><PageTransition><BlogPage /></PageTransition></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><PageTransition><BlogPostPage /></PageTransition></MainLayout>} />
          <Route path="/contact" element={<MainLayout><PageTransition><ContactPage /></PageTransition></MainLayout>} />
          <Route path="*" element={<MainLayout><PageTransition><NotFoundPage /></PageTransition></MainLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter; 