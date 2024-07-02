import React, { useRef, useEffect } from 'react';
import { Message, UserData } from './data';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatListProps {
  messages: Message[];
  selectedUser: UserData;
}

export function ChatList({ messages, selectedUser }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'flex items-end gap-2 mb-4',
              message.name !== selectedUser.name ? 'justify-end' : 'justify-start'
            )}
          >
            {message.name === selectedUser.name && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.avatar} alt={message.name} />
              </Avatar>
            )}
            <div
              className={cn(
                'px-4 py-2 rounded-lg max-w-[70%]',
                message.name !== selectedUser.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              )}
            >
              {message.message}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}