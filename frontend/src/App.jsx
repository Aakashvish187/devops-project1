import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect } from 'react';

import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import { useAuthStore } from './store/authStore';

// Public pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Services = lazy(() => import('./pages/public/Services'));
const ServiceDetail = lazy(() => import('./pages/public/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/public/Portfolio'));
const Team = lazy(() => import('./pages/public/Team'));
const Blog = lazy(() => import('./pages/public/Blog'));
const BlogSingle = lazy(() => import('./pages/public/BlogSingle'));
const Pricing = lazy(() => import('./pages/public/Pricing'));
const Contact = lazy(() => import('./pages/public/Contact'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogsAdmin = lazy(() => import('./pages/admin/BlogsAdmin'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const MessagesAdmin = lazy(() => import('./pages/admin/MessagesAdmin'));
const SettingsAdmin = lazy(() => import('./pages/admin/SettingsAdmin'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 60 * 1000 } },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark">
    <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#1a1f35', color: '#fff', border: '1px solid rgba(99,102,241,0.3)' },
              success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
            }}
          />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:slug" element={<ServiceDetail />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="team" element={<Team />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogSingle />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="blogs" element={<BlogsAdmin />} />
                <Route path="blogs/new" element={<BlogEditor />} />
                <Route path="blogs/:id/edit" element={<BlogEditor />} />
                <Route path="messages" element={<MessagesAdmin />} />
                <Route path="settings" element={<SettingsAdmin />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-dark">
                  <h1 className="text-8xl font-display font-bold gradient-text mb-4">404</h1>
                  <p className="text-white/60 mb-8">Page not found</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              } />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
