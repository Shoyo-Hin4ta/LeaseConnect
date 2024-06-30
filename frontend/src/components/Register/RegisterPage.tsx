import { useSelector } from "react-redux";
import RegisterForm from "./RegisterForm";
import Stepper from "./Stepper";
import { RootState } from "@/appstore/appStore";
import RegisterForm2 from "./RegisterForm2";
import RegisterForm3 from "./RegisterForm3";
import { ReactNode } from "react"
import Container from "../Container/container";

export const steps = [
  {
    step: 1,
    stepDesc: "Personal Information",
  },
  {
    step: 2,
    stepDesc: "Additional Details",
  },
  {
    step: 3,
    stepDesc: "Review and Submit",
  }
]

const RegisterPage = () => {
  const currentStep = useSelector((s: RootState) => s.stepper.currentStep);

  const renderForm = (): ReactNode => {
    switch (currentStep) {
      case 1:
        return <RegisterForm currentStep={currentStep} />
      case 2:
        return <RegisterForm2 currentStep={currentStep} />
      case 3:
        return <RegisterForm3 currentStep={currentStep} />
      default:
        return null
    }
  }

  const currentStepDesc = steps.find(step => step.step === currentStep)?.stepDesc;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center font-roboto">
      <div className=" flex flex-col items-center w-full max-w-4xl p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-indigo-800 dark:text-gray-300 mb-6">{currentStepDesc}</h2>
        <Stepper currentStep={currentStep} />
        <Container>
          <div className="mt-10 w-full max-w-2xl mx-auto ">
            {renderForm()}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default RegisterPage;