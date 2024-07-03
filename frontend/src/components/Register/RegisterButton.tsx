import { steps } from "@/lib/utils"
import { Button } from "../ui/button"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/appstore/appStore";
import { next, prev } from "@/appstore/stepperSlice";

interface RegisterButtonProps {
  currentStep: number;
  isSubmitting?: boolean;
  className?: string;
  showPrevButton?: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ 
  currentStep, 
  isSubmitting = false, 
  className = "",
  showPrevButton = false
}) => {
  const dispatch = useDispatch();
  const isCompleted = useSelector((s: RootState) => s.stepper.isCompleted);

  const baseClassName = "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const activeClassName = "bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500";
  const disabledClassName = "bg-violet-400 cursor-not-allowed";
  const darkModeClassName = "dark:bg-violet-700 dark:hover:bg-violet-600 dark:focus:ring-violet-400";
  const prevButtonClassName = "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const buttonText = 
    currentStep < steps.length
      ? `Next ( ${currentStep}/${steps.length} )`
      : currentStep === steps.length
        ? `Finish ( ${currentStep}/${steps.length} )`
        : "Submit";

  return (
    <div className="flex justify-between mt-6 gap-4">
      {showPrevButton && (
        <Button 
          type="button" 
          onClick={() => dispatch(prev())}
          disabled={currentStep === 1}
          className={`${baseClassName} ${prevButtonClassName}`}
        >
          Previous
        </Button>
      )}
      {!isCompleted && (
        <Button 
          type="submit" 
          disabled={isSubmitting}
          onClick={() => dispatch(next())}
          className={`
            ${baseClassName} 
            ${isSubmitting ? disabledClassName : activeClassName}
            ${darkModeClassName}
            ${className}
          `}
        >
          {isSubmitting ? "Processing..." : buttonText}
        </Button>
      )}
    </div>
  )
}

export default RegisterButton;