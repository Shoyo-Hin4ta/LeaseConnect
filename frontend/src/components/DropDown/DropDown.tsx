import React, { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../Popups/Popup';

const DropDown = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    console.log('Logout confirmed');
    // Perform logout action here
    setIsPopupOpen(false);
    // Navigate to home page or login page after logout
    navigate('/');
  }, [navigate]);

  const handleLogoutClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPopupOpen(true);
  }, []);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center rounded-full hover:bg-violet-100 dark:hover:bg-gray-700 p-2">
            <Menu size={24} className=" dark:text-gray-300" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-50 bg-white dark:bg-gray-800 text-violet-800 dark:text-gray-300 border border-violet-200 dark:border-gray-700 shadow-lg" align='end'>
          <DropdownMenuLabel className="text-center font-semibold">
            Account Details
          </DropdownMenuLabel>
          
          <DropdownMenuGroup className='lg:hidden'>
            <DropdownMenuSeparator className="bg-violet-200 dark:bg-gray-700" />
            <DropdownMenuItem asChild className="hover:bg-violet-50 dark:hover:bg-gray-700">
              <Link to="/listingForm">Add Listing</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup className='lg:hidden'>
            <DropdownMenuItem asChild className="hover:bg-violet-50 dark:hover:bg-gray-700">
              <Link to="/favourites">Favourites</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="hover:bg-violet-50 dark:hover:bg-gray-700">
              <Link to="/mylistings">My Listings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-violet-50 dark:hover:bg-gray-700">
              <Link to="/profilepage">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator className="bg-violet-200 dark:bg-gray-700" />

          <DropdownMenuItem 
            asChild
            className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
          >
            <div onClick={handleLogoutClick}>Logout</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ConfirmationPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onConfirm={handleConfirm}
            title="Logging Out!"
            message="Are you sure you want to logout?"
            confirmText="Yes"
            cancelText="No"
          />
        </div>
      )}
    </div>
  );
};

export default DropDown;