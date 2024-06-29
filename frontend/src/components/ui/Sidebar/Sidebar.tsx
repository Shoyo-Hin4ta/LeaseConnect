import React from 'react';
import { X } from 'lucide-react';
import Filter from '../../FilterElements/Filter';

const Sidebar = ({isActive, toggleSidebar}: {
    isActive : boolean,
    toggleSidebar : ()=> void 
} ) => {


    return (
        <div
          className={`overflow-y-auto absolute h-full transition-all duration-300 ease-in-out z-50
                      ${isActive ? 'bg-gray-400 w-full overflow-hidden' : 'bg-white w-0'}`}
        >
          <div
            className={`p-2 transition-opacity duration-300 ease-in-out ${
              isActive ? 'flex flex-col items-center justify-center' : 'hidden'
            }`}
          >
            <div className='absolute right-5 top-8 ml-auto flex items-center text-sm'>
              <X size={20} className="cursor-pointer" onClick={toggleSidebar} /> {/* Close Icon */}
            </div>
            {/* Filter items will go in here */}
            <Filter />
          </div>
        </div>
      );
}

export default Sidebar