import React from 'react';
import Layout from '@/components/shared/Layout';
import QuizForm from '@/components/quiz/QuizForm';


const QuizPage = () => {
  return <QuizForm onClose={() => {}} />; // Add empty onClose handler for standalone page
};

export default QuizPage;