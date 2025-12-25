import React from 'react';
import { Sparkles, Tag } from 'lucide-react';
import { Acronym } from '../types';

interface ResultCardProps {
  acronym: Acronym;
}

export const ResultCard: React.FC<ResultCardProps> = ({ acronym }) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        {acronym.source === 'ai' && (
            <div className="flex items-center justify-end mb-2">
              <span className="flex items-center text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                <Sparkles className="w-3 h-3 mr-1" /> AI Generated
              </span>
            </div>
        )}
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-baseline justify-between mb-1">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {acronym.term}
                </h2>
                {acronym.category && (
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        {acronym.category}
                    </span>
                )}
            </div>
            <h3 className="text-sm font-semibold text-blue-600 mb-3">
                {acronym.expansion}
            </h3>
            <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                {acronym.definition}
            </p>
        </div>
      </div>
    </div>
  );
};