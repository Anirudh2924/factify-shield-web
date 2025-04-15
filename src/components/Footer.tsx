
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Info, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-factify-600" />
              <span className="font-bold text-lg">
                <span className="gradient-text">Factify</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Advanced AI-powered platform for detecting fake news, manipulated images, and deepfake videos.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="text-gray-600 text-sm hover:text-factify-600 transition-colors block">
                Home
              </Link>
              <Link to="/text-detector" className="text-gray-600 text-sm hover:text-factify-600 transition-colors block">
                Text Detector
              </Link>
              <Link to="/image-detector" className="text-gray-600 text-sm hover:text-factify-600 transition-colors block">
                Image Detector
              </Link>
              <Link to="/video-detector" className="text-gray-600 text-sm hover:text-factify-600 transition-colors block">
                Video Detector
              </Link>
            </div>
          </div>
          
          {/* Contact and Social */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-gray-800">Contact & Social</h3>
            <div className="space-y-2">
              <Link to="#" className="text-gray-600 text-sm hover:text-factify-600 transition-colors flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@factify.com</span>
              </Link>
              <Link to="#" className="text-gray-600 text-sm hover:text-factify-600 transition-colors flex items-center">
                <Info className="h-4 w-4 mr-2" />
                <span>About Us</span>
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link to="#" className="text-gray-600 hover:text-factify-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-factify-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-gray-600 hover:text-factify-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Factify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
