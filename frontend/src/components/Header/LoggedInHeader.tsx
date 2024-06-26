import React from 'react'
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import DropDown from '../DropDown/DropDown';


const LoggedInHeader = () => {
  return (
    <>
    
        <Button variant="link" size="sm"> 
            <Link to="/listingform" className='flex items-center justify-center'> 
                <span className='mr-1' >Add Listing</span> <CirclePlus size={15}/>
            </Link>
        </Button>
   
    
    <div className='flex gap-4 mr-2'>
        <Heart size={18}/> 
        <Link to="/messages"><MessageSquare size={18}/></Link>
        <DropDown />
    </div>
    </>
  )
}

export default LoggedInHeader