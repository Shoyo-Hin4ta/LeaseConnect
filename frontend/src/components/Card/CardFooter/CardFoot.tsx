import { CardFooter } from "@/components/ui/card"
import CardButton from "../CardButton/CardButton"
import { useNavigate } from "react-router-dom"

const CardFoot = ({isMyListings = false} : {
  isMyListings? : boolean
}) => {
  const navigate = useNavigate();

  return (
    <CardFooter className="flex flex-col p-4">
      <div className="w-full mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Address</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">State, Country</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-violet-600 dark:text-violet-400">Price</p>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">Features</p>
      </div>
      <div className="w-full flex justify-end">
        {isMyListings ? (
          <div className="space-x-2">
            <CardButton 
                ButtonText="Edit" 
                onClick={() => navigate('/editlisting')} 
                variant="default" 
                size="sm"
              />
              <CardButton 
                ButtonText="Remove Listing" 
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
              />
          </div>
        ) : (
              <CardButton 
                ButtonText="Chat" 
                onClick={() => navigate('/editlisting')} 
                variant="default" 
                size="sm"
              />        
            )}
      </div>
    </CardFooter>
  )
}

export default CardFoot