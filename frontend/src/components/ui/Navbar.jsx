import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Trophy, 
  Target, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield,
  ShieldOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn, getInitials } from '../../utils/helpers';

const Navbar = () => {
  const { user, logout, anonymousMode, toggleAnonymousMode } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/challenges', icon: Target, label: 'Challenges' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                SkillMitra
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActivePath(item.to)
                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Anonymous Mode Toggle */}
            <button
              onClick={toggleAnonymousMode}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                anonymousMode
                  ? "bg-accent-50 text-accent-700 border border-accent-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              title={anonymousMode ? "Anonymous Mode On" : "Anonymous Mode Off"}
            >
              {anonymousMode ? (
                <ShieldOff className="w-4 h-4" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              <span className="hidden lg:inline">
                {anonymousMode ? "Anonymous" : "Public"}
              </span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {getInitials(user?.name || "User")}
                    </span>
                  </div>
                )}
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">
                    {anonymousMode ? user?.pseudonym : user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Level {user?.level} • {user?.points} pts
                  </p>
                </div>
              </div>

              {/* Settings & Logout */}
              <div className="flex items-center space-x-2">
                <Link
                  to="/settings"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActivePath(item.to)
                      ? "bg-primary-50 text-primary-700 border border-primary-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                <button
                  onClick={toggleAnonymousMode}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 w-full",
                    anonymousMode
                      ? "bg-accent-50 text-accent-700 border border-accent-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {anonymousMode ? (
                    <ShieldOff className="w-5 h-5" />
                  ) : (
                    <Shield className="w-5 h-5" />
                  )}
                  <span>{anonymousMode ? "Disable Anonymous Mode" : "Enable Anonymous Mode"}</span>
                </button>
                
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 w-full"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
