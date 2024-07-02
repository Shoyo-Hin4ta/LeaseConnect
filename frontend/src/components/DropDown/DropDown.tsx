import React, { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../Popups/Popup';

const DropDown = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    // Perform logout action here
    console.log('Logout confirmed');
    setIsPopupOpen(false);
    
    // Use a timeout to ensure state updates before navigation
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  }, [navigate]);

  const handleLogoutClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsPopupOpen(true);
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu size={24} className="text-gray-600 dark:text-white" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-50" align='end'>
        <DropdownMenuLabel className="text-center font-semibold">Account Details</DropdownMenuLabel>
            
            <DropdownMenuGroup className='lg:hidden'>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/listingform">Add Listing</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>

            <DropdownMenuGroup className='lg:hidden'>
              <DropdownMenuItem asChild>
                <Link to="/favorites">Favorites</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/mylistings">My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profilepage">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogoutClick}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>

      {isPopupOpen && (
        <ConfirmationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onConfirm={handleConfirm}
          title="Logging Out!"
          message="Are you sure you want to logout?"
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </>
  );
};

export default DropDown;