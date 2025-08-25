import React, { useState, useEffect, useRef } from 'react';
import { BookingData, Religion, KitItem, Service } from './types';
import { religions } from './data/religions';
import { religionKits } from './data/kits';
import { services } from './data/services';
import emailjs from 'emailjs-com';

import { ReligionSelector } from './components/ReligionSelector';
import { KitSelector } from './components/KitSelector';
import { ServiceSelector } from './components/ServiceSelector';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { ConfirmationPage } from './components/ConfirmationPage';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

function App() {
  const [bookingData, setBookingData] = useState<BookingData>({
    religion: null,
    selectedKitItems: [],
    selectedServices: [],
    personalInfo: {
      name: '',
      address: '',
      phone: ''
    }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for smooth scrolling
  const religionRef = useRef<HTMLDivElement>(null);
  const kitRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const personalInfoRef = useRef<HTMLDivElement>(null);

  // Auto-select essential items when religion is selected
  useEffect(() => {
    if (bookingData.religion) {
      const kit = religionKits.find(k => k.religionId === bookingData.religion?.id);
      if (kit) {
        const essentialItems = kit.items.filter(item => item.required);
        setBookingData(prev => ({
          ...prev,
          selectedKitItems: essentialItems
        }));
        // Smooth scroll to kit section
        setTimeout(() => {
          kitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [bookingData.religion]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your EmailJS public key
  }, []);

  const handleReligionSelect = (religion: Religion) => {
    setBookingData(prev => ({ ...prev, religion }));
  };

  const handleKitItemToggle = (item: KitItem) => {
    if (item.required) return; // Cannot toggle required items

    setBookingData(prev => {
      const isSelected = prev.selectedKitItems.some(selected => selected.id === item.id);
      const updatedItems = isSelected
        ? prev.selectedKitItems.filter(selected => selected.id !== item.id)
        : [...prev.selectedKitItems, item];
      
      return { ...prev, selectedKitItems: updatedItems };
    });
  };

  const handleServiceToggle = (service: Service) => {
    setBookingData(prev => {
      const isSelected = prev.selectedServices.some(selected => selected.id === service.id);
      const updatedServices = isSelected
        ? prev.selectedServices.filter(selected => selected.id !== service.id)
        : [...prev.selectedServices, service];
      
      return { ...prev, selectedServices: updatedServices };
    });
  };

  const handlePersonalInfoUpdate = (info: typeof bookingData.personalInfo) => {
    setBookingData(prev => ({ ...prev, personalInfo: info }));
  };

  const sendEmail = async () => {
    const { religion, selectedKitItems, selectedServices, personalInfo } = bookingData;
    
    const kitTotal = selectedKitItems.reduce((sum, item) => sum + item.price, 0);
    const servicesTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
    const grandTotal = kitTotal + servicesTotal;

    const emailContent = `
ZANAYA - Last Rites Service Booking

Personal Details:
Name: ${personalInfo.name}
Phone: ${personalInfo.phone}
Address: ${personalInfo.address}

Religion: ${religion?.name}

Selected Kit Items:
${selectedKitItems.map(item => `• ${item.name} - ₹${item.price}`).join('\n')}
Kit Subtotal: ₹${kitTotal}

Additional Services:
${selectedServices.length > 0 ? selectedServices.map(service => `• ${service.name} - ₹${service.price}`).join('\n') : 'None selected'}
Services Subtotal: ₹${servicesTotal}

GRAND TOTAL: ₹${grandTotal}

Please contact the customer to confirm this booking.
    `;

    const templateParams = {
      to_email: 'aasiyanaqvi6@gmail.com',
      from_name: personalInfo.name,
      from_email: 'noreply@zanaya.com',
      subject: `ZANAYA Booking - ${personalInfo.name}`,
      message: emailContent,
      customer_name: personalInfo.name,
      customer_phone: personalInfo.phone,
      customer_address: personalInfo.address,
      religion: religion?.name,
      total_amount: grandTotal
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams
      );
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const emailSent = await sendEmail();
      if (emailSent) {
        setIsSubmitted(true);
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('There was an error submitting your booking. Please try again or call our helpline.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your booking. Please try again or call our helpline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    return bookingData.religion && 
           bookingData.selectedKitItems.length > 0 && 
           bookingData.personalInfo.name && 
           bookingData.personalInfo.address && 
           bookingData.personalInfo.phone;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ZANAYA</h1>
                  <p className="text-sm text-gray-600 hidden sm:block">Respectful Last Rites Services</p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-600">24/7 Emergency</p>
                <p className="text-lg font-semibold text-blue-600">+91 8273441052</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ConfirmationPage />
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart size={16} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">ZANAYA</h3>
                  <p className="text-gray-300 text-sm">Serving with compassion and respect</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-300 text-sm">24/7 Helpline</p>
                <p className="text-xl font-semibold text-blue-400">+91 8273441052</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm text-center">
                © 2024 ZANAYA. All rights reserved. | Providing dignified last rites services across all faiths.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ZANAYA</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Respectful Last Rites Services</p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-600">24/7 Emergency</p>
              <p className="text-lg font-semibold text-blue-600">+91 8273441052</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Compassionate Last Rites Services
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Honor your loved ones with dignified, respectful ceremonies tailored to your faith and traditions. 
            Available 24/7 across all religions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <span className="font-semibold">+91 8273441052</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={20} className="text-blue-600" />
              <span>24/7 Emergency Support</span>
            </div>
          </div>
        </section>

        {/* Religion Selection */}
        <section ref={religionRef} className="py-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 1: Choose Your Faith</h2>
            <p className="text-gray-600 text-lg">Select your religion to see appropriate services and ceremonies</p>
          </div>
          <ReligionSelector
            religions={religions}
            selectedReligion={bookingData.religion}
            onSelect={handleReligionSelect}
          />
        </section>

        {/* Kit Selection */}
        {bookingData.religion && (
          <section ref={kitRef} className="py-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 2: Sacred Kit Selection</h2>
              <p className="text-gray-600 text-lg">Choose the appropriate items for your ceremony</p>
            </div>
            {(() => {
              const kit = religionKits.find(k => k.religionId === bookingData.religion?.id);
              if (!kit) return null;
              
              return (
                <KitSelector
                  religion={bookingData.religion}
                  availableItems={kit.items}
                  selectedItems={bookingData.selectedKitItems}
                  onToggleItem={handleKitItemToggle}
                />
              );
            })()}
          </section>
        )}

        {/* Services Selection */}
        {bookingData.religion && (
          <section ref={servicesRef} className="py-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 3: Professional Services</h2>
              <p className="text-gray-600 text-lg">Add professional services to support your ceremony</p>
            </div>
            <ServiceSelector
              services={services}
              selectedReligion={bookingData.religion}
              selectedServices={bookingData.selectedServices}
              onToggleService={handleServiceToggle}
            />
          </section>
        )}

        {/* Personal Information */}
        {bookingData.religion && (
          <section ref={personalInfoRef} className="py-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 4: Contact Information</h2>
              <p className="text-gray-600 text-lg">Provide your details so we can coordinate the services</p>
            </div>
            <PersonalInfoForm
              personalInfo={bookingData.personalInfo}
              onUpdate={handlePersonalInfoUpdate}
            />
          </section>
        )}

        {/* Submit Section */}
        {bookingData.religion && (
          <section className="py-16 border-t border-gray-200">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Booking</h2>
              <p className="text-gray-600 mb-8">
                Review your selections and submit your booking. Our team will contact you within 30 minutes to confirm all details.
              </p>
              
              {/* Quick Summary */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Religion</p>
                    <p className="font-semibold text-lg">{bookingData.religion.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Kit Items</p>
                    <p className="font-semibold text-lg">{bookingData.selectedKitItems.length} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Services</p>
                    <p className="font-semibold text-lg">{bookingData.selectedServices.length} services</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{bookingData.selectedKitItems.reduce((sum, item) => sum + item.price, 0) + 
                       bookingData.selectedServices.reduce((sum, service) => sum + service.price, 0)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit() || isSubmitting}
                className={`w-full max-w-md mx-auto py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  canSubmit() && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Submitting Booking...' : 'Submit Booking'}
              </button>
              
              <p className="text-sm text-gray-600 mt-4">
                Your booking details will be sent automatically to our team for processing.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ZANAYA</h3>
                  <p className="text-gray-300 text-sm">Serving with compassion</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Providing dignified last rites services across all faiths with respect and compassion.
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Phone size={16} className="text-blue-400" />
                  <span className="text-blue-400 font-semibold">+91 8273441052</span>
                </div>
                <p className="text-gray-400 text-sm">24/7 Emergency Helpline</p>
                <div className="flex items-center justify-center gap-2">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-gray-400">aasiyanaqvi6@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>Hindu Last Rites</li>
                <li>Islamic Funeral Services</li>
                <li>Christian Burial Services</li>
                <li>Sikh Funeral Ceremonies</li>
                <li>Buddhist & Jain Rites</li>
                <li>24/7 Emergency Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm text-center">
              © 2024 ZANAYA. All rights reserved. | Providing dignified last rites services across all faiths.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;