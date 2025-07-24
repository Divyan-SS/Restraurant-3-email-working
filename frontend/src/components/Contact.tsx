//contact.tsx
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { Phone, MessageCircle, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

  const swalCustom = Swal.mixin({
    background: '#ffffff', // White background (default)
    color: '#000000',      // Default black text
    confirmButtonColor: '#3085d6', // Blue confirm button
    cancelButtonColor: '#d33',     // Red cancel button
    buttonsStyling: true,
    customClass: {
      popup: 'rounded-xl shadow-xl p-6',
      title: 'text-2xl font-semibold text-gray-800',
      confirmButton: 'bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-500',
      cancelButton: 'bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-500',
  },
});


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Confirmation alert
    const confirmResult = await swalCustom.fire({
      title: '📩 Send Message?',
      text: 'Are you sure you want to send this message?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
    });

    if (!confirmResult.isConfirmed) return;

    // Loading spinner
    swalCustom.fire({
      title: 'Sending Message...',
      text: 'Please wait while we deliver your message.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Unknown error');

      await swalCustom.fire({
        icon: 'success',
        title: '✅ Message Sent',
        text: 'We received your message and will get back to you shortly.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('❌ Contact form error:', error);
      await swalCustom.fire({
        icon: 'error',
        title: '❌ Error',
        text: 'Failed to send message. Please try again later.',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/918838904648?text=Hello! I would like to inquire about Maison d\'Élite restaurant.', '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:+918838904648', '_self');
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Call',
      description: 'Direct call for immediate assistance',
      action: 'Call +91 8838904648',
      onClick: handlePhoneCall,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Chat',
      description: 'Quick chat for bookings and queries',
      action: 'Chat on WhatsApp',
      onClick: handleWhatsApp,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: Mail,
      title: 'Email Form',
      description: 'Send detailed inquiries',
      action: 'Fill the form below',
      onClick: () => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }),
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
            Contact Us
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Get in <span className="text-yellow-400">Touch</span>
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We're here to assist you with reservations, event bookings, or any questions about your dining experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <button
                onClick={method.onClick}
                className={`group w-full p-8 rounded-2xl ${method.color} transition-all duration-300 transform hover:scale-105 shadow-2xl`}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <method.icon size={32} className="text-gray-900" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{method.title}</h4>
                <p className="text-gray-200 mb-4">{method.description}</p>
                <span className="text-white font-semibold">{method.action}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h4 className="text-2xl font-bold text-white mb-6 font-serif">Visit Our Restaurant</h4>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
                <MapPin className="text-yellow-400 mt-1" size={20} />
                <div>
                  <h5 className="text-white font-semibold mb-1">Address</h5>
                  <p className="text-gray-300">
                    123 Elite Boulevard<br />
                    Luxury District, City 12345<br />
                    Country
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
                <Phone className="text-yellow-400 mt-1" size={20} />
                <div>
                  <h5 className="text-white font-semibold mb-1">Phone</h5>
                  <p className="text-gray-300">+91 8838904648</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
                <Mail className="text-yellow-400 mt-1" size={20} />
                <div>
                  <h5 className="text-white font-semibold mb-1">Email</h5>
                  <p className="text-gray-300">divyansample1@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h5 className="text-xl font-semibold text-white mb-4">Best Uses for Each Contact Method</h5>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <MessageCircle size={16} className="text-green-400 mt-1" />
                  <span><strong>WhatsApp:</strong> Event bookings, group reservations, and general queries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={16} className="text-blue-400 mt-1" />
                  <span><strong>Phone:</strong> Immediate assistance, urgent changes, and direct communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={16} className="text-yellow-400 mt-1" />
                  <span><strong>Email:</strong> Detailed inquiries, feedback, and formal communication</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <form id="contact-form" onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6 font-serif">Send Us a Message</h4>

              <div className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
