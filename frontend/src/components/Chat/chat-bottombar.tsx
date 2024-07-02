import React, { useState } from 'react';
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
    <div className="border-t p-4 flex items-center">
      <Button variant="ghost" size="icon">
        <PlusCircle className="h-6 w-6" />
      </Button>
      <Input
        className="flex-1 mx-2"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button variant="ghost" size="icon" onClick={handleSend}>
        <SendHorizontal className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatBottombar;