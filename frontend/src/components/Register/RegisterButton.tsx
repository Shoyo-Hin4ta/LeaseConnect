import { Button } from "../ui/button"

// interface BtnFieldTypes{
//   type : "submit"
// }

const RegisterButton = ({currentStep , isCompleted} : {
  currentStep? : number,
  isCompleted? : boolean
}) => {

  return (
    <>
        <Button type="submit" className="mt-5">
                Next
        </Button>
    </>
  )
}

export default RegisterButton