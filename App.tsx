import React, { useState, useEffect, useMemo } from 'react';
import { Acronym, AcronymSubmission } from './types';
import { INITIAL_ACRONYMS } from './constants';
import { lookupAcronymWithGemini } from './services/geminiService';
import { SearchInput } from './components/SearchInput';
import { ResultCard } from './components/ResultCard';
import { FeaturedTerm } from './components/FeaturedTerm';
import { SubmissionModal } from './components/SubmissionModal';
import { BookOpen, PlusCircle, CheckCircle2 } from 'lucide-react';

// Keys for localStorage
const STORAGE_KEY = 'adtech_acronym_data_v2'; 
const SUBMISSIONS_KEY = 'adtech_submissions_v2';

export default function App() {
  const [data, setData] = useState<Acronym[]>(INITIAL_ACRONYMS);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
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

    const result = await lookupAcronymWithGemini(query);

    if (result && result.isRelevant) {
      const newAcronym: Acronym = {
        id: query.toLowerCase(),
        term: query.toUpperCase(),
        expansion: result.expansion,
        definition: result.definition,
        category: result.category,
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Toast Notification */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${showSuccessToast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Submission Received</h4>
            <p className="text-xs text-slate-500">Thanks! We'll review your term shortly.</p>
          </div>
        </div>
      </div>

      {/* Professional Header */}
      <div className="w-full max-w-2xl mb-10 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
             <BookOpen className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Media Dictionary
        </h1>
        <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed">
          Demystifying industry jargon, one acronym at a time.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl">
        <SearchInput 
          value={query}
          onChange={(val) => {
            setQuery(val);
            setAiError(null);
          }}
          onClear={() => {
            setQuery('');
            setAiError(null);
          }}
          onEnter={handleGeminiLookup}
          isLoading={isLoading}
        />

        {/* Content Area */}
        <div className="mt-8 mb-16">
          {isLoading ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Consulting dictionary...</p>
            </div>
          ) : activeResult ? (
            <ResultCard 
              acronym={activeResult} 
            />
          ) : query && !aiError ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
               <p className="text-slate-600 mb-6">
                 Term not found in local database.
               </p>
               <button 
                onClick={handleGeminiLookup}
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
               >
                 Ask AI to Define "{query}"
               </button>
            </div>
          ) : aiError ? (
             <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-center text-sm font-medium">
                {aiError}
             </div>
          ) : (
            <>
              <FeaturedTerm 
                acronym={featuredTerm} 
                onSelect={(term) => setQuery(term)}
              />
              
              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm mb-3">
                  Can't find a term? Help us improve the dictionary.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit a New Term</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-slate-200 w-full max-w-2xl text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Media Dictionary.</p>
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