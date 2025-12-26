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
    // Simple hash function to pick a term based on the date string
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
    // Double check conditions before firing API
    if (!query || activeResult) return;

    setIsLoading(true);
    setAiError(null);
    setMissingKeyError(false);

    const result = await lookupAcronymWithGemini(query);

    // Handle missing key specifically
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
    // If we have a query, no local result, and no current error, wait then fetch
    if (query && !activeResult && !aiError && !missingKeyError) {
      const timer = setTimeout(() => {
        handleGeminiLookup();
      }, 1000); // 1 second debounce to let user finish typing

      return () => clearTimeout(timer);
    }
  }, [query, activeResult, aiError, missingKeyError, handleGeminiLookup]);


  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-4 w-full max-w-[460px] mx-auto min-h-screen">
      
      {/* Signature Header (The "Tilted Sticker") - Centered */}
      <div className="w-full mb-8 relative z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/10 mb-5 text-white transform -rotate-6 flex items-center justify-center hover:scale-105 duration-300 transition-transform">
           <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Acronym Decoder
        </h1>
        <p className="text-[13px] text-gray-500 max-w-[420px] font-normal leading-relaxed">
          Demystifying Ad Tech, Marketing, and Finance jargon.
        </p>
      </div>

      {/* Main Toolbox Card */}
      <div className="w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 p-6">
        <SearchInput 
          value={query}
          onChange={(val) => {
            setQuery(val);
            // Only clear errors if the query actually changes significantly, 
            // but here we clear on any change to allow retry
            setAiError(null);
            setMissingKeyError(false);
          }}
          onClear={() => {
            setQuery('');
            setAiError(null);
            setMissingKeyError(false);
          }}
          onEnter={handleGeminiLookup} // Keep Enter for immediate lookup
          isLoading={isLoading}
        />

        {/* Content Area */}
        <div className="mt-6">
          {activeResult ? (
            <ResultCard 
              acronym={activeResult} 
            />
          ) : (query && !aiError && !missingKeyError) || isLoading ? (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                {isLoading ? "Consulting Gemini 3 Pro..." : "Searching..."}
              </p>
            </div>
          ) : query && missingKeyError ? (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 text-center">
              <div className="flex justify-center mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-sm font-bold text-amber-900 mb-1">API Key Missing</h3>
              <p className="text-[13px] text-amber-700">
                Please configure <code>API_KEY</code>.
              </p>
            </div>
          ) : aiError ? (
             <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-500 text-center text-[13px]">
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