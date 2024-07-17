import { CardFooter } from "@/components/ui/card"
import CardButton from "../CardButton/CardButton"
import { Link, useNavigate } from "react-router-dom"
import ConfirmationPopup from "@/components/Popups/Popup"
import { useState } from "react"
import { MapPin, DollarSign, List, IndianRupee } from "lucide-react"
import { formatValue } from "@/lib/utils"
import { REMOVE_MY_LISTING } from "@/graphql/queries"
// import { Listing } from "../../../types/Listing"
import { useLazyQuery } from '@apollo/client';
import { ListingCardProps } from "../ListingCard"



interface CardFootProps extends ListingCardProps {
  listing: any;
  isMyListings?: boolean;
}

const CardFoot = ({ listing, isMyListings = false, refetch }: CardFootProps) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [removeListing, { loading: removeLoading, error: removeError, data }] = useLazyQuery(REMOVE_MY_LISTING, {
    onCompleted: (data) => {
      setIsPopupOpen(false);
      if (refetch) {
        refetch().then(() => {
          navigate('/myListings');
        });
      } else {
        navigate('/myListings');
      }
    },
    onError: (error) => {
      console.error('Error removing listing:', error);
    }
  });

  const handleConfirm = () => {
    removeListing({ variables: { listingID: listing.id } });
  };

  const { location, amount, currency, preferences, timePeriod } = listing;

  return (
    <CardFooter className="flex flex-col p-4">
      <div className="w-full mb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1 truncate">
            <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center truncate">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{location.streetAddress}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {location.city}, {location.state}, {location.country}
            </p>
          </div>
          <div className="text-right ml-2">
            <p className="text-base font-bold text-violet-600 dark:text-violet-400 flex items-center justify-end">
              <DollarSign size={16} className="mr-1" />
              {amount} {formatValue(currency)} / {formatValue(timePeriod)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mb-2">
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate flex items-center">
          <List size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">{preferences.map((pref:string) => formatValue(pref)).join(', ')}</span>
        </p>
      </div>
      <div className="w-full flex justify-end">
        {isMyListings ? (
          <div className="space-x-2">
            <Link
                to={`/listing/${listing.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 h-9 px-3"
              >
                View
              </Link>
              <CardButton 
                ButtonText="Edit" 
                onClick={() => navigate(`/editlisting/${listing.id}`)} 
                variant="default" 
                size="sm"
                className="bg-slate-100 dark:bg-slate-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900"
              />
              <CardButton 
                ButtonText="Remove Listing" 
                variant="outline" 
                size="sm" 
                onClick={() => setIsPopupOpen(true)} 
                className="bg-slate-100 dark:bg-slate-800 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
              />
            <ConfirmationPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onConfirm={handleConfirm}
              title="Remove Listing"
              message="Are you sure you want to remove this listing? This action cannot be undone."
              confirmText={removeLoading ? "Removing..." : "Yes, Remove"}
              cancelText="Cancel"
            />
            {removeError && <p className="text-red-500 mt-2">Error: {removeError.message}</p>}
          </div>
        ) : (
          <div className="space-x-2">
            <Link 
              to={`/listing/${listing.id}`}
              target="_blank"
              rel="noopener noreferrer"
              // className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-violet-300 bg-white text-purple-600 hover:bg-violet-50 dark:border-violet-700 dark:bg-gray-800 dark:text-violet-400 dark:hover:bg-gray-700 h-9 px-3"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-violet-300 bg-violet-600 dark:bg-violet-700 text-white hover:bg-violet-50 dark:border-violet-700 dark:text-white dark:text-violet-400 dark:hover:bg-gray-700 h-9 px-3"

            >
              View
            </Link>

            {/* <CardButton 
              ButtonText="Chat" 
              onClick={() => navigate('/messages')} 
              variant="default" 
              size="sm"
              className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 transition-colors"
            />     */}

          </div>    
        )}
      </div>
    </CardFooter>
  )
}

export default CardFoot