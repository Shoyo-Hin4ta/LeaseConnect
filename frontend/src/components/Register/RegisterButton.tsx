import { steps } from "@/lib/utils"
import { Button } from "../ui/button"
import { useSelector } from "react-redux";
import { RootState } from "@/appstore/appStore";

// interface BtnFieldTypes{
//   type : "submit"
// }

const RegisterButton = ({currentStep} : {
  currentStep : number,
}) => {

  const isCompleted = useSelector((s:RootState) => s.stepper.isCompleted);


  return (
    <>
       {!isCompleted && (

        <Button type="submit" className="mt-5">
          {currentStep < steps.length
            ? `Next ( ${currentStep}/${steps.length} )`
            : currentStep === steps.length
            ? `Finish ( ${currentStep}/${steps.length} )`
            : "Submit"}
        </Button>
      )}
    </>
  )
}

export default RegisterButton