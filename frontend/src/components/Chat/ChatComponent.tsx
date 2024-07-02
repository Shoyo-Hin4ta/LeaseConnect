import React, { useState } from 'react';
import { userData, UserData } from './data';
import ChatTopbar from './chat-topbar';
import ChatWindow from './ChatWindow';
import ChatBottombar from './chat-bottombar';
import Sidebar from './sidebar';


interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
} 

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
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] mt-14 bg-white dark:bg-gray-900">
      <Sidebar
        users={userData}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <div className="flex flex-col flex-1">
        <ChatTopbar 
          selectedUser={selectedUser} 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <ChatWindow messages={messages} currentUser={loggedInUser} />
        <ChatBottombar sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;