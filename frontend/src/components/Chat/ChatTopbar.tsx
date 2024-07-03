import React from 'react';
import { motion } from 'framer-motion';
import { UserData } from './data';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ChevronRight, Phone, Video, Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatTopbarProps {
  selectedUser: UserData;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const ChatTopbar: React.FC<ChatTopbarProps> = ({ selectedUser, isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      className="h-16 min-h-[64px] border-b dark:border-gray-700 flex items-center px-4 bg-white dark:bg-gray-800"
      layout
    >
      <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
        <X className="h-6 w-6 dark:text-gray-300" />
      </Button>
      {!isSidebarOpen && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <ChevronRight className="h-6 w-6 dark:text-gray-300" />
        </Button>
      )}
      <Avatar className="h-10 w-10">
        <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
      </Avatar>
      <div className="ml-3 flex-1">
        <h2 className="text-sm font-semibold dark:text-white">{selectedUser.name}</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {selectedUser.isOnline ? 'Online' : 'Offline'}
        </p>
      </div>
      <div className="flex">
        <Button variant="ghost" size="icon"><Phone className="h-5 w-5 dark:text-gray-300" /></Button>
        <Button variant="ghost" size="icon"><Video className="h-5 w-5 dark:text-gray-300" /></Button>
        <Button variant="ghost" size="icon"><Info className="h-5 w-5 dark:text-gray-300" /></Button>
      </div>
    </motion.div>
  );
};

export default ChatTopbar;