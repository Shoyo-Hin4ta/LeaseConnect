import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../Layout';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { toggleSidebar } = useOutletContext<LayoutContextType>();

  const handleSearch = async () => {
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue) {
      try {
        // Replace this with your actual API call
        // Handle the search results here
        console.log(trimmedSearchValue);
      } catch (error) {
        // console.error("Error searching:", error);
      }
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="sticky top-14 z-40 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" onClick={toggleSidebar} className="mr-2">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1 flex items-center max-w-2xl mx-auto">
          <div className="flex-1 mr-2 relative">
            <Input 
              type="text" 
              placeholder="Search" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pr-8"
            />
            {searchValue && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleClear} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button 
            className="bg-violet-600 hover:bg-violet-700 text-white"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;