import React from 'react';
import { Menu, User } from 'lucide-react';
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
import { Link } from 'react-router-dom';

const DropDown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center rounded-full hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent className="" align='end'>
            <DropdownMenuLabel className="text-center font-semibold">Account Details</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link to="/favorites">
                <DropdownMenuItem >
                  <span>Favorites</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/mylistings">
                <DropdownMenuItem >
                  <span>My Listings</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/profile">
                <DropdownMenuItem >
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem >
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
