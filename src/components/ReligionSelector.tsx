import React from 'react';
import { Religion } from '../types';

interface ReligionSelectorProps {
  religions: Religion[];
  selectedReligion: Religion | null;
  onSelect: (religion: Religion) => void;
}

export function ReligionSelector({ religions, selectedReligion, onSelect }: ReligionSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {religions.map((religion) => (
          <div
            key={religion.id}
            onClick={() => onSelect(religion)}
            className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              selectedReligion?.id === religion.id
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{religion.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{religion.name}</h3>
              <p className="text-gray-600 text-sm">{religion.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}