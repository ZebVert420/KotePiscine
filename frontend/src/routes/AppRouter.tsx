import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ServicesLayout from '../components/layout/ServicesLayout';
import HomePage from '../pages/HomePage';
import ServicesPage from '../pages/ServicesPage';
import CataloguePage from '../pages/CataloguePage';
import RealisationsPage from '../pages/RealisationsPage';
import BlogPage from '../pages/BlogPage';
import PageTransition from '../components/common/PageTransition';

// Import des pages de services
const ConstructionPage = lazy(() => import('../pages/services/ConstructionPage'));
const RenovationPage = lazy(() => import('../pages/services/RenovationPage'));
const EntretienPage = lazy(() => import('../pages/services/EntretienPage'));
const ReparationPage = lazy(() => import('../pages/services/ReparationPage'));
const AutomatismesPage = lazy(() => import('../pages/services/AutomatismesPage'));

// Chargement paresseux des composants
const BlogPostPage = lazy(() => import('../pages/BlogPostPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="container-kote py-32 flex justify-center items-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-kote-turquoise"></div>
  </div>
);

// Assurez-vous que le basename se termine par un slash
const basename = '/KotePiscine/';

const AppRouter = () => {
  return (
    <Router basename={basename}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<MainLayout key="home"><PageTransition><HomePage /></PageTransition></MainLayout>} />
          
          {/* Services */}
          <Route path="/services" element={<MainLayout key="services"><PageTransition><ServicesPage /></PageTransition></MainLayout>} />
          <Route element={<MainLayout key="services-layout"><PageTransition><ServicesLayout><Outlet /></ServicesLayout></PageTransition></MainLayout>}>
            <Route path="/services/construction" element={<ConstructionPage />} />
            <Route path="/services/renovation" element={<RenovationPage />} />
            <Route path="/services/entretien" element={<EntretienPage />} />
            <Route path="/services/reparation" element={<ReparationPage />} />
            <Route path="/services/automatismes" element={<AutomatismesPage />} />
          </Route>
          
          {/* Catalogue avec filtres */}
          <Route path="/catalogue" element={<MainLayout key="catalogue"><PageTransition><CataloguePage /></PageTransition></MainLayout>} />
          <Route path="/catalogue/:category" element={<MainLayout key="catalogue-category"><PageTransition><CataloguePage /></PageTransition></MainLayout>} />
          <Route path="/catalogue/:category/:productSlug" element={<MainLayout key="catalogue-product"><PageTransition><CataloguePage /></PageTransition></MainLayout>} />
          
          {/* Réalisations */}
          <Route path="/realisations" element={<MainLayout key="realisations"><PageTransition><RealisationsPage /></PageTransition></MainLayout>} />
          <Route path="/realisations/auto-nettoyantes" element={<MainLayout key="realisations-auto"><PageTransition><RealisationsPage /></PageTransition></MainLayout>} />
          <Route path="/realisations/traditionnelles" element={<MainLayout key="realisations-trad"><PageTransition><RealisationsPage /></PageTransition></MainLayout>} />
          
          {/* Blog avec filtres */}
          <Route path="/blog" element={<MainLayout key="blog"><PageTransition><BlogPage /></PageTransition></MainLayout>} />
          <Route path="/blog/:category" element={<MainLayout key="blog-category"><PageTransition><BlogPage /></PageTransition></MainLayout>} />
          <Route path="/blog/article/:slug" element={<MainLayout key="blog-article"><PageTransition><BlogPostPage /></PageTransition></MainLayout>} />
          
          {/* Contact avec sections */}
          <Route path="/contact" element={<MainLayout key="contact"><PageTransition><ContactPage /></PageTransition></MainLayout>} />
          <Route path="/contact/:section" element={<MainLayout key="contact-section"><PageTransition><ContactPage /></PageTransition></MainLayout>} />
          
          {/* Gestion des erreurs */}
          <Route path="/404" element={<MainLayout key="404"><PageTransition><NotFoundPage /></PageTransition></MainLayout>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter; 