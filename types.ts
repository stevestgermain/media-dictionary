export interface Acronym {
  id: string;
  term: string;
  expansion: string;
  definition: string;
  category?: string;
  votes: number;
  source: 'local' | 'ai';
}

export interface AiResponseSchema {
  expansion: string;
  definition: string;
  category: string;
  isRelevant: boolean;
}

export interface AcronymSubmission {
  term: string;
  expansion: string;
  definition: string;
  timestamp: number;
}