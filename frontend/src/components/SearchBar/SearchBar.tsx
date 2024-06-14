import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import Sidebar from "../ui/Sidebar/Sidebar";



const SearchBar = () => {
  return (
    <div className="bg-pink-400 flex  items-center relative">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      
      <div className="flex items-center p-2 w-[80%]">
        <Search />
        <Input type="text" placeholder="search" />
      </div>
      
    </div>
  )
}

export default SearchBar 