import useGetMyListings from '@/hooks/useGetMyListings';
import ListingCard from '../Card/ListingCard';
// import SearchBar from '../SearchBar/SearchBar';

const MyListings = () => {

  const {myListings, loading, error, refetch} = useGetMyListings();

  if (loading) return <p>Loading...</p>;
  if (!myListings || myListings.length === 0) return <p> You haven't listed anything </p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
      
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {myListings.map((myListing : any) => (
              <ListingCard  key={myListing.id}   
                            listing={myListing} 
                            isMyListings={true}
                            refetch={refetch}
              />
            ))}
        </div>
      </div>
    </div>
  )
}



export default MyListings
