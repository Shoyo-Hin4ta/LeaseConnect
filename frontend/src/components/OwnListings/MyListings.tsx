import useGetMyListings from '@/hooks/useGetMyListings';
import ListingCard from '../Card/ListingCard';
import ShimmerListingCards from '../ShimmerListingCards';
import NoListingsFound from '../NoListingsFound';

const MyListings = () => {
  const { myListings, loading, error, refetch } = useGetMyListings();

  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6 text-center text-violet-600 dark:text-violet-400'>
            My Listings
        </h1>
        {loading ? (
          <ShimmerListingCards count={1}/>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500 dark:text-red-400">Error: {error.message}</p>
          </div>
        ) : !myListings || myListings.length === 0 ? (
          <NoListingsFound 
            message="You haven't listed anything yet. Start by creating your first listing!"
            ctaText="Create Listing"
            ctaLink="/listingform"
          />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {myListings.map((myListing: any) => (
              <ListingCard
                key={myListing.id}
                listing={myListing}
                isMyListings={true}
                refetch={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;