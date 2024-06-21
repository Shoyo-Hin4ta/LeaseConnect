import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'
// import Footer from './Footer'
import { Toaster } from './ui/toaster'


const Layout = () => {
  return (
    <div className='w-screen h-screen overflow-y-scroll bg-white dark:bg-black'>
        <Header/>
        <Outlet/>
        <Toaster />
        {/* <Footer />  */}
    </div>
    
  )
}

export default Layout