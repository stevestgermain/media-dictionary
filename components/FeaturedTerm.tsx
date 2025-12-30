import React from 'react';
import { Calendar } from 'lucide-react';
import { Acronym } from '../types';

interface FeaturedTermProps {
  acronym: Acronym;
  onSelect: (term: string) => void;
}

export const FeaturedTerm: React.FC<FeaturedTermProps> = ({ acronym, onSelect }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 mb-3">
        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-500" />
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Term of the Day</h3>
      </div>
      
      <div 
        onClick={() => onSelect(acronym.term)}
        className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200 group"
      >
        <div className="flex justify-between items-start mb-2">
           <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {acronym.term}
           </span>
           <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">
              {acronym.category || 'Term'}
           </span>
        </div>
        
        <p className="text-xs font-bold text-gray-900 dark:text-white mb-2">{acronym.expansion}</p>
        
        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {acronym.definition}
        </p>
      </div>
    </div>
  );
};
