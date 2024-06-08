import RegisterForm from "./RegisterForm";
import Stepper from "./Stepper";

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center border border-blue-600 ">
            <div className="flex flex-col items-center border border-green-600 w-full">
                <Stepper />
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage;