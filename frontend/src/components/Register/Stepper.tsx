import { RefObject, useEffect, useRef, useState } from "react";
import { steps } from "@/lib/utils";

type marginTypes = {
  marginLeft: number | undefined,
  marginRight: number | undefined
}

const Stepper = ({ currentStep }: {
  currentStep: number,
}) => {

  const [margins, setMargins] = useState<marginTypes>({
    marginLeft: 0,
    marginRight: 0
  })

  const stepRef = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    setMargins({
      marginLeft: ((stepRef.current[0]?.current?.offsetWidth)),
      marginRight: ((stepRef.current[steps.length - 1]?.current?.offsetWidth))
    })
  }, [stepRef]);

  const calulateProgressWidth = () => {
    const val = ((currentStep - 1) / (steps.length - 1)) * 100
    if (val > 100) {
      return 100;
    }
    return val;
  }

  return (
    <div className="relative flex justify-between items-center w-4/5 z-20 p-0 my-4 mb-5 rounded-lg bg-white dark:bg-gray-800">
      {
        steps.map((stepper, index) => {
          return (
            <div key={index} className="w-12 flex flex-col items-center">
              <div className={`border-2 border-indigo-300 dark:border-gray-600
                  ${currentStep === stepper.step ? "bg-indigo-400 dark:bg-indigo-600 shadow-lg shadow-indigo-300 dark:shadow-indigo-800" : ""}
                  ${currentStep > stepper.step ? "bg-green-400 dark:bg-green-600 shadow-lg shadow-green-300 dark:shadow-green-800" : ""}
                  ${currentStep < stepper.step ? "bg-slate-200 dark:bg-gray-700 shadow-lg shadow-gray-300 dark:shadow-gray-800" : ""}
                  rounded-full h-12 w-full flex flex-col justify-center items-center z-20`}
                ref={(el) => {
                  if (el instanceof HTMLDivElement) {
                    stepRef.current[index] = { current: el };
                  }
                }}>
                {stepper.step}
              </div>
            </div>
          )
        })}

      <div className="absolute z-10 bg-gray-400 dark:bg-gray-600 h-1 top-[45%] left-0" style={{
        width: `calc(100% - ${(margins.marginLeft! + margins.marginRight!)}px)`,
        marginLeft: margins.marginLeft,
        marginRight: margins.marginRight
      }}>
        <div className={`bg-green-400 dark:bg-green-600 h-full ease-in duration-200`} style={{ width: `${calulateProgressWidth()}%` }}></div>
      </div>
    </div>
  )
}

export default Stepper