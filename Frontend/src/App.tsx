import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageTransition } from './components/common/PageTransition';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const FileSharePage = lazy(() => import('./pages/FileSharePage').then(m => ({ default: m.FileSharePage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
            
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                } />
                <Route path="/login" element={
                  <PageTransition>
                    <LoginPage />
                  </PageTransition>
                } />
                <Route path="/register" element={
                  <PageTransition>
                    <RegisterPage />
                  </PageTransition>
                } />
                <Route path="/dashboard" element={
                  <PageTransition>
                    <DashboardPage />
                  </PageTransition>
                } />
                <Route path="/analytics" element={
                  <PageTransition>
                    <AnalyticsPage />
                  </PageTransition>
                } />
                <Route path="/profile" element={
                  <PageTransition>
                    <ProfilePage />
                  </PageTransition>
                } />
                <Route path="/share/:uuid" element={
                  <PageTransition>
                    <FileSharePage />
                  </PageTransition>
                } />
                <Route path="*" element={
                  <PageTransition>
                    <NotFoundPage />
                  </PageTransition>
                } />
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;