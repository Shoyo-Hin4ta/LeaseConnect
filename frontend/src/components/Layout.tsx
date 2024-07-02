import React, { useState } from 'react';
import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from './ui/toaster'
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { useSelector } from 'react-redux';
import { RootState } from '@/appstore/appStore';

export type LayoutContextType = {
  toggleSidebar: () => void;
};

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const currentTheme = useSelector((cTheme : RootState) => cTheme.theme.value);


  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const contextValue: LayoutContextType = { toggleSidebar };

  return (
    <div className= {`${currentTheme} flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <Header theme={currentTheme}/>
      <Sidebar isActive={isActive} toggleSidebar={toggleSidebar} />
      <main className='flex-grow pt-14'>
        <Outlet context={contextValue} />
      </main>
      <Toaster />
    </div>
  )
}

export default Layout;

