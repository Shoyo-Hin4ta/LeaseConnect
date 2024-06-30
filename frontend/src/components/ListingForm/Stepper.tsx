import { RefObject, useEffect, useRef, useState } from "react";
import { listingPropertySteps } from "@/lib/utils";

type marginTypes = {
  marginLeft : number | undefined,
  marginRight : number | undefined
}

const Stepper = ({currentStep} : {
  currentStep : number
}) => {



  const [margins, setMargins] = useState<marginTypes>({
    marginLeft : 0,
    marginRight : 0
  })
  
  const stepRef = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(()=> {
    // console.log(stepRef.current[0]?.current?.offsetWidth);
    // console.log(stepRef.current[steps.length-1]?.current?.offsetWidth);
    setMargins({
      marginLeft: ((stepRef.current[0]?.current?.offsetWidth)),
      marginRight : ((stepRef.current[listingPropertySteps.length-1]?.current?.offsetWidth))
    })
  }, [stepRef]);
  

    const calulateProgressWidth = () => {
      const val = ((currentStep-1)/ (listingPropertySteps.length-1)) * 100 
      console.log(`progress % ${val}`)
      if(val > 100){
        return 100;
      }
      return val;
    }
    
  return (

      <div className="relative flex  justify-between items-center w-4/5 z-20 p-0 border-2 my-4 mb-5">
    
        {
          listingPropertySteps.map((stepper, index) => {
            
            return (
      
              <div key = {index} className="border border-red-400 w-12 flex flex-col items-center">
                <div className={`border border-black 
                  ${currentStep === stepper.step ? "bg-blue-400" : ""}
                  ${currentStep > stepper.step ? "bg-green-400" : ""} 
                  ${currentStep < stepper.step ? "bg-slate-200" : ""} 
                  rounded-full h-12 w-full flex flex-col justify-center items-center z-20 `} 
                   
                  ref={(el) => {
                    if (el instanceof HTMLDivElement) {
                      stepRef.current[index] = { current: el };
                    }
                }}>
                    
                    {stepper.step}

      
                    </div>
                  {/* <div className="text-sm">{`${stepper.stepDesc}`}</div> */}
                </div>


              
        
            )
          })}

          <div className="absolute z-10 bg-gray-400 h-1 top-[45%] left-0" style={{
              width : `calc(100% - ${(margins.marginLeft! + margins.marginRight!)}px)`,
              marginLeft: margins.marginLeft,
              marginRight : margins.marginRight
              }}>
                <div className={`bg-green-400 h-full ease-in duration-200`} style={{width: `${calulateProgressWidth()}%`}}></div>
          </div>
        
        
      </div>

  )
}

export default Stepper