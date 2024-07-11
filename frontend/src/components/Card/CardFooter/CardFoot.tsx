import { CardFooter } from "@/components/ui/card"
import CardButton from "../CardButton/CardButton"
import { useNavigate } from "react-router-dom"
import ConfirmationPopup from "@/components/Popups/Popup"
import { useState } from "react"
import { MapPin, DollarSign, List, IndianRupee } from "lucide-react"
import { formatValue } from "@/lib/utils"
// import { Listing } from "../../../types/Listing"

interface CardFootProps {
  listing: any;
  isMyListings?: boolean;
}

const CardFoot = ({ listing, isMyListings = false }: CardFootProps) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleConfirm = () => {
    console.log('Action confirmed');
    setIsPopupOpen(false);
  };

  const { location, amount, currency, preferences, timePeriod } = listing;

  return (
    <CardFooter className="flex flex-col p-4">
      <div className="w-full mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <MapPin size={16} className="mr-1" />
              {location.streetAddress}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {location.city}, {location.state}, {location.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-violet-600 dark:text-violet-400 flex items-center justify-end">
              <DollarSign size={16} className="mr-1" />
              {amount} {formatValue(currency)} / {formatValue(timePeriod)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate flex items-center">
          <List size={16} className="mr-1" />
          {preferences.map((pref:string) => formatValue(pref)).join(', ')}
          </p>
      </div>
      <div className="w-full flex justify-end">
        {isMyListings ? (
          <div className="space-x-2">
            <CardButton 
              ButtonText="Edit" 
              onClick={() => navigate(`/editlisting/${listing.id}`)} 
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
          <div className="space-x-2">
            <CardButton 
              ButtonText="View" 
              onClick={() => navigate(`/listing/${listing.id}`)} 
              variant="default" 
              size="sm"
              className="border border-violet-300 bg-white text-purple-600 hover:bg-violet-50 dark:border-violet-700 dark:bg-gray-800 dark:text-violet-400 dark:hover:bg-gray-700 transition-colors"
            />
            <CardButton 
              ButtonText="Chat" 
              onClick={() => navigate('/messages')} 
              variant="default" 
              size="sm"
              className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 transition-colors"
            />    
          </div>    
        )}
      </div>
    </CardFooter>
  )
}

export default CardFoot