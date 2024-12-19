import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-oswald text-xl font-bold mb-4">ARENA</h3>
            <p className="font-open-sans text-gray-400">
              Connecting people through sports and creating vibrant, active communities.
            </p>
          </div>
          
          <div>
            <h4 className="font-oswald text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-open-sans">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-oswald text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4 font-open-sans">
              <a 
                href="https://twitter.com/joinarena" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://instagram.com/joinarena" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 font-open-sans">
          <p>&copy; {new Date().getFullYear()} ARENA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;