import React from 'react';
import { Button } from '../ui/button';
import { FaTimesCircle, FaCopy } from 'react-icons/fa';

const EnquirePopup = ({ listingData, onClose }) => {
    const messageText = `Hey, I saw your listing "${listingData.title}" on LeaseConnect, which is listed from ${new Date(listingData.subleaseDuration.from).toLocaleDateString()} to ${new Date(listingData.subleaseDuration.to).toLocaleDateString()}. I'm interested in learning more about it.`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(messageText);
    alert('Message copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaTimesCircle size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h2>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300"><strong>Name:</strong> {listingData.createdBy.name}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> {listingData.createdBy.email}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Phone:</strong> {listingData.createdBy.phone}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Suggested Message:</h3>
          <p className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-3 rounded">{messageText}</p>
        </div>
        
        <Button onClick={copyToClipboard} className="w-full bg-violet-600 hover:bg-violet-700 text-white">
          <FaCopy className="mr-2" /> Copy Message
        </Button>
      </div>
    </div>
  );
};

export default EnquirePopup;