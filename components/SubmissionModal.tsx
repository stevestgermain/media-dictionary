import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content - Main Toolbox Style */}
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-[420px] overflow-hidden transform transition-all">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">New Entry</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Acronym
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value.toUpperCase())}
              placeholder="e.g. CTR"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-gray-900 text-sm focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Expansion
            </label>
            <input
              type="text"
              value={expansion}
              onChange={(e) => setExpansion(e.target.value)}
              placeholder="e.g. Click-Through Rate"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-gray-900 text-sm focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Definition
            </label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Brief explanation..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-gray-900 text-sm focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400 resize-none"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1.5 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2.5 py-1.5 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg text-blue-600 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};