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
      <div className="relative flex items-center bg-gray-50 rounded-2xl border border-gray-200 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 overflow-hidden">
        <div className="pl-4 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full bg-transparent text-gray-900 text-base px-3 py-3.5 focus:outline-none placeholder:text-gray-400 font-medium"
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button 
            onClick={onClear}
            className="pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};