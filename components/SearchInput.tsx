import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onEnter: () => void;
  isLoading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  onClear, 
  onEnter,
  isLoading = false 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter();
    }
    if (e.key === 'Escape') {
      onClear();
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
        <div className="pl-5 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Enter acronym (e.g. ROI, CPM)..."
          className="w-full bg-transparent text-slate-900 text-lg font-medium px-5 py-4 focus:outline-none placeholder-slate-400 tracking-wide uppercase"
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button 
            onClick={onClear}
            className="pr-5 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};