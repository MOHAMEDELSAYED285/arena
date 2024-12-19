import React from 'react';
import Layout from '@/components/shared/Layout';
import QuizForm from '@/components/quiz/QuizForm';

const QuizPage = () => {
  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl font-oswald font-bold text-center mb-8">
          Find Your Perfect Session
        </h1>
        <QuizForm />
      </div>
    </Layout>
  );
};

export default QuizPage;