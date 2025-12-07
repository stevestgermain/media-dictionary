import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Acronym } from '../types';

interface LeaderboardProps {
  acronyms: Acronym[];
  onSelectTerm: (term: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ acronyms, onSelectTerm }) => {
  // Sort by votes descending and take top 5
  const topConfusing = [...acronyms]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-slate-200">
        <TrendingUp className="w-5 h-5 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Most Confusing Terms</h3>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {topConfusing.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSelectTerm(item.term)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors duration-150 text-left group"
          >
            <div className="flex items-center space-x-4">
              <span className="flex-shrink-0 w-6 text-center text-sm font-medium text-slate-400">
                {index + 1}
              </span>
              <div>
                <span className="block text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.term}
                </span>
                <span className="text-sm text-slate-500">
                  {item.expansion}
                </span>
              </div>
            </div>
            <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-slate-600">
                {item.votes} votes
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};