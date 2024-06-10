import React, { useState } from 'react'

const Sidebar = () => {

    const [isActive, setIsActive] = useState< boolean >(false);

    const toogleSidebar = () => {
        setIsActive(!isActive);
    }

    return (
        <div className = {`absolute h-full transition-all duration-300 ease-in-out ${isActive ? 'bg-gray-400 w-full' : 'bg-white w-0' }`}>

                    <div 
                        className={`flex cursor-pointer ${isActive ? 'justify-end' : 'justify-start'}`}
                        onClick={toogleSidebar}
                    >
                        Sidebar
                    </div>
                    <div 
                        className={`p-2 transition-opacity duration-300 ease-in-out ${isActive ? 'flex flex-col items-center' : 'hidden'}`}>
                            <div>Filter </div>
                            <div>Items 1</div>
                    </div>
              
        </div>
    ) 
}

export default Sidebar