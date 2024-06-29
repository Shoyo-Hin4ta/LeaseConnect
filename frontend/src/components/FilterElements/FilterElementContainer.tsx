import React, { ReactNode } from 'react'

const FilterElementContainer = ({children}:{children : ReactNode}) => {
  return (
    <div className='my-2 flex flex-col gap-2 w-[90%]'>
        {children}
    </div>
  )
}

export default FilterElementContainer