import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Left Nav Items */}
          <div className="hidden md:flex items-center space-x-16">
            <Link 
              href="/how-it-works" 
              className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
            >
              HOW IT WORKS
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/explore-venues" 
              className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
            >
              EXPLORE VENUES
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/find-teammates" 
              className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
            >
              FIND TEAMMATES
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="block">
              <div className="bg-white px-4 py-1">
                <span className="text-2xl font-black tracking-tighter" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  ARENA
                </span>
              </div>
            </Link>
          </div>

          {/* Right Nav Items */}
          <div className="hidden md:flex items-center space-x-16">
            {!user ? (
              <>
                <Link 
                  href="/sign-up" 
                  className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
                >
                  SIGN UP
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                <Link 
                  href="/login" 
                  className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
                >
                  LOGIN
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
              >
                LOGOUT
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            )}
            <Link 
              href="/venue-owners" 
              className="text-sm font-bold hover:text-gray-600 transition-colors relative group"
            >
              FOR VENUE OWNERS
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-600 transition-colors p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <Link href="/how-it-works" className="block px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors">
              HOW IT WORKS
            </Link>
            <Link href="/explore-venues" className="block px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors">
              EXPLORE VENUES
            </Link>
            <Link href="/find-teammates" className="block px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors">
              FIND TEAMMATES
            </Link>
            {!user ? (
              <>
                <Link href="/sign-up" className="block px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors">
                  SIGN UP
                </Link>
                <Link href="/login" className="block px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors">
                  LOGIN
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors"
              >
                LOGOUT
              </button>
            )}
            <Link href="/venue-owners" className="block px-3 py-2 text-sm font-bold hover:bg-gray-50 rounded-lg transition-colors">
              FOR VENUE OWNERS
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

