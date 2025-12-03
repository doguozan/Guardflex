import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SEO } from './components/SEO';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { GalleryPage } from './pages/GalleryPage';
import { HistoryPage } from './pages/HistoryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const PublicLayout = ({ children }) => (
  <div className="min-h-screen" style={{ overflow: 'visible', position: 'relative' }}>
    <SEO />
    <Header />
    <main style={{ overflow: 'visible' }}>{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Route - Without Header/Footer */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Public Routes - With Header/Footer */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/products"
          element={
            <PublicLayout>
              <ProductsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <ServicesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/benefits"
          element={
            <PublicLayout>
              <BenefitsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <PublicLayout>
              <GalleryPage />
            </PublicLayout>
          }
        />
        <Route
          path="/history"
          element={
            <PublicLayout>
              <HistoryPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
      </Routes>
    </Router>
  );
}

