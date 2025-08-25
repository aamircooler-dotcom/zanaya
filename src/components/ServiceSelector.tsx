import React from 'react';
import { Service, Religion } from '../types';
import { Clock, Plus, Check } from 'lucide-react';

interface ServiceSelectorProps {
  services: Service[];
  selectedReligion: Religion | null;
  selectedServices: Service[];
  onToggleService: (service: Service) => void;
}

export function ServiceSelector({ services, selectedReligion, selectedServices, onToggleService }: ServiceSelectorProps) {
  const isSelected = (service: Service) => selectedServices.some(selected => selected.id === service.id);

  // Filter services based on selected religion
  const filteredServices = selectedReligion 
    ? services.filter(service => service.religions.includes(selectedReligion.id))
    : services;

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Services</h2>
        <p className="text-gray-600">Select additional services you may need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredServices.map((service) => {
          const selected = isSelected(service);
          
          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service)}
              className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selected ? 'border-green-500 shadow-md ring-2 ring-green-200' : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{service.name}</h3>
                <div className="ml-2">
                  {selected ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-100">
                      <Plus size={16} className="text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg text-blue-600">₹{service.price}</p>
                {service.duration && (
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock size={14} />
                    <span>{service.duration}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Summary */}
      {selectedServices.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Total Service Price</h4>
              <p className="text-gray-600 text-sm">{selectedServices.length} services selected</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">₹{totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}