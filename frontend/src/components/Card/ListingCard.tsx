import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Calendar, User } from "lucide-react";
import CardFooter from "./CardFooter/CardFoot"
import CardCarousel from "./Carousel/CardCaraousel"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "@/appstore/userSlice";
import { ADD_TO_FAVOURITE_QUERY, REMOVE_FAVOURITE_QUERY } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
// import { Listing } from "../../types/Listing";

interface ListingCardProps {
  listing: any;
  isMyListings?: boolean;
  isOwnListing? : boolean;
}

export function ListingCard({ listing, isMyListings = false, isOwnListing }: ListingCardProps) {
  const { title, subleaseDuration, images, numberOfDays, id } = listing;

  const currentUser = useSelector(getUser);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const [addFavorite] = useMutation(ADD_TO_FAVOURITE_QUERY);
  const [removeFavorite] = useMutation(REMOVE_FAVOURITE_QUERY);

  useEffect(() => {
    if (currentUser && currentUser.favoriteListings) {
      const favorite = currentUser.favoriteListings.includes(id);
      setIsFavorite(favorite);
    }
  }, [currentUser, id]);

  const handleFavourite = async () => {
    try {
      if(currentUser){
        if (isFavorite) {
        // Remove from favorites
        await removeFavorite({
          variables: {
            listingId: id
          }
        });
      } else {
        // Add to favorites
        const {data}= await addFavorite({
          variables: {
            listingId: id
          }
        });
        console.log(data)
      }
      setIsFavorite(!isFavorite);
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-500 flex items-center">
              <Calendar size={16} className="mr-1" />
              {new Date(subleaseDuration.from).toLocaleDateString()} - {new Date(subleaseDuration.to).toLocaleDateString()}
              <span className="mx-2">|</span>
              {numberOfDays === 1 ? `${numberOfDays} Day` : `${numberOfDays} Days`} 
            </CardDescription>
          </div>
          {!isMyListings && (
            <button 
              className="transition-colors" 
              onClick={handleFavourite}
              disabled={isOwnListing}
            >
              {isOwnListing ? (
                <User size={24} className="text-blue-500" />
              ) : (
                <Heart 
                  size={24} 
                  className={isFavorite ? "fill-red-500 text-red-500" : "fill-none text-gray-400"}
                />
              )}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <CardCarousel images={images} />
      </CardContent>
      <CardFooter listing={listing} isMyListings={isMyListings}/>
    </Card>
  )
}

export default ListingCard