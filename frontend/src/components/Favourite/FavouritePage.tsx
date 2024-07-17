import ListingCard from '../Card/ListingCard';
import { useQuery } from '@apollo/client';
import { GET_MY_FAVOURITE_LISTINGS } from '@/graphql/queries';
import ShimmerListingCards from '../ShimmerListingCards';
import NoListingsFound from '../NoListingsFound';


const FavouritePage = () => {
  const { data, loading, error } = useQuery(GET_MY_FAVOURITE_LISTINGS, {
    fetchPolicy: 'network-only',
  });


  const favouriteListings = data?.getFavouriteListings || [];

  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6 text-center text-violet-600 dark:text-violet-400'>
          Favourite Listings
        </h1>
        {loading ? (
            <ShimmerListingCards count={1} />
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500 dark:text-red-400">Error: {error.message}</p>
          </div>
        ) : favouriteListings.length === 0 ? (
          <NoListingsFound 
            message="You haven't added any listings to your favorites yet."
            ctaText="Explore Listings"
            ctaLink="/browse"
          />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {favouriteListings.map((myListing: any) => (
              <ListingCard
                key={myListing.id}
                listing={myListing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritePage;