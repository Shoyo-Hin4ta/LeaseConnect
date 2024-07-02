import React from 'react';
import { useSelector } from "react-redux";
import ListingContainer from "../Container/ListingContainer";
import ListingForm1 from "./ListingForm1";
import ListingForm2 from "./ListingForm2";
import ListingForm3 from "./ListingForm3";
import ListingForm4 from "./ListingForm4";
import Stepper from "./Stepper"; 
import { RootState } from "@/appstore/appStore";
import { listingPropertySteps } from '@/lib/utils';
import Container from '../Container/container';
// import { Container } from 'lucide-react';


const ListingPage = () => {
    const currentStep = useSelector((state: RootState) => state.stepper.currentStep);

    const renderForm = () => {
        switch(currentStep) {
            case 1: return <ListingForm1 currentStep={currentStep} />;
            case 2: return <ListingForm2 currentStep={currentStep}/>;
            case 3: return <ListingForm3 currentStep={currentStep}/>;
            case 4: return <ListingForm4 currentStep={currentStep}/>;
            default: return null;
        }
    };

    const currentStepDesc = listingPropertySteps.find(step => step.step === currentStep)?.stepDesc;


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4">
            <div className="flex flex-col items-center justify-center w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-indigo-800 dark:text-gray-300 mb-6">
                    {currentStepDesc}
                </h2>
                <Stepper currentStep={currentStep} />

            
            <div className="mt-10 w-full max-w-2xl mx-auto ">
                {renderForm()}
            </div>
           
        </div>
        </div>
    );
};

export default ListingPage;