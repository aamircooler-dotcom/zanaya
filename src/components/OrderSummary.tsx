import React from 'react';
import { BookingData } from '../types';
import { MessageCircle, Check } from 'lucide-react';

interface OrderSummaryProps {
  bookingData: BookingData;
  onSubmit: () => void;
}

export function OrderSummary({ bookingData, onSubmit }: OrderSummaryProps) {
  const { religion, selectedKitItems, selectedServices, personalInfo } = bookingData;
  
  const kitTotal = selectedKitItems.reduce((sum, item) => sum + item.price, 0);
  const servicesTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const grandTotal = kitTotal + servicesTotal;

  const generateWhatsAppMessage = () => {
    let message = `🙏 *ZANAYA - LAST RITES SERVICE BOOKING*\n\n`;
    
    // Personal Information
    message += `👤 *Personal Details:*\n`;
    message += `Name: ${personalInfo.name}\n`;
    message += `Phone: ${personalInfo.phone}\n`;
    message += `Address: ${personalInfo.address}\n\n`;
    
    // Religion
    message += `🕉️ *Religion:* ${religion?.name}\n\n`;
    
    // Kit Items
    if (selectedKitItems.length > 0) {
      message += `📦 *Selected Kit Items:*\n`;
      selectedKitItems.forEach(item => {
        message += `• ${item.name} - ₹${item.price}\n`;
      });
      message += `*Kit Subtotal: ₹${kitTotal}*\n\n`;
    }
    
    // Services
    if (selectedServices.length > 0) {
      message += `🔧 *Additional Services:*\n`;
      selectedServices.forEach(service => {
        message += `• ${service.name} - ₹${service.price}\n`;
      });
      message += `*Services Subtotal: ₹${servicesTotal}*\n\n`;
    }
    
    // Total
    message += `💰 *GRAND TOTAL: ₹${grandTotal}*\n\n`;
    message += `Please confirm this booking and provide further instructions. Thank you.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppSubmit = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/918273441052?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onSubmit();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Summary</h2>
        <p className="text-gray-600">Review your selection before submitting</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Personal Information */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{personalInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">{personalInfo.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold">{personalInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Religion */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Selected Religion</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{religion?.icon}</span>
            <span className="text-lg font-medium">{religion?.name}</span>
          </div>
        </div>

        {/* Kit Items */}
        {selectedKitItems.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Kit Items</h3>
            <div className="space-y-3">
              {selectedKitItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Check size={16} className="text-green-500" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-blue-600">₹{item.price}</p>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Kit Subtotal</p>
                  <p className="font-semibold text-blue-600">₹{kitTotal}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services */}
        {selectedServices.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
            <div className="space-y-3">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Check size={16} className="text-green-500" />
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      {service.duration && (
                        <p className="text-xs text-gray-500">Duration: {service.duration}</p>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold text-green-600">₹{service.price}</p>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Services Subtotal</p>
                  <p className="font-semibold text-green-600">₹{servicesTotal}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-900">Grand Total</p>
              <p className="text-sm text-gray-600">All items and services included</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">₹{grandTotal}</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-6">
          <button
            onClick={handleWhatsAppSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-3 text-lg"
          >
            <MessageCircle size={24} />
            Submit via WhatsApp
          </button>
          <p className="text-center text-sm text-gray-600 mt-3">
            This will open WhatsApp with your booking details pre-filled
          </p>
        </div>
      </div>
    </div>
  );
}