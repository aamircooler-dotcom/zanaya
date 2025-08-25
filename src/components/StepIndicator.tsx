import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <span className="text-xs mt-2 text-center font-medium text-gray-600 hidden sm:block">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}