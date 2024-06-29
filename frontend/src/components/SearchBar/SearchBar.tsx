import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Menu } from 'lucide-react'; // Menu icon for sidebar
import Sidebar from "../ui/Sidebar/Sidebar";
import { Button } from '../ui/button';

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <Sidebar isActive={isActive} toggleSidebar={toggleSidebar} />
      <div className="bg-pink-400 flex items-center justify-around h-18">
        <div onClick={toggleSidebar} className="ml-2 cursor-pointer">
          <Menu /> {/* Sidebar Open Icon */}
        </div>

        <div className="flex items-center p-2 w-[80%] h-[90%]">
          <Search size={35} className='mr-2'/>
          <Input type="text" placeholder="Search" />
          <Button className="bg-blue-500 text-white p-2 text-sm rounded ml-2">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
