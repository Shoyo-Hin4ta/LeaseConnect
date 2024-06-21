import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Carousel from "./Carousel/Carousel"

 
export function ListingCard() {
  return (
    <Card className="w-[24rem] h-[30rem] ">
      {/* <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader> */}
      <CardContent className="w-full h-3/5 ">
          <Carousel />
      </CardContent>
      <CardFooter className="bottom-0 flex flex-col justify-between border border-black h-2/5">
        
            <div className="border border-red-500 w-full h-[55%]">
                <div className="flex justify-between ">
                  <div className="w-5/6">
                    <div className="whitespace-normal break-words overflow-hidden text-ellipsis">
                      Address
                    </div>
                    <div className="">State, Country</div>
                  </div>
                  <div className="w-1/6 text-right">
                    Price
                  </div>
                </div>
            </div>
          
          <div className="w-full h-[45%]">
            <div className="border border-red-500 w-full my-1 overflow-x-auto">
              Featuressssssssssssssssssssssssssssssssssadadasdadadasds
            </div>
            <Button></Button>
          </div>
          
 
        
      </CardFooter>
    </Card>
  )
}


export default ListingCard