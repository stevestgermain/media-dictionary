import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Acronym } from '../types';

interface FeaturedTermProps {
  acronym: Acronym;
  onSelect: (term: string) => void;
}

export const FeaturedTerm: React.FC<FeaturedTermProps> = ({ acronym, onSelect }) => {
  return (
    <div className="mt-12">
      <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-slate-200">
        <Calendar className="w-5 h-5 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Term of the Day</h3>
      </div>
      
      <div 
        onClick={() => onSelect(acronym.term)}
        className="group relative bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {acronym.term}
              </h4>
              <p className="text-blue-600 font-medium mt-1">{acronym.expansion}</p>
            </div>
            {acronym.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                <Tag className="w-3 h-3 mr-1" />
                {acronym.category}
              </span>
            )}
          </div>
          
          <p className="text-slate-600 line-clamp-3 leading-relaxed">
            {acronym.definition}
          </p>

          <div className="pt-2">
            <span className="text-xs font-semibold text-blue-600 group-hover:underline">
              Read full definition &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};