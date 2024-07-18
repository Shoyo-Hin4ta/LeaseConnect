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
import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '@/lib/queries';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/appstore/userSlice';

const DropDown = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_MUTATION);
  const dispatch = useDispatch();
  const client = useApolloClient();
  

  const handleLogoutClick = useCallback(() => {
    setIsPopupOpen(true);
  }, []);
  

  const handleConfirm = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      const response = await logout();
      if (response.data.logout.success) {
        dispatch(clearUser());
        await client.clearStore();
        window.dispatchEvent(new Event('logout'));
        navigate('/', { replace: true });
      } else {
        throw new Error(response.data.logout.message || 'Logout Failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      // toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setIsPopupOpen(false);
    }
  }, [logout, dispatch, navigate, client]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center rounded-full hover:bg-violet-100 dark:hover:bg-gray-700 p-2">
            <Menu size={24} className="dark:text-gray-300" />
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
            onSelect={handleLogoutClick}
            className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleConfirm}
        title="Logging Out!"
        message="Are you sure you want to logout?"
        confirmText="Yes"
        cancelText="No"
      />

      {isLoggingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]" />
      )}
    </>
  );
};

export default DropDown;