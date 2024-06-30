import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Menu } from 'lucide-react';
import Sidebar from "../ui/Sidebar/Sidebar";
import { Button } from '../ui/button';

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md">
      <Sidebar isActive={isActive} toggleSidebar={toggleSidebar} />
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" onClick={toggleSidebar} className="mr-2">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1 flex items-center max-w-2xl mx-auto">
          <Input 
            type="text" 
            placeholder="Search" 
            className="flex-1 mr-2"
          />
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;