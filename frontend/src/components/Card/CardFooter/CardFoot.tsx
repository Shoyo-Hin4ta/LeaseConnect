import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"

const CardFoot = () => {
  return (
    <CardFooter className="bottom-0 flex flex-col justify-between border  border-black h-2/5">
          
              <div className="border border-red-500 w-full h-[55%]">
                  <div className="flex justify-between ">
                    <div className="w-5/6">
                    <div className="whitespace-normal break-words overflow-hidden text-ellipsis">
                      Title
                    </div>
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
              <Button>Chat </Button>
            </div>
          
        </CardFooter>
  )
}

export default CardFoot