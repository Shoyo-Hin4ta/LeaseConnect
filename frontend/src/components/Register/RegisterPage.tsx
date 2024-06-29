import { useSelector } from "react-redux";
import RegisterForm from "./RegisterForm";
import Stepper from "./Stepper";
import { RootState } from "@/appstore/appStore";
import RegisterForm2 from "./RegisterForm2";
import RegisterForm3 from "./RegisterForm3";
import { ReactNode } from "react"


const RegisterPage = () => {

    const currentStep = useSelector((s:RootState) => s.stepper.currentStep);
    // console.log(currentStep)

    
    const renderForm = (): ReactNode => {
        switch(currentStep){
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

    // console.log(currentStep);
    return (
        <div className="flex items-center justify-center border border-blue-600 dark:bg-black dark:text-white font-roboto">
            <div className="flex flex-col items-center border border-green-600 w-full h-screen">
                
                <Stepper currentStep={currentStep}/>
                {renderForm()}
                
            </div>
        </div>
    )
}

export default RegisterPage;