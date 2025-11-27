import React from 'react';
import { Strategy } from '../types';
import * as Icons from 'lucide-react';

interface Props {
  strategy: Strategy;
  onClick: () => void;
  isSelected: boolean;
}

export const StrategyCard: React.FC<Props> = ({ strategy, onClick, isSelected }) => {
  // Dynamically load the icon
  const IconComponent = (Icons as any)[strategy.iconName] || Icons.HelpCircle;

  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg
        ${isSelected 
          ? 'border-excel-teal bg-excel-bg shadow-md scale-[1.02]' 
          : 'border-transparent bg-white shadow-sm hover:border-excel-teal/30'}
      `}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-full ${isSelected ? 'bg-excel-teal text-white' : 'bg-gray-100 text-excel-dark'}`}>
          <IconComponent size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">{strategy.title}</h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-excel-orange">
            {strategy.category}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {strategy.shortDescription}
      </p>
    </div>
  );
};