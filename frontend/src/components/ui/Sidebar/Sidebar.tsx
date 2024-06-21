import React, { useState } from 'react'

const Sidebar = ({isActive, setIsActive, toggleSidebar}: {
    isActive : boolean,
    setIsActive : React.Dispatch<React.SetStateAction<boolean>>,
    toggleSidebar : ()=> void 
} ) => {

    // const [isActive1, setIsActive1] = useState< boolean >(true);

    // const toogleSidebar = () => {
    //     setIsActive1(!isActive1);
    // }

    return (
        
        <div className = {`absolute  h-full transition-all duration-300 ease-in-out  ${isActive ? 'bg-gray-400 w-full overflow-hidden' : 'bg-white w-0' }`}>

                    {/* <div 
                        className={`flex cursor-pointer transition-opacity duration-300 ease-in-out ${isActive ? 'justify-end' : 'justify-start'}`}
                        onClick={toogleSidebar}
                    >
                        Sidebar
                    </div> */}
                    <div 
                        className={`p-2 transition-opacity duration-300 ease-in-out ${isActive ? 'flex flex-col items-center' : 'hidden'}`}>
                            <div className='ml-auto' onClick={toggleSidebar}>Sidebar</div>
                            <div>Filter </div>
                            <div>Items 1</div>
                    </div>
              
        </div>
    ) 
}

export default Sidebar