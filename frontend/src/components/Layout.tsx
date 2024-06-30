import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from './ui/toaster'

const Layout = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-x-hidden'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}

export default Layout