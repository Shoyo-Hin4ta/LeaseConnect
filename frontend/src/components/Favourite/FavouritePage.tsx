import ListingCard from '../Card/ListingCard';
import { useQuery } from '@apollo/client';
import { GET_MY_FAVOURITE_LISTINGS } from '@/graphql/queries';
// import SearchBar from '../SearchBar/SearchBar';

const FavouritePage = () => {

  const {data, loading, error} = useQuery(GET_MY_FAVOURITE_LISTINGS, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (!data.getFavouriteListings || data.getFavouriteListings.length === 0) return <p> No Favourite Listings Available </p>;
  if (error) return <p>Error: {error.message}</p>;

  const favouriteListings = data.getFavouriteListings || [];

  console.log(data);

  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
      
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {favouriteListings.map((myListing : any) => (
              <ListingCard  key={myListing.id}   
                            listing={myListing} 
              />
            ))}
        </div>
      </div>
    </div>
  )
}



export default FavouritePage
