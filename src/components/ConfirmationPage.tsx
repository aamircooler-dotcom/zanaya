import React from 'react';
import { CheckCircle, MessageCircle, Phone, Clock } from 'lucide-react';

export function ConfirmationPage() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Submitted Successfully!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Your ZANAYA service request has been sent via WhatsApp. Our compassionate team will contact you shortly to confirm the details and arrange the services.
        </p>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <MessageCircle size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">WhatsApp Confirmation</p>
                <p className="text-gray-600 text-sm">You should see the WhatsApp chat window with your booking details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Team Contact</p>
                <p className="text-gray-600 text-sm">Our team will call you within 30 minutes to confirm details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Service Arrangement</p>
                <p className="text-gray-600 text-sm">We'll coordinate all services according to your requirements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-red-800 font-medium">Emergency Contact</p>
          <p className="text-red-700 text-sm">For urgent matters, call directly: +91 8273441052</p>
        </div>

        {/* New Booking Button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Make Another Booking
        </button>
      </div>
    </div>
  );
}