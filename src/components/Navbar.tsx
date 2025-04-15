
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Text Detector', path: '/text-detector' },
    { name: 'Image Detector', path: '/image-detector' },
    { name: 'Video Detector', path: '/video-detector' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-factify-600" />
          <span className="font-bold text-xl">
            <span className="gradient-text">Factify</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-factify-600 ${
                isActive(item.path) 
                  ? 'text-factify-600 border-b-2 border-factify-600' 
                  : 'text-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-white shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium p-2 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? 'text-factify-600 bg-factify-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
