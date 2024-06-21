import { LOGO_URL } from '@/lib/constant'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useState } from 'react';
import LoggedInHeader from './LoggedInHeader';

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState <boolean>(true);
  return (
    <div className='w-screen justify-between items-center flex h-20 dark:bg-gray-600 dark:text-white bg-gray-200 font-roboto'>
        <div className='h-full font-roboto font-bold flex items-center ml-2'>
          {/* <img src={LOGO_URL} alt="Logo" className='h-full'/> */}
          LeaseConnect.
        </div>
        <div className='flex items-center'>
          {isLoggedIn ? (
            <LoggedInHeader />
          ) : (
            <>
              <Link to='/'><Button variant="link">Home</Button></Link>
              <Link to='/register'><Button variant="link">Register</Button></Link>
              <Link to='/signin'><Button variant="link">SignIn</Button></Link>
            </>
          )
          }
        </div>
    </div>
  )
}

export default Header