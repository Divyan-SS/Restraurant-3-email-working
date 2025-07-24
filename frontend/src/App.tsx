import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import MenuPreview from './components/MenuPreview';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Categories />
      <MenuPreview />
      <Reservation />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;