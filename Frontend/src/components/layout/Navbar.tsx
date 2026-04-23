import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';
import { Button } from '../common/Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useIsSmallerThan } from '../../hooks/useMediaQuery';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsSmallerThan('md');

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <FolderIcon className="w-5 h-5" />,
      requiresAuth: true,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: <ChartBarIcon className="w-5 h-5" />,
      requiresAuth: true,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <UserCircleIcon className="w-5 h-5" />,
      requiresAuth: true,
    },
  ];

  const visibleNavItems = navItems.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={handleNavClick}
              >
                <div className="w-8 h-8 bg-linear-to-br from-primary-500 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  FileShare
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle size="sm" />

              {isAuthenticated && user ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Hello, {user.displayName.split(' ')[0]}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    leftIcon={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/register')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <Bars3Icon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {isAuthenticated && user && (
                <div className="px-3 py-2 mb-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              )}

              {visibleNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  )}
                  onClick={handleNavClick}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={handleLogout}
                    leftIcon={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        handleNavClick();
                        navigate('/login');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => {
                        handleNavClick();
                        navigate('/register');
                      }}
                    >
                      Create Account
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};