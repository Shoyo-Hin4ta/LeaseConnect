import React from 'react';
import { UserData } from './data';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  users: UserData[];
  selectedUser: UserData;
  onSelectUser: (user: UserData) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, selectedUser, onSelectUser, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="w-80 border-r h-full bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
        <div className="flex">
          
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {users.map((user) => (
          <button
            key={user.id}
            className={cn(
              "w-full p-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700",
              selectedUser.id === user.id && "bg-gray-100 dark:bg-gray-700"
            )}
            onClick={() => onSelectUser(user)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
            </Avatar>
            <div className="text-left">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {user.messages?.[user.messages.length - 1]?.content}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;