import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'
// import Footer from './Footer'

const Layout = () => {
  return (
    <div className='h-screen w-screen bg-white dark:bg-black'>
        <Header/>
        <Outlet/>
        {/* <Footer />  */}
    </div>
    
  )
}

export default Layout