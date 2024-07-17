import { motion } from 'framer-motion';
import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-violet-600 dark:text-violet-400 flex items-center">
          <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
          <span className="ml-2">Welcome to LeaseConnect!</span>
        </h2>
        <p className="text-lg mb-4 dark:text-white">
          I'm Ritik, the creator of LeaseConnect. Our platform allows you to:
        </p>
        <ul className="list-disc list-inside mb-4 dark:text-white">
          <li>Post listings for days or weeks</li>
          <li>Price your listings as you like</li>
          <li>Connect with potential tenants easily</li>
        </ul>
        <p className="text-lg mb-4 dark:text-white">
          Do you know someone looking to lease out a space? Encourage them to list on LeaseConnect! 
          Together, we can build a great community of leasers and tenants.
        </p>
        <button
          onClick={onClose}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-500 transition duration-300"
        >
          Got it, thanks!
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Popup;