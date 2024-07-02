import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from './data';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  users: UserData[];
  selectedUser: UserData;
  onSelectUser: (user: UserData) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, selectedUser, onSelectUser, isOpen, onClose }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed top-0 left-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold dark:text-white">Chats</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ChevronLeft className="h-6 w-6 dark:text-gray-300" />
            </Button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {users.map((user) => (
              <motion.button
                key={user.id}
                className={cn(
                  "w-full p-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200",
                  selectedUser.id === user.id && "bg-gray-100 dark:bg-gray-700"
                )}
                onClick={() => onSelectUser(user)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.avatar} alt={user.name} />
                  </Avatar>
                  {user.isOnline && (
                    <motion.div 
                      className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                    />
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.messages?.[user.messages.length - 1]?.content}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;