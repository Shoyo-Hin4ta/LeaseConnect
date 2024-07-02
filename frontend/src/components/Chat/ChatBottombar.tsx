import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SendHorizontal, PlusCircle } from 'lucide-react';

interface ChatBottombarProps {
  sendMessage: (content: string) => void;
}

const ChatBottombar: React.FC<ChatBottombarProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <motion.div 
      className="h-16 min-h-[64px] border-t dark:border-gray-700 p-4 flex items-center bg-white dark:bg-gray-800"
      layout
    >
      <Button variant="ghost" size="icon">
        <PlusCircle className="h-6 w-6 dark:text-gray-300" />
      </Button>
      <Input
        className="flex-1 mx-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button variant="ghost" size="icon" onClick={handleSend}>
        <SendHorizontal className="h-6 w-6 dark:text-gray-300" />
      </Button>
    </motion.div>
  );
};

export default ChatBottombar;