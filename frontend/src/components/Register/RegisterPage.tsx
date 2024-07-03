import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/appstore/appStore';
import RegisterForm from './RegisterForm';
import RegisterForm2 from './RegisterForm2';
import RegisterForm3 from './RegisterForm3';
import Stepper from './Stepper';
import { steps } from '@/lib/utils';

const RegisterPage = () => {
  const currentStep = useSelector((state: RootState) => state.stepper.currentStep);

  const renderForm = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return <RegisterForm currentStep={currentStep} />;
      case 2:
        return <RegisterForm2 currentStep={currentStep} />;
      case 3:
        return <RegisterForm3 currentStep={currentStep} />;
      default:
        return null;
    }
  };

  const currentStepDesc = steps.find(step => step.step === currentStep)?.stepDesc;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex items-center flex-col">
        <h2 className="text-3xl font-bold text-center text-violet-800 dark:text-violet-200 mb-6">
          {currentStepDesc}
        </h2>
        <Stepper currentStep={currentStep} />
        <div className="mt-8">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;