import { listingPropertySteps } from "@/lib/utils"; // Assuming you have steps defined here
import { Button } from "../ui/button"; // Assuming you have a custom Button component
import { useSelector } from "react-redux";
import { RootState } from "@/appstore/appStore";


interface RegisterButtonProps {
  currentStep: number;
  isSubmitting?: boolean;
  className?: string;
}

const ListingButton: React.FC<RegisterButtonProps> = ({ currentStep, isSubmitting = false, className = "" }) => {

  const isCompleted = useSelector((s: RootState) => s.stepper.isCompleted);


  const baseClassName = "w-full mt-5 text-white transition-colors duration-200 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const activeClassName = "bg-violet-600 hover:bg-violet-700 focus:ring-violet-500";
  const disabledClassName = "bg-violet-400 cursor-not-allowed";
  const darkModeClassName = "dark:bg-violet-700 dark:hover:bg-violet-600 dark:focus:ring-violet-400";

  const buttonText = 
    currentStep < listingPropertySteps.length
      ? `Next ( ${currentStep}/${listingPropertySteps.length} )`
      : currentStep === listingPropertySteps.length
        ? `Finish ( ${currentStep}/${listingPropertySteps.length} )`
        : "Submit";

  return (
    <>
      {!isCompleted && (
        <Button 
          type="submit" 
          disabled={isSubmitting}
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
    </>
  );
};

export default ListingButton;
