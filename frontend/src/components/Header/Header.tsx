import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, CirclePlus, User, LogOut, Settings, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DropDown from '../DropDown/DropDown';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  const insideBurgerMenu = () => 
     ( 
      <>
                <Link to="/listingform" className="flex items-center space-x-1 py-2">
                  <CirclePlus size={18} />
                  <span>Add Listing</span>
                </Link>
                <Link to="/favorites" className="flex items-center space-x-1 py-2">
                  <Heart size={18} />
                  <span>Favorites</span>
                </Link>
                <Link to="/messages" className="flex items-center space-x-1 py-2">
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 py-2">
                  <User size={18} />
                  <span>Profile</span>
                </Link>
      </>
    );
  

  const NavItems = () => (
    <>
      {isLoggedIn ? (
        <>

        {/* for big screen */}
          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link to="/listingform" className="flex items-center space-x-1">
              <CirclePlus size={18} />
              <span>Add Listingssad</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Heart size={18} />
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link to="/messages">
              <MessageSquare size={18} />
            </Link>
          </Button>

         

          
        </>
      ) : (
        <>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/register">Register</Link>
          </Button>
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white hidden md:flex" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );

  return (
    <header className="w-full bg-white shadow-md py-4 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* <img src="/logo.svg" alt="LeaseConnect" className="h-8 w-auto" /> */}
          <span className="font-bold text-xl text-indigo-600">LeaseConnect</span>
        </Link>
        
        <nav className="flex items-center space-x-2 md:space-x-6">
          <NavItems />
          {/* <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}> */}
            {/* <Menu size={24} /> */}
            <DropDown />
          {/* </Button> */}
        </nav>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 py-2 bg-gray-100">
          <div className="flex flex-col space-y-2">
            {isLoggedIn ? (
              <>
                {insideBurgerMenu()}
              </>
            ) : (
              <>
                <Link to="/" className="py-2">Home</Link>
                <Link to="/register" className="py-2">Register</Link>
                <Link to="/signin" className="py-2">Sign In</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;