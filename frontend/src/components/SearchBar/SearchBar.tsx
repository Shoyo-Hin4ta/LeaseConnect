import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import Sidebar from "../ui/Sidebar/Sidebar";
import { useState } from "react";



const SearchBar = () => {

  const [isActive, setIsActive] = useState< boolean >(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    }

  return (
    <> 
    <Sidebar isActive={isActive} setIsActive={setIsActive} toggleSidebar={toggleSidebar}/>
    <div className="bg-pink-400 flex  items-center justify-around">
      {/* <div className="w-[20%] absolute">
        <Sidebar />
      </div> */}
      
      <div onClick={toggleSidebar} className="ml-2">
        Sidebar
      </div>
      
      <div className="flex items-center p-2 w-[80%]">
        <Search />
        <Input type="text" placeholder="search" />
      </div>
      
    </div>
    </>

  )
}

export default SearchBar 