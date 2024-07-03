import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart } from "lucide-react";
import CardFooter from "./CardFooter/CardFoot"
import CardCarousel from "./Carousel/CardCaraousel"
import { Link } from "react-router-dom";

export function ListingCard({isMyListings = false} : {
  isMyListings? : boolean
}) {



  return (

      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">Title</CardTitle>
              <CardDescription className="text-sm text-gray-500">Date | Price</CardDescription>
            </div>
            {!isMyListings && (
              <button className="text-red-500 hover:text-red-600 transition-colors">
                <Heart size={24} />
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <CardCarousel />
        </CardContent>
        <CardFooter isMyListings={isMyListings}/>
      </Card>

  )
}

export default ListingCard