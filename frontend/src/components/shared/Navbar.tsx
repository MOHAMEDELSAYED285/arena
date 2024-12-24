import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    if (router.pathname !== '/') {
      // If not on home page, navigate and then scroll
      router.push('/', undefined, { shallow: true }).then(() => {
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    } else {
      // If on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 fixed top-0 z-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between h-16 px-8">
          {/* Left section */}
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center">
              <Image src="/assets/arena-logo.png" alt="Arena" width={40} height={40} />
              <span className="ml-2 text-xl font-bold">ARENA</span>
            </Link>
            <div className="flex items-center space-x-8">
            <button 
                onClick={() => scrollToSection('explore-venues')}
                className="text-sm font-semibold hover:text-gray-600 transition-colors"
              >
                EXPLORE VENUES
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-semibold hover:text-gray-600 transition-colors"
              >
                HOW IT WORKS
              </button>

            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link 
                  href="/register" 
                  className="text-sm font-semibold hover:text-gray-600 transition-colors"
                >
                  SIGN UP
                </Link>
                <Link 
                  href="/login" 
                  className="px-6 py-2 text-sm font-semibold text-black bg-arena-orange rounded-lg hover:bg-arena-orange/90 transition-colors"
                >
                  LOGIN
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-sm font-semibold hover:text-gray-600 transition-colors"
              >
                LOGOUT
              </button>
            )}
<Link 
  href="/venue-owners" 
  className="text-sm font-semibold hover:text-gray-600 transition-colors"
>
  FOR VENUE OWNERS
</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;