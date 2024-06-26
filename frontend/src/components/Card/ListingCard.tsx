import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react";
import CardFooter from "./CardFooter/CardFoot"
import CardCarousel from "./Carousel/CardCaraousel"

 
export function ListingCard() {
  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2 ">
          <Heart color="red" />
      </div>
      <Card id={`listing-id`} className="w-[24rem] h-[30rem] ">
        {/* <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader> */}
        <CardContent className="w-full h-3/5 ">
            <CardCarousel />
        </CardContent>
        
        <CardFooter />
      </Card>

    </div>
    
  )
}


export default ListingCard