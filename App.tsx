import React, { useState, useEffect, useMemo } from 'react';
import { Acronym, AcronymSubmission, AiResponseSchema } from './types';
import { INITIAL_ACRONYMS } from './constants';
import { lookupAcronymWithGemini } from './services/geminiService';
import { SearchInput } from './components/SearchInput';
import { ResultCard } from './components/ResultCard';
import { FeaturedTerm } from './components/FeaturedTerm';
import { SubmissionModal } from './components/SubmissionModal';
import { BookOpen, PlusCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

// Keys for localStorage
const STORAGE_KEY = 'adtech_acronym_data_v2'; 
const SUBMISSIONS_KEY = 'adtech_submissions_v2';

export default function App() {
  const [data, setData] = useState<Acronym[]>(INITIAL_ACRONYMS);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [missingKeyError, setMissingKeyError] = useState(false);
  
  // Submission State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

  const handleGeminiLookup = async () => {
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
  };

  const handleSubmitTerm = (submission: AcronymSubmission) => {
    // Save to local storage
    const existingSubmissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
    const updatedSubmissions = [...existingSubmissions, submission];
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updatedSubmissions));

    // Close modal
    setIsModalOpen(false);
    
    // Show success feedback
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-4 w-full max-w-[460px] mx-auto min-h-screen">
      
      {/* Toast Notification */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${showSuccessToast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="bg-white border border-green-200 rounded-2xl shadow-lg p-4 flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div>
            <h4 className="text-sm font-bold text-gray-900">Submitted</h4>
          </div>
        </div>
      </div>

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
          {isLoading ? (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Searching...</p>
            </div>
          ) : activeResult ? (
            <ResultCard 
              acronym={activeResult} 
            />
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
          ) : query && !aiError ? (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
               <p className="text-gray-500 text-sm mb-4">
                 Term not in local library.
               </p>
               <button 
                onClick={handleGeminiLookup}
                className="px-2.5 py-1.5 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg text-gray-600 shadow-sm hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all"
               >
                 Ask AI to Define "{query}"
               </button>
            </div>
          ) : aiError ? (
             <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-500 text-center text-[13px]">
                {aiError}
             </div>
          ) : (
            <>
              <FeaturedTerm 
                acronym={featuredTerm} 
                onSelect={(term) => setQuery(term)}
              />
              
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-2.5 py-1.5 text-[11px] font-semibold bg-white border border-gray-200 rounded-lg text-gray-600 shadow-sm hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>Submit New Term</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">v1.0.3 • Local & AI Powered</p>
      </div>

      {/* Submission Modal */}
      <SubmissionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTerm}
      />
    </div>
  );
}