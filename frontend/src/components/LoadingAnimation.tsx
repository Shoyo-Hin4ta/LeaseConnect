import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { FaBox, FaKey, FaClipboardList, FaHome } from 'react-icons/fa';

const LoadingScreen = () => {
  const [springProps, setSpring] = useSpring(() => ({
    from: { number: 0 },
    to: { number: 100 },
    config: { duration: 3000 },
  }));

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="text-4xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        LeaseConnect
      </motion.div>

      <div className="flex space-x-8 mb-8">
        {[FaHome, FaBox, FaKey, FaClipboardList].map((Icon, index) => (
          <motion.div
            key={index}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <Icon className="text-white text-4xl" />
          </motion.div>
        ))}
      </div>

      <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3 }}
        />
      </div>

      <animated.div className="text-white text-2xl mt-4">
        {springProps.number.to((n) => `${n.toFixed(0)}%`)}
      </animated.div>

      <motion.div
        className="text-white text-lg mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Finding your perfect sublet...
      </motion.div>
    </div>
  );
};

export default LoadingScreen;