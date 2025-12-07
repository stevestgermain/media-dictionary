import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AcronymSubmission } from '../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: AcronymSubmission) => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [term, setTerm] = useState('');
  const [expansion, setExpansion] = useState('');
  const [definition, setDefinition] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !expansion.trim() || !definition.trim()) return;
    
    onSubmit({
      term: term.trim().toUpperCase(),
      expansion: expansion.trim(),
      definition: definition.trim(),
      timestamp: Date.now()
    });
    
    // Reset form
    setTerm('');
    setExpansion('');
    setDefinition('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Submit New Term</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="term" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Acronym
              </label>
              <input
                id="term"
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value.toUpperCase())}
                placeholder="e.g. ROAS"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            
            <div>
              <label htmlFor="expansion" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Expansion
              </label>
              <input
                id="expansion"
                type="text"
                value={expansion}
                onChange={(e) => setExpansion(e.target.value)}
                placeholder="e.g. Return on Ad Spend"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <label htmlFor="definition" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Definition
              </label>
              <textarea
                id="definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Briefly explain what this term means..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 resize-none"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};