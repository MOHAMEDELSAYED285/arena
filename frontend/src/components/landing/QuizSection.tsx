import React from 'react';
import { motion } from 'framer-motion';
import QuizForm from '@/components/quiz/QuizForm';

interface QuizSectionProps {
  onClose: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onClose }) => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <QuizForm onClose={onClose} />
    </div>
  );
};

export default QuizSection;