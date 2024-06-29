import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import CardButton from "../CardButton/CardButton"
import { useNavigate } from "react-router-dom"

const CardFoot = ({isMyListings = false} : {
  isMyListings? : boolean
}) => {

  const navigate = useNavigate();

  return (
    <CardFooter className="bottom-0 flex flex-col justify-between border  border-black  -mt-2">
          
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
            
            <div className="mt-2 w-full gap-2 flex flex-col h-[70%] border border-red-500">
              <div className=" w-full my-1 overflow-x-auto">
                Featuressssssssssssssssssssssssssssssssssadadasdadadasds
              </div>
              <div></div>
              {isMyListings ? (
                <div className="flex gap-5">
                  <CardButton ButtonText="Edit" onClick={() => navigate('/editlisting')}/>
                  <CardButton ButtonText="Remove Listing"/>
                </div>
              ) : (
                <div>
                  <CardButton ButtonText="Chat"/>
                </div>
              )}
            </div>
          
        </CardFooter>
  )
}

export default CardFoot