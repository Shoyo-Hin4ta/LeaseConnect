import React from 'react'
import { User } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';


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
        <MessageSquare size={18}/>
        <User size={18} className=''/>
    </div>
    </>
  )
}

export default LoggedInHeader