import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from './ui/toaster'
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/appstore/appStore';
import { setTheme } from '@/appstore/themeSlice';

export type LayoutContextType = {
  toggleSidebar: () => void;
};

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.value);

  

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        dispatch(setTheme(e.newValue as 'light' | 'dark'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentTheme, dispatch]);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const contextValue: LayoutContextType = { toggleSidebar };

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