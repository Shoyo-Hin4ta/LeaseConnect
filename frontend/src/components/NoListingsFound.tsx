import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const NoListingsFound = ({ message, ctaText, ctaLink } : {
    message : string,
    ctaText : string,
    ctaLink : string
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 dark:bg-gray-900 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-9xl mb-8"
        variants={itemVariants}
      >
        🏠
      </motion.div>
      <motion.h2 
        className="text-3xl font-bold text-violet-800 dark:text-violet-300 mb-4 text-center"
        variants={itemVariants}
      >
        No Listings Found
      </motion.h2>
      <motion.p 
        className="text-xl text-gray-600 dark:text-gray-400 mb-8 text-center"
        variants={itemVariants}
      >
        {message}
      </motion.p>
      {ctaText && ctaLink && (
        <motion.div variants={itemVariants}>
          <Link to={ctaLink}>
            <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:text-gray-300 dark:hover:bg-violet-600">
              {ctaText}
            </Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NoListingsFound;