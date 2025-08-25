import React from 'react';
import { KitItem, Religion } from '../types';
import { Check, Plus, X } from 'lucide-react';

interface KitSelectorProps {
  religion: Religion;
  availableItems: KitItem[];
  selectedItems: KitItem[];
  onToggleItem: (item: KitItem) => void;
}

export function KitSelector({ religion, availableItems, selectedItems, onToggleItem }: KitSelectorProps) {
  const essentialItems = availableItems.filter(item => item.category === 'essential');
  const regionalItems = availableItems.filter(item => item.category === 'regional');
  const casteItems = availableItems.filter(item => item.category === 'caste');

  const isSelected = (item: KitItem) => selectedItems.some(selected => selected.id === item.id);

  const ItemCard = ({ item, canToggle = true }: { item: KitItem; canToggle?: boolean }) => {
    const selected = isSelected(item);
    
    return (
      <div
        className={`bg-white rounded-lg p-4 border-2 transition-all duration-300 ${
          selected ? 'border-green-500 shadow-md' : 'border-gray-200'
        } ${canToggle ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : 'opacity-75'}`}
        onClick={canToggle ? () => onToggleItem(item) : undefined}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              {item.required && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  Required
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <p className="font-bold text-lg text-blue-600">₹{item.price}</p>
          </div>
          <div className="ml-4">
            {item.required ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
            ) : selected ? (
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
      </div>
    );
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {religion.name} Sacred Kit
        </h2>
        <p className="text-gray-600">Select items for your ceremony</p>
      </div>

      {/* Essential Items */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Essential Items (Included)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {essentialItems.map((item) => (
            <ItemCard key={item.id} item={item} canToggle={false} />
          ))}
        </div>
      </div>

      {/* Regional Items */}
      {regionalItems.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Regional Add-ons (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Caste/Denomination Items */}
      {casteItems.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Caste/Sect Specific (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {casteItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Price Summary */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Total Kit Price</h4>
            <p className="text-gray-600 text-sm">{selectedItems.length} items selected</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">₹{totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}