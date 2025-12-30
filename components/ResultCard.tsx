import React from 'react';
import { Acronym } from '../types';

interface ResultCardProps {
  acronym: Acronym;
}

export const ResultCard: React.FC<ResultCardProps> = ({ acronym }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm transition-colors duration-300">
            <div className="flex items-start justify-between mb-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {acronym.term}
                </h2>
                {acronym.category && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-600">
                    {acronym.category}
                  </span>
                )}
            </div>
            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {acronym.expansion}
            </h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                {acronym.definition}
            </p>
        </div>
      </div>
    </div>
  );
};
