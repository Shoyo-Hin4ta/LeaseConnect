import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, CirclePlus, Sun, Moon } from 'lucide-react';
import DropDown from '../DropDown/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/appstore/themeSlice';
import { clearUser, getIsAuthenticated, setUser } from '@/appstore/userSlice';
import { CURRENT_USER_QUERY } from '@/lib/queries';
import { useQuery } from '@apollo/client';



const Header = ({ theme }: { theme: "light" | "dark" }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  });

  useEffect(() => {
    if (!loading) {
      if (data?.getCurrentUser) {
        dispatch(setUser(data.getCurrentUser));
      } else if (!error) {
        dispatch(clearUser());
      }
    }
  }, [loading, data, error, dispatch]);
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // useEffect(() => {
  //   if (user) {
  //     // console.log(user);
  //   }
  // }, [user]);

  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
      className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800"
    >
      {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 z-50 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-violet-600 dark:text-violet-400">LeaseConnect</span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4">
        {isAuthenticated ? (
            <>
              {/* Mobile View */}
              <div className="flex items-center md:hidden">
                <ThemeToggle />
                {/* <Button variant="ghost" size="icon" asChild className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Link to="/messages">
                    <MessageSquare size={20} />
                  </Link>
                </Button> */}
                <DropDown />
              </div>
              {/* Tablet View */}
              <div className="hidden md:flex lg:hidden items-center">
                <ThemeToggle />
                  {/* <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                    <Link to="/messages">
                      <MessageSquare size={20} />
                    </Link>                
                  </Button> */}
                <DropDown />
              </div>
              {/* Desktop View */}
              <div className="hidden lg:flex items-center space-x-4">
                <ThemeToggle />
                <Button variant="ghost" size="sm" asChild className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Link to="/listingform" className="flex items-center space-x-1">
                    <CirclePlus size={18} />
                    <span>Add Listing</span>
                  </Link>
                </Button>
                {/* <Button variant="ghost" size="sm" asChild className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Link to="/messages" className="flex items-center space-x-1">
                    <MessageSquare size={18} />
                    <span>Messages</span>
                  </Link>
                </Button> */}
                <Button variant="ghost" size="sm" asChild className="text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                  <Link to="/favourites" className="flex items-center space-x-1">
                    <Heart size={18} />
                    <span>Favourites</span>
                  </Link>
                </Button>
                <DropDown />
              </div>
            </>) : (
            <>
              <ThemeToggle />
              <Button variant="ghost" asChild className="hidden lg:flex text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden lg:flex text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-800">
                <Link to="/register">Register</Link>
              </Button>
              <Button variant="default" className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
      </nav>
    </div>
  </header>
  );
};

export default Header;
