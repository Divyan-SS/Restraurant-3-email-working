import React, { useEffect, useRef, useState } from 'react';
import CategoryCarousel from './CategoryCarousel';

const Categories = () => {
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

  const categories = [
    {
      title: 'Starters',
      description: 'Exquisite appetizers to awaken your palate',
      images: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      ],
    },
    {
      title: 'Main Course',
      description: 'Signature dishes crafted with perfection',
      images: [
        'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639556/pexels-photo-1639556.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639558/pexels-photo-1639558.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639559/pexels-photo-1639559.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639563/pexels-photo-1639563.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      ],
    },
    {
      title: 'Desserts',
      description: 'Divine sweet endings to your culinary journey',
      images: [
        'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1126360/pexels-photo-1126360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1126358/pexels-photo-1126358.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1126361/pexels-photo-1126361.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1099682/pexels-photo-1099682.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1099683/pexels-photo-1099683.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      ],
    },
    {
      title: 'Beverages',
      description: 'Curated selection of fine wines and premium drinks',
      images: [
        'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283220/pexels-photo-1283220.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283273/pexels-photo-1283273.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283275/pexels-photo-1283275.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283274/pexels-photo-1283274.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283276/pexels-photo-1283276.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283277/pexels-photo-1283277.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283278/pexels-photo-1283278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      ],
    },
    {
      title: 'Vegan Specials',
      description: 'Plant-based excellence without compromise',
      images: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640779/pexels-photo-1640779.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640780/pexels-photo-1640780.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640781/pexels-photo-1640781.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640782/pexels-photo-1640782.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640783/pexels-photo-1640783.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640784/pexels-photo-1640784.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      ],
    },
    {
      title: "Chef's Choice",
      description: 'Exclusive creations by our master chefs',
      images: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1126360/pexels-photo-1126360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        'https://images.pexels.com/photos/1283220/pexels-photo-1283220.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      ],
    },
  ];

  return (
    <section id="categories" ref={sectionRef} className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
            Our Categories
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Culinary <span className="text-yellow-400">Excellence</span>
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover our carefully curated menu categories, each crafted with passion and precision to deliver an unforgettable dining experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-gray-900 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2 font-serif">
                    {category.title}
                  </h4>
                  <p className="text-gray-300">{category.description}</p>
                </div>
                <CategoryCarousel images={category.images} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;