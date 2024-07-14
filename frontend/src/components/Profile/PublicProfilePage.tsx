import React from 'react';
import { useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

const PublicProfilePage = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-200 mb-8">{userData.name}'s Profile</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt={userData.name} className="w-48 h-48 rounded-full object-cover" />
              ) : (
                <div className="w-48 h-48 bg-violet-200 dark:bg-violet-700 rounded-full flex items-center justify-center">
                  <User size={64} className="text-violet-600 dark:text-violet-300" />
                </div>
              )}
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300 mb-4">Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.address?.city}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.address?.state}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.address?.country}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zipcode</label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{userData.address?.zipcode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;