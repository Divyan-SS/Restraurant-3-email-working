import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Award, value: '15+', label: 'Awards Won' },
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Clock, value: '10+', label: 'Years Experience' },
    { icon: Star, value: '4.9', label: 'Rating' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div>
              <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
                About Us
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                A Story of <span className="text-yellow-400">Excellence</span>
              </h3>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Nestled in the heart of the city, Maison d'Élite represents the pinnacle of fine dining excellence. Our story began with a simple vision: to create an extraordinary culinary experience that transcends the ordinary and embraces the extraordinary.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Under the guidance of our world-renowned chefs, we craft each dish with meticulous attention to detail, using only the finest ingredients sourced from around the globe. Our commitment to culinary artistry and impeccable service has made us a destination for discerning diners seeking the ultimate gastronomic journey.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-lg mb-3">
                    <stat.icon size={24} className="text-gray-900" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
                  alt="Restaurant Interior"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/2878738/pexels-photo-2878738.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Chef at work"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Fine Dining Setup"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
                  alt="Elegant Atmosphere"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;