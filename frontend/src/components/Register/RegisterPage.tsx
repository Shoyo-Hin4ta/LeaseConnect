import { useSelector } from "react-redux";
import RegisterForm from "./RegisterForm";
import Stepper from "./Stepper";
import { RootState } from "@/appstore/appStore";
import RegisterForm2 from "./RegisterForm2";


const RegisterPage = () => {

    const currentStep = useSelector((s:RootState) => s.stepper.currentStep);
    const isCompleted = useSelector((s:RootState) => s.stepper.isCompleted);

    // console.log(currentStep);
    return (
        <div className="flex items-center justify-center border border-blue-600 ">
            <div className="flex flex-col items-center border border-green-600 w-full">
                
                <Stepper currentStep={currentStep} isCompleted={isCompleted}/>
                <RegisterForm currentStep={currentStep} isCompleted={isCompleted}/>
                <RegisterForm2 />
            </div>
        </div>
    )
}

export default RegisterPage;