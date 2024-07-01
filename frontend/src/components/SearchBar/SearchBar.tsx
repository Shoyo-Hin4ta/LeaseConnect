import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../Layout';

const SearchBar = () => {
  const { toggleSidebar } = useOutletContext<LayoutContextType>();

  return (
    <div className="sticky top-14 z-40 bg-white dark:bg-gray-800 shadow-md">
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