import { useSelector } from "react-redux";
import ListingContainer from "../Container/ListingContainer";
import ListingForm1 from "./ListingForm1";
import ListingForm2 from "./ListingForm2";
import ListingForm3 from "./ListingForm3";
import ListingForm4 from "./ListingForm4";
import Stepper from "./Stepper"; // Assuming you have a common Stepper component
import { RootState } from "@/appstore/appStore";
import { ReactNode } from "react";

const ListingPage = () => {
    // Select the current step and completion status from the Redux store
    const currentStep = useSelector((state: RootState) => state.stepper.currentStep);

    // Function to render the appropriate form based on the current step
    const renderForm = (): ReactNode => {
        switch(currentStep) {
            case 1:
                return <ListingForm1/>;
            case 2:
                return <ListingForm2 />;
            case 3:
                return <ListingForm3 />;
            case 4:
                return <ListingForm4  />;
            default:
                return null;
        }
    };

    return (
        <ListingContainer>
                <Stepper currentStep={currentStep}/>
                {renderForm()}
        </ListingContainer>
    );
};

export default ListingPage;
