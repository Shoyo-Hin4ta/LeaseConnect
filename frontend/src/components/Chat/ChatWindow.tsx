import React, { useRef, useEffect } from 'react';
import { UserData, Message } from './data';
import { Avatar, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

interface ChatWindowProps {
  messages: Message[];
  currentUser: UserData;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex mb-4",
            message.sender === currentUser.name ? "justify-end" : "justify-start"
          )}
        >
          {message.sender !== currentUser.name && (
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            </Avatar>
          )}
          <div
            className={cn(
              "px-4 py-2 rounded-lg max-w-[70%]",
              message.sender === currentUser.name
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;