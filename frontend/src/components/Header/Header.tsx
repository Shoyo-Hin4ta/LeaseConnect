import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, CirclePlus, Menu } from 'lucide-react';
import DropDown from '../DropDown/DropDown';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-violet-600 dark:text-violet-400">LeaseConnect</span>
        </Link>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          {isLoggedIn ? (
            <>
              {/* Mobile and Tablet View */}
              <div className="flex items-center sm:hidden">
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <MessageSquare size={20} />
                </Button>
                <DropDown />
              </div>

              {/* Desktop View */}
              <div className="hidden sm:flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Link to="/listingform" className="flex items-center space-x-1">
                    <CirclePlus size={18} />
                    <span>Add Listing</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Link to="/messages">
                    <MessageSquare size={18} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Heart size={18} />
                </Button>
                <DropDown />
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:flex text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden sm:flex text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                <Link to="/register">Register</Link>
              </Button>
              <Button variant="default" className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;