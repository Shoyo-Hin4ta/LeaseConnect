import { listingPropertySteps } from "@/lib/utils"; // Assuming you have steps defined here
import { Button } from "../ui/button"; // Assuming you have a custom Button component
import { useSelector } from "react-redux";
import { RootState } from "@/appstore/appStore";

const ListingButton = () => {

  const currentStep = useSelector((state: RootState) => state.stepper.currentStep);
  const isCompleted = useSelector((state: RootState) => state.stepper.isCompleted);

  return (
    <>
      {!isCompleted && (
        <Button type="submit" className="mt-5">
          {currentStep < listingPropertySteps.length
            ? `Next (${currentStep}/${listingPropertySteps.length})`
            : currentStep === listingPropertySteps.length
            ? `Finish ( ${currentStep} /${listingPropertySteps.length} )`
            : "Submit"}
        </Button>
      )}
    </>
  );
};

export default ListingButton;
