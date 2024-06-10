import { RefObject, useEffect, useRef, useState } from "react";
import { steps } from "@/lib/utils";

type marginTypes = {
  marginLeft : number,
  marginRight : number
}

const Stepper = ({currentStep , isCompleted} : {
  currentStep? : number,
  isCompleted? : boolean
}) => {



  const [margins, setMargins] = useState<marginTypes>({
    marginLeft : 0,
    marginRight : 0
  })
  const stepRef = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(()=> {
    console.log(stepRef.current[0]?.current?.offsetWidth);
    console.log(stepRef.current[steps.length-1]?.current?.offsetWidth);
    setMargins({
      marginLeft: ((stepRef.current[0]?.current?.offsetWidth)/2),
      marginRight : ((stepRef.current[steps.length-1]?.current?.offsetWidth)/2)
    })
  }, [stepRef]);
  

    const calulateProgressWidth = () => {
      const val = ((currentStep-1)/ (steps.length-1)) * 100 
      console.log(`progress % ${val}`)
      if(val > 100){
        return 100;
      }
      return val;
    }

  return (
    <div className="relative flex justify-around w-4/5 z-20 p-0 border-2 my-4">
  
      {
        steps.map((stepper, index) => {
          return (
      
            <div className={`border border-black ${currentStep === stepper.step ? "bg-blue-400" : "bg-slate-200"}
            ${currentStep > stepper.step ? "bg-green-400" : "bg-slate-200"} 
            rounded-full h-10 w-10 flex justify-center items-center z-20 m-0`} 
            key = {stepper.step} 
            ref={(el) => {
              if (el instanceof HTMLDivElement) {
                stepRef.current[index] = { current: el };
              }
            }}>
              
                {stepper.step}
              
            </div>
      
          )
        }) 
        
      }

        <div className="absolute z-10 bg-gray-400 h-1 top-4" style={{
            width : `calc(100% - ${(margins.marginLeft + margins.marginRight)*2}px)`,
            marginLeft: margins.marginLeft,
            marginRight : margins.marginRight
            }}>
              <div className={`bg-green-400 h-full ease-in duration-200`} style={{width: `${calulateProgressWidth()}%`}}></div>
        </div>
      
    </div>
  )
}

export default Stepper