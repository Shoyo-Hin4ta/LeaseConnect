import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../Layout';
import { tabs } from '@/lib/utils';

const SearchBar = ({handleTabChange, activeTab, isFilterPage=false} : {
  handleTabChange? : (tab:string) => void,
  activeTab? : string,
  isFilterPage? : boolean,
}) => {
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
          {isFilterPage ? (<></>) : (
            <div className="text-xs grid grid-cols-4 gap-4 md:flex md:flex-wrap md:gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => handleTabChange(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600'
                    : 'bg-white text-violet-600 hover:bg-violet-100 dark:bg-gray-800 dark:text-violet-300 dark:hover:bg-gray-700'
                } transition-colors duration-200`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;