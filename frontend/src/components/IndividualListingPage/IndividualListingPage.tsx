import MainHeading from './MainHeading'
import PropertyDetails from './PropertyDetails/PropertyDetails'
import { useParams } from 'react-router-dom'
import useGetIndividualListing from '../../hooks/useGetIndividualListing';
import LoadingAnimation from '../../components/LoadingAnimation'

const IndividualListingPage = () => {
  const { listingID } = useParams<{listingID : string}>();
  const { listingData, loading, error, refetch} =  useGetIndividualListing(listingID || '');

  if (loading) return <LoadingAnimation />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainHeading listingData={listingData} />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <PropertyDetails listingData={listingData} />
      </div>
    </div>
  )
}

export default IndividualListingPage;