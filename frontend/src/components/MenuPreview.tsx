import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const MenuPreview = () => {
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

  const menuItems = [
    {
      category: 'Starters',
      items: [
        {
          name: 'Truffle Arancini',
          description: 'Crispy risotto balls with black truffle and parmesan',
          price: '$28',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        },
        {
          name: 'Oyster Rockefeller',
          description: 'Fresh oysters with herbs, butter, and breadcrumbs',
          price: '$24',
          image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        },
      ],
    },
    {
      category: 'Main Course',
      items: [
        {
          name: 'Wagyu Beef Tenderloin',
          description: 'Premium wagyu with seasonal vegetables and red wine jus',
          price: '$85',
          image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        },
        {
          name: 'Pan-Seared Halibut',
          description: 'Atlantic halibut with cauliflower puree and caviar',
          price: '$68',
          image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        },
      ],
    },
    {
      category: 'Desserts',
      items: [
        {
          name: 'Chocolate Soufflé',
          description: 'Dark chocolate soufflé with vanilla bean ice cream',
          price: '$22',
          image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        },
        {
          name: 'Crème Brûlée',
          description: 'Classic vanilla custard with caramelized sugar',
          price: '$18',
          image: 'https://images.pexels.com/photos/1126360/pexels-photo-1126360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        },
      ],
    },
  ];

  return (
    <section id="menu" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
            Menu Preview
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Featured <span className="text-yellow-400">Dishes</span>
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover a selection of our most celebrated dishes, each crafted with the finest ingredients and culinary expertise.
          </p>
        </div>

        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <h4 className={`text-2xl font-bold text-yellow-400 mb-8 text-center font-serif ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: `${sectionIndex * 200}ms` }}>
              {section.category}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`group bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(sectionIndex * 2 + itemIndex) * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold">
                      {item.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h5 className="text-xl font-bold text-white mb-2">{item.name}</h5>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <button className="group/btn flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <button className="group bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            View Complete Menu
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;