import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from './ui/toaster'
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/appstore/appStore';
import { setTheme } from '@/appstore/themeSlice';
import { useQuery } from '@apollo/client';
import { clearUser, setUser, setToken } from '@/appstore/userSlice';
import { CURRENT_USER_QUERY } from '@/lib/queries';
import LoadingScreen from './LoadingAnimation';

export type LayoutContextType = {
  toggleSidebar: () => void;
};

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const currentTheme = useSelector((state: RootState) => state.theme.value);
  const token = useSelector((state: RootState) => state.user.token);

  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error) {
      if (data?.getCurrentUser) {
        dispatch(setUser(data.getCurrentUser));
      } else if (token) {
        dispatch(clearUser());
      }
    }
  }, [loading, error, data, dispatch, token]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        dispatch(setTheme(event.newValue as 'light' | 'dark'));
      } else if (event.key === 'token') {
        if (event.newValue) {
          dispatch(setToken(event.newValue));
        } else {
          dispatch(clearUser());
          navigate('/');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const contextValue: LayoutContextType = { toggleSidebar };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <Sidebar isActive={isActive} toggleSidebar={toggleSidebar} />
      <main className='flex-grow mt-14'>
        <Outlet context={contextValue} />
      </main>
      <Toaster />
    </div>
  )
}

export default Layout;