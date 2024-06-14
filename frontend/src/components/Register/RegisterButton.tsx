import { steps } from "@/lib/utils"
import { Button } from "../ui/button"

// interface BtnFieldTypes{
//   type : "submit"
// }

const RegisterButton = ({currentStep , isCompleted} : {
  currentStep : number,
  isCompleted? : boolean
}) => {

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