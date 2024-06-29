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

 
export function ListingCard({isMyListings = false} : {
  isMyListings? : boolean
}) {
  return (
    <div className="relative  h-[500px]">

      {!isMyListings && (<div className="absolute bottom-2 right-2 ">
          <Heart color="red" />
      </div>)}

      <Card id={`listing-id`} className="w-[24rem] h-[30rem] border border-cyan-300">

        <CardHeader className="h-1/6">
          <CardTitle>Title</CardTitle>
          <CardDescription>Date | Price</CardDescription>
        </CardHeader>

        <CardContent className="w-full h-3/6 ">
            <CardCarousel />
        </CardContent>

        <div className="h-2/6">
          <CardFooter isMyListings={isMyListings}/>
        </div>
      </Card>

    </div>
    
  )
}


export default ListingCard