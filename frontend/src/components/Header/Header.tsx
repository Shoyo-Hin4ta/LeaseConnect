import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, CirclePlus, Menu } from 'lucide-react';
import DropDown from '../DropDown/DropDown';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="w-full bg-white shadow-md py-4 px-4 md:px-6 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-indigo-600 dark:text-white">LeaseConnect</span>
        </Link>

        <nav className="flex items-center space-x-2 md:space-x-6">
          {isLoggedIn ? (
            <>
              {/* Mobile and Tablet View */}
              <div className="flex items-center md:hidden">
                <Button variant="ghost" size="icon" className="mr-2 text-gray-600 dark:text-gray-300">
                  <MessageSquare size={20} className="mt-[0.125rem]" />
                </Button>
                <DropDown />
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="/listingform" className="flex items-center space-x-1">
                    <CirclePlus size={18} />
                    <span>Add Listing</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="/messages">
                    <MessageSquare size={18} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Heart size={18} />
                </Button>
                <DropDown />
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden md:flex text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden md:flex text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Link to="/register">Register</Link>
              </Button>
              <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white hidden md:flex" asChild>
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