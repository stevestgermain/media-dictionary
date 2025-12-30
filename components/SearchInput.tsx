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
      <div className="relative flex items-center bg-gray-50 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:ring-1 focus-
