import React from 'react';
import { Sparkles, Tag } from 'lucide-react';
import { Acronym } from '../types';

interface ResultCardProps {
  acronym: Acronym;
}

export const ResultCard: React.FC<ResultCardProps> = ({ acronym }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
           <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              {acronym.term}
            </h2>
            {acronym.source === 'ai' && (
              <span className="flex items-center space-x-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
                <Sparkles className="w-3 h-3" />
                <span>AI</span>
              </span>
            )}
           </div>
           <h3 className="text-lg font-medium text-blue-600">
            {acronym.expansion}
          </h3>
        </div>
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-slate-700 text-lg leading-relaxed">
          {acronym.definition}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Source: {acronym.source === 'local' ? 'Standard Library' : 'Generative AI'}
            </div>
            {acronym.category && (
              <div className="flex items-center space-x-1 text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                <Tag className="w-3 h-3" />
                <span>{acronym.category}</span>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};