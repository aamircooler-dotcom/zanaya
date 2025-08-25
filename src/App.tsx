import React, { useState, useEffect } from 'react';
import { BookingData, Religion, KitItem, Service } from './types';
import { religions } from './data/religions';
import { religionKits } from './data/kits';
import { services } from './data/services';
import emailjs from 'emailjs-com';

import { ReligionSelector } from './components/ReligionSelector';
import { KitSelector } from './components/KitSelector';
import { ServiceSelector } from './components/ServiceSelector';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { StepIndicator } from './components/StepIndicator';
import { OrderSummary } from './components/OrderSummary';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const stepLabels = ['Religion', 'Essential Kit', 'Services', 'Details'];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
  }, []);

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
      }
    }
  }, [bookingData.religion]);

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

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.religion !== null;
      case 2:
        return bookingData.selectedKitItems.length > 0;
      case 3:
        return true; // Services are optional
      case 4:
        return bookingData.personalInfo.name && 
               bookingData.personalInfo.address && 
               bookingData.personalInfo.phone;
      default:
        return false;
    }
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
          <OrderSummary bookingData={bookingData} onSubmit={() => {}} />
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Compassionate Last Rites Services
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Honor your loved ones with dignified, respectful ceremonies tailored to your faith and traditions. 
            Available 24/7 across all religions.
          </p>
        </section>

        {/* Step Indicator */}
        <StepIndicator 
          currentStep={currentStep - 1} 
          totalSteps={4} 
          stepLabels={stepLabels} 
        />

        {/* Step Content */}
        <div className="min-h-[600px] py-12">
          {currentStep === 1 && (
            <section>
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
          )}

          {currentStep === 2 && bookingData.religion && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 2: Essential Kit</h2>
                <p className="text-gray-600 text-lg">Review and customize your {bookingData.religion.name} sacred kit</p>
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

          {currentStep === 3 && bookingData.religion && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 3: Additional Services</h2>
                <p className="text-gray-600 text-lg mb-8">Do you want any service?</p>
                <p className="text-gray-500">Select professional services to support your ceremony (optional)</p>
              </div>
              <ServiceSelector
                services={services}
                selectedReligion={bookingData.religion}
                selectedServices={bookingData.selectedServices}
                onToggleService={handleServiceToggle}
              />
            </section>
          )}

          {currentStep === 4 && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 4: Your Details</h2>
                <p className="text-gray-600 text-lg">Provide your contact information for service coordination</p>
              </div>
              <PersonalInfoForm
                personalInfo={bookingData.personalInfo}
                onUpdate={handlePersonalInfoUpdate}
              />
            </section>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={!canProceedFromStep(currentStep)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                canProceedFromStep(currentStep)
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceedFromStep(currentStep) || isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                canProceedFromStep(currentStep) && !isSubmitting
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          )}
        </div>

        {/* Progress Summary */}
        {currentStep > 1 && (
          <div className="mt-8 bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Religion</p>
                <p className="font-semibold">{bookingData.religion?.name || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kit Items</p>
                <p className="font-semibold">{bookingData.selectedKitItems.length} items</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Services</p>
                <p className="font-semibold">{bookingData.selectedServices.length} services</p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 text-center">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{bookingData.selectedKitItems.reduce((sum, item) => sum + item.price, 0) + 
                   bookingData.selectedServices.reduce((sum, service) => sum + service.price, 0)}
              </p>
            </div>
          </div>
        )}
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

export default App;