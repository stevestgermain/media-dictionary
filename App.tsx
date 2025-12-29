import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Acronym, AiResponseSchema } from './types';
import { INITIAL_ACRONYMS } from './constants';
import { lookupAcronymWithGemini } from './services/geminiService';
import { SearchInput } from './components/SearchInput';
import { ResultCard } from './components/ResultCard';
import { FeaturedTerm } from './components/FeaturedTerm';
import { BookOpen, AlertTriangle } from 'lucide-react';

// Keys for localStorage
const STORAGE_KEY = 'adtech_acronym_data_v2'; 

export default function App() {
  const [data, setData] = useState<Acronym[]>(INITIAL_ACRONYMS);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [missingKeyError, setMissingKeyError] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Dark mode listener effect
  useEffect(() => {
    const handleThemeMessage = (event: MessageEvent) => {
      if (event.data?.type === 'THEME_CHANGE') {
        setTheme(event.data.theme);
      }
    };

    window.addEventListener('message', handleThemeMessage);
    
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'REQUEST_THEME' }, '*');
    }

    return () => window.removeEventListener('message', handleThemeMessage);
  }, []);

  // Apply dark class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  // Load data from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
      const parsedData: Acronym[] = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Determine "Featured Term" based on the current date
  const featuredTerm = useMemo(() => {
    const today = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % INITIAL_ACRONYMS.length;
    return INITIAL_ACRONYMS[index];
  }, []);

  // Filter Logic
  const activeResult = useMemo(() => {
    if (!query) return null;
    return data.find(item => item.term.toUpperCase() === query.toUpperCase());
  }, [query, data]);

  const handleGeminiLookup = useCallback(async () => {
    if (!query || activeResult) return;

    setIsLoading(true);
    setAiError(null);
    setMissingKeyError(false);

    const result = await lookupAcronymWithGemini(query);

    if (result && 'error' in result && result.error === 'MISSING_KEY') {
      setMissingKeyError(true);
      setIsLoading(false);
      return;
    }

    const aiResult = result as AiResponseSchema | null;

    if (aiResult && aiResult.isRelevant) {
      const newAcronym: Acronym = {
        id: query.toLowerCase(),
        term: query.toUpperCase(),
        expansion: aiResult.expansion,
        definition: aiResult.definition,
        category: aiResult.category,
        votes: 0, 
        source: 'ai'
      };

      setData(prev => {
        if (prev.find(p => p.id === newAcronym.id)) return prev;
        return [...prev, newAcronym];
      });
      
    } else {
      setAiError(`Could not find a relevant definition for "${query}" in Media, Marketing, or Finance.`);
    }

    setIsLoading(false);
  }, [query, activeResult]);

  // Auto-lookup effect with debounce
  useEffect(() => {
    if (query && !activeResult && !aiError && !missingKeyError) {
      const timer = setTimeout(() => {
        handleGeminiLookup();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [query, activeResult, aiError, missingKeyError, handleGeminiLookup]);


  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-4 w-full max-w-[460px] mx-auto min-h-screen">
      
      {/* Signature Header */}
      <div className="w-full mb-8 relative z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/10 dark:shadow-blue-500/20 mb-5 text-white transform -rotate-6 flex items-center justify-center hover:scale-105 duration-300 transition-transform">
           <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Acronym Decoder
        </h1>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 max-w-[420px] font-normal leading-relaxed">
          Demystifying Ad Tech, Marketing, and Finance jargon.
        </p>
      </div>

      {/* Main Toolbox Card */}
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-200 dark:border-zinc-800 p-6 transition-colors duration-300">
        <SearchInput 
          value={query}
          onChange={(val) => {
            setQuery(val);
            setAiError(null);
            setMissingKeyError(false);
          }}
          onClear={() => {
            setQuery('');
            setAiError(null);
            setMissingKeyError(false);
          }}
          onEnter={handleGeminiLookup}
          isLoading={isLoading}
        />

        {/* Content Area */}
        <div className="mt-6">
          {activeResult ? (
            <ResultCard 
              acronym={activeResult} 
            />
          ) : (query && !aiError && !missingKeyError) || isLoading ? (
            <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 p-8 text-center transition-colors duration-300">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-500 mx-auto mb-3"></div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                {isLoading ? "Consulting Gemini 3 Pro..." : "Searching..."}
              </p>
            </div>
          ) : query && missingKeyError ? (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 text-center transition-colors duration-300">
              <div className="flex justify-center mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1">API Key Missing</h3>
              <p className="text-[13px] text-amber-700 dark:text-amber-300">
                Please configure <code>API_KEY</code>.
              </p>
            </div>
          ) : aiError ? (
             <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 text-center text-[13px] transition-colors duration-300">
                {aiError}
             </div>
          ) : (
            <FeaturedTerm 
              acronym={featuredTerm} 
              onSelect={(term) => setQuery(term)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
