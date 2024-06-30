import React from 'react';
import { X } from 'lucide-react';
import Filter from '../../FilterElements/Filter';

const Sidebar = ({isActive, toggleSidebar}: {
    isActive : boolean,
    toggleSidebar : ()=> void 
}) => {
    return (
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 min-w-[335px] bg-white dark:bg-gray-800 shadow-lg transform ${
            isActive ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-4">
            <button 
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filters</h2>
            <Filter />
          </div>
        </div>
    );
}

export default Sidebar