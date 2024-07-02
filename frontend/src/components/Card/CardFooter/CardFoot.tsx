import { CardFooter } from "@/components/ui/card"
import CardButton from "../CardButton/CardButton"
import { useNavigate } from "react-router-dom"
import ConfirmationPopup from "@/components/Popups/Popup"
import { useState } from "react"

const CardFoot = ({isMyListings = false} : {
  isMyListings? : boolean
}) => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);


  const handleConfirm = () => {
    // Handle the confirmation action
    console.log('Action confirmed');
    setIsPopupOpen(false);
  };

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
                onClick={() => setIsPopupOpen(true)} 
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900 bg-slate-50 dark:bg-slate-900"
              />

            <ConfirmationPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={handleConfirm}
                    title="Remove Listing"
                    message="Are you sure you want to remove this listing? This action cannot be undone."
                    confirmText="Yes, Remove"
                    cancelText="Cancel"
                  />
          </div>
        ) : (
              <CardButton 
                ButtonText="Chat" 
                onClick={() => navigate('/messages')} 
                variant="default" 
                size="sm"
              />        
            )}
      </div>
    </CardFooter>
  )
}

export default CardFoot