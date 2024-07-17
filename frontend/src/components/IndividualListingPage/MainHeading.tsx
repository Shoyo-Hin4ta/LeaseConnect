import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaUser, FaBed, FaBath } from 'react-icons/fa'
import { formatValue } from '@/lib/utils'
import { FaHome, FaBuilding, FaWarehouse, FaStore } from 'react-icons/fa'
import { getCurrencyIcon } from './PropertyDetails/PropertyDetails'
import EnquirePopup from './EnquirePopup'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '@/appstore/userSlice'

const MainHeading = ({ listingData }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const isUserAuthenticated = useSelector(getIsAuthenticated);

  const user = useSelector(getUser);

  const getPropertyTypeIcon = (propertyType) => {
    switch(propertyType.toLowerCase()) {
      case 'apartment':
      case 'studio':
        return <FaBuilding className="mr-2" />;
      case 'house':
        return <FaHome className="mr-2" />;
      case 'commercial':
        return <FaStore className="mr-2" />;
      case 'industrial':
        return <FaWarehouse className="mr-2" />;
      default:
        return <FaHome className="mr-2" />;
    }
  }

  const handleEnquireClick = () => {
    if (isUserAuthenticated) {
      setShowPopup(true);
    } else {
      navigate('/login');
    }
  }

  const handleProfileClick = () => {
    if (user) {
      navigate(`/public-profile/${listingData.createdBy.id}`, {
        state: { 
          userData: {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            phone: user.phone,
            profileImage: user.profileImage,
            address: user.address
          }
        }
      });
    } else {
      navigate('/login');
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  return (
    <section className="w-full bg-white dark:bg-gray-800 py-8 md:py-12 shadow-md">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="w-full lg:w-2/3">
            <img
              src={listingData.images[0] || "https://via.placeholder.com/800x600"}
              alt={listingData.title}
              className="rounded-xl object-cover w-full h-full shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
                {listingData.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {listingData.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaBed className="mr-2" /> {listingData.bedroom} Bedroom(s)
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaBath className="mr-2" /> {listingData.bathroom} Bathroom(s)
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  {getCurrencyIcon(listingData.currency)}
                  <span>{listingData.amount}/{formatValue(listingData.timePeriod)}</span>               
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  {getPropertyTypeIcon(listingData.propertyType)}
                  {formatValue(listingData.propertyType)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button onClick={handleEnquireClick} size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                <FaEnvelope className="mr-2" /> Enquire
              </Button>
              <Button onClick={handleProfileClick} size="lg" variant="outline" className="text-violet-600 border-violet-600 hover:bg-violet-100 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-violet-900">
                <FaUser className="mr-2" /> View {listingData.createdBy.name}'s Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <EnquirePopup listingData={listingData} onClose={handleClosePopup} />}
    </section>
  )
}

export default MainHeading