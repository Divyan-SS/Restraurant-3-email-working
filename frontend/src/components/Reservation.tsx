//Reservation.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const Reservation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    note: '',
  });
  const [submitStatus] = useState<'idle' | 'success' | 'unavailable' | 'full'>('idle');
  const [showPopup] = useState(false);

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

  const timeSlots = [
    { value: '06:00', label: '6:00 AM', period: 'breakfast' },
    { value: '06:30', label: '6:30 AM', period: 'breakfast' },
    { value: '07:00', label: '7:00 AM', period: 'breakfast' },
    { value: '11:00', label: '11:00 AM', period: 'lunch' },
    { value: '11:30', label: '11:30 AM', period: 'lunch' },
    { value: '12:00', label: '12:00 PM', period: 'lunch' },
    { value: '12:30', label: '12:30 PM', period: 'lunch' },
    { value: '13:00', label: '1:00 PM', period: 'lunch' },
    { value: '13:30', label: '1:30 PM', period: 'lunch' },
    { value: '14:00', label: '2:00 PM', period: 'lunch' },
    { value: '14:30', label: '2:30 PM', period: 'lunch' },
    { value: '15:00', label: '3:00 PM', period: 'lunch' },
    { value: '18:00', label: '6:00 PM', period: 'dinner' },
    { value: '18:30', label: '6:30 PM', period: 'dinner' },
    { value: '19:00', label: '7:00 PM', period: 'dinner' },
    { value: '19:30', label: '7:30 PM', period: 'dinner' },
    { value: '20:00', label: '8:00 PM', period: 'dinner' },
    { value: '20:30', label: '8:30 PM', period: 'dinner' },
    { value: '21:00', label: '9:00 PM', period: 'dinner' },
    { value: '21:30', label: '9:30 PM', period: 'dinner' },
    { value: '22:00', label: '10:00 PM', period: 'dinner' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Show confirmation alert first
    const confirmResult = await Swal.fire({
      title: 'Confirm Reservation',
      text: 'Ensure the reserving details are correct.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reserve It',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });

    if (!confirmResult.isConfirmed) return; // ⛔ Cancelled by user

    // Show loading alert
    Swal.fire({
      title: 'Processing Reservation...',
      text: 'Please wait while we confirm your booking.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          members: parseInt(formData.guests, 10),
          note: formData.note,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.message) {
        throw new Error(data.message || 'Booking failed');
      }

      // ✅ Success alert
      Swal.fire({
        icon: 'success',
        title: 'Reservation Confirmed 🎉',
        text: 'We’ve received your booking. Please check your email.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });

      setFormData({ name: '', email: '', date: '', time: '', guests: '2', note: '' });

      setTimeout(() => {
        window.location.reload();
      }, 5000);

    } catch (error: any) {
      console.error("Booking error:", error);

      // ❌ Error alert
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed ❌',
        text: error.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };

  const operatingHours = [
    { period: 'Breakfast', time: '6:00 AM - 9:00 AM' },
    { period: 'Lunch', time: '11:00 AM - 3:00 PM' },
    { period: 'Dinner', time: '6:00 PM - 10:00 PM' },
  ];

return (
  <section id="reservation" ref={sectionRef} className="py-20 bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
          Reservations
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
          Book Your <span className="text-yellow-400">Table</span>
        </h3>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Experience culinary excellence in an atmosphere of refined elegance. Reserve your table for an unforgettable dining experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Operating Hours */}
        <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
          <h4 className="text-2xl font-bold text-white mb-6 font-serif">Operating Hours</h4>
          <div className="space-y-4 mb-8">
            {operatingHours.map((hours, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <Clock className="text-yellow-400" size={20} />
                  <span className="text-white font-medium">{hours.period}</span>
                </div>
                <span className="text-gray-300">{hours.time}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h5 className="text-xl font-semibold text-white mb-4">Why Dine With Us?</h5>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-yellow-400" />
                Award-winning culinary team
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-yellow-400" />
                Premium ingredients sourced globally
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-yellow-400" />
                Elegant dining atmosphere
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-yellow-400" />
                Exceptional service standards
              </li>
            </ul>
          </div>
        </div>

        {/* Reservation Form */}
        <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
          
          {/* ✅ Show popup above the form */}
          {showPopup && (
            <div className="mb-6 p-4 bg-blue-600 rounded-lg flex items-center gap-2 text-white animate-fade-in-out">
              <Clock size={20} />
              <span>📩 Your booking is in progress. Wait for seat allotment.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <h4 className="text-2xl font-bold text-white mb-6 font-serif">Make a Reservation</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-300 mb-2">
                <Users size={16} className="inline mr-1" />
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Any special dietary requirements or requests..."
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-600 rounded-lg flex items-center gap-2 text-white">
                <CheckCircle size={20} />
                <span>Booking is successfully complete! Confirmation email sent.</span>
              </div>
            )}

            {submitStatus === 'unavailable' && (
              <div className="mb-6 p-4 bg-orange-600 rounded-lg flex items-center gap-2 text-white">
                <AlertCircle size={20} />
                <span>This slot is filled. Please try the next available slot.</span>
              </div>
            )}

            {submitStatus === 'full' && (
              <div className="mb-6 p-4 bg-red-600 rounded-lg flex items-center gap-2 text-white">
                <AlertCircle size={20} />
                <span>All slots are booked. If any slot becomes available, we will inform you later.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Reserve Table
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

};

export default Reservation;