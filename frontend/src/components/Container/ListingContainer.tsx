import { ReactNode } from "react"


interface ListingContainerType {
    children : ReactNode,
}

const ListingContainer = ({children} : ListingContainerType) => {
  return (
    <div className="flex items-center justify-center w-screen">
        <div className="flex flex-col justify-center items-center mt-5 border border-red-600 w-[90%]">
            {children}
        </div>
    </div>
  )
}

export default ListingContainer