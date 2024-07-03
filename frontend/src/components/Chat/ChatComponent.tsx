import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userData, UserData, Message } from './data';
import ChatTopbar from './ChatTopbar';
import ChatWindow from './ChatWindow';
import ChatBottombar from './ChatBottombar';
import Sidebar from './Sidebar';

const loggedInUser: UserData = {
  id: 5,
  name: 'Jakob Hoeg',
  avatar: '/LoggedInUser.jpg',
  isOnline: true,
};

const ChatComponent: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserData>(userData[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(selectedUser.messages || []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sendMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: loggedInUser.name,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleSelectUser = (user: UserData) => {
    setSelectedUser(user);
    setMessages(user.messages || []);
    setIsSidebarOpen(false);
  };

  return (
    <motion.div 
      className=" flex h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 container mx-auto px-2 sm:px-4 lg:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Sidebar
        users={userData}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <motion.div 
        className="flex flex-col flex-1 overflow-hidden"
        layout
      >
        <ChatTopbar 
          selectedUser={selectedUser} 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <ChatWindow messages={messages} currentUser={loggedInUser} />
        <ChatBottombar sendMessage={sendMessage} />
      </motion.div>
    </motion.div>
  );
};

export default ChatComponent;