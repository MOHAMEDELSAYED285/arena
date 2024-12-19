import React, { createContext, useContext, useState } from 'react';

interface QuizResponses {
  location: string;
  favouriteSports: string[];
  preferredTime: string;
  maxPrice: number;
}

interface QuizContextType {
  quizResponses: QuizResponses;
  updateQuizResponses: (responses: Partial<QuizResponses>) => void;
  resetQuiz: () => void;
}

const defaultQuizState: QuizResponses = {
  location: '',
  favouriteSports: [],
  preferredTime: '',
  maxPrice: 50
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizResponses, setQuizResponses] = useState<QuizResponses>(defaultQuizState);

  const updateQuizResponses = (responses: Partial<QuizResponses>) => {
    setQuizResponses(prev => ({
      ...prev,
      ...responses
    }));
  };

  const resetQuiz = () => {
    setQuizResponses(defaultQuizState);
  };

  return (
    <QuizContext.Provider value={{ quizResponses, updateQuizResponses, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};