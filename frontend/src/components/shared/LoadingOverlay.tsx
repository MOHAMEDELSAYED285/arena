import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingLogo from './LoadingLogo';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const overlayVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1 
  },
  exit: { 
    opacity: 0 
  }
};

const messageVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.4
    }
  }
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = "Loading..." 
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <div className="relative">
            <LoadingLogo size={100} />
            <motion.div
              className="mt-4 text-center"
              variants={messageVariants}
            >
              <p className="text-gray-600">{message}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;