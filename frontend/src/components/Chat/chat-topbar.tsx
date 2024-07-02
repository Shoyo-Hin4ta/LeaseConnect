import React from 'react';
import { UserData } from './data';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ChevronRight, Phone, Video, Info } from 'lucide-react';

interface ChatTopbarProps {
  selectedUser: UserData;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const ChatTopbar: React.FC<ChatTopbarProps> = ({ selectedUser, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="h-16 border-b flex items-center ">
      {!isSidebarOpen && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}
      <Avatar className="h-10 w-10">
        <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
      </Avatar>
      <div className="ml-3 flex-1">
        <h2 className="text-sm font-semibold">{selectedUser.name}</h2>
        <p className="text-xs text-gray-500">{selectedUser.isOnline ? 'Online' : 'Offline'}</p>
      </div>
      <div className="flex">
        <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
      </div>
    </div>
  );
};

export default ChatTopbar;