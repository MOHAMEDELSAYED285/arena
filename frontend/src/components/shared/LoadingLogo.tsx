import React from 'react';
import { motion, Variants } from 'framer-motion';

interface LoadingLogoProps {
  size?: number;
  color?: string;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ 
  size = 80, 
  color = "#000000" 
}) => {
  const pathVariants: Variants = {
    initial: {
      pathLength: 0,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const containerVariants: Variants = {
    initial: { 
      scale: 0.8, 
      opacity: 0.5 
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 40 C20 20, 80 20, 80 40 C80 60, 20 60, 20 40"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
      </svg>
    </motion.div>
  );
};

export default LoadingLogo;