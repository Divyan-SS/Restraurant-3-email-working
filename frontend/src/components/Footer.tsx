import React from 'react';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { label: 'Home', onClick: () => scrollToSection('home') },
    { label: 'Menu', onClick: () => scrollToSection('menu') },
    { label: 'Reservation', onClick: () => scrollToSection('reservation') },
    { label: 'Contact', onClick: () => scrollToSection('contact') },
  ];

  return (
    <footer className="bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4 font-serif">
              Maison d'Élite
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Where culinary artistry meets unparalleled elegance. Experience dining redefined through exceptional cuisine and impeccable service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-yellow-400 mt-1" />
                <div>
                  <p className="text-gray-300">
                    123 Elite Boulevard<br />
                    Luxury District, City 12345<br />
                    Country
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-yellow-400" />
                <p className="text-gray-300">+91 8838904648</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-400" />
                <p className="text-gray-300">divyansample1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-4 text-center">Operating Hours</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-900 rounded-lg">
              <h5 className="font-semibold text-yellow-400">Breakfast</h5>
              <p className="text-gray-300">6:00 AM - 7:00 AM</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <h5 className="font-semibold text-yellow-400">Lunch</h5>
              <p className="text-gray-300">11:00 AM - 3:00 PM</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <h5 className="font-semibold text-yellow-400">Dinner</h5>
              <p className="text-gray-300">6:00 PM - 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Maison d'Élite. All rights reserved. Created with passion for culinary excellence.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-all duration-300 transform hover:scale-110 shadow-lg z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;