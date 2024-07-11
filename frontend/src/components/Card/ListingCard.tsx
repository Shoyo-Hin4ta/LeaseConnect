import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Calendar, DollarSign } from "lucide-react";
import CardFooter from "./CardFooter/CardFoot"
import CardCarousel from "./Carousel/CardCaraousel"
// import { Listing } from "../../types/Listing";

interface ListingCardProps {
  listing: any;
  isMyListings?: boolean;
}

export function ListingCard({ listing, isMyListings = false }: ListingCardProps) {
  const { title, subleaseDuration, images, numberOfDays } = listing;

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader>
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
            <button className="text-red-500 hover:text-red-600 transition-colors">
              <Heart size={24} />
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