import MainHeading from './MainHeading'
import PropertyDetails from './PropertyDetails/PropertyDetails'
import { useParams } from 'react-router-dom'
import useGetIndividualListing from '../../hooks/useGetIndividualListing';
import LoadingAnimation from '../../components/LoadingAnimation'

const IndividualListingPage = () => {
  const { listingID } = useParams<{listingID : string}>();
  const { listingData, loading, error, refetch} =  useGetIndividualListing(listingID || '');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {loading ? (
        <div className="flex justify-center items-center flex-grow">
          <LoadingAnimation />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center flex-grow">
          <p className="text-lg text-red-500 dark:text-red-400">Error: {error.message}</p>
        </div>
      ) : listingData ? (
        <>
          <MainHeading listingData={listingData} />
          <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
            <PropertyDetails listingData={listingData} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-grow">
          <p className="text-lg text-gray-600 dark:text-gray-300">No listing data available.</p>
        </div>
      )}
    </div>
  )
}

export default IndividualListingPage;