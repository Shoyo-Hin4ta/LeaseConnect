import ListingCard from '../Card/ListingCard';
import SearchBar from '../SearchBar/SearchBar';
import useGetListings from '../../hooks/useGetListings';

const BrowsePage = () => {
  const { loading, error, listings, getListingsForTheBrowsePage } = useGetListings();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <SearchBar />
      <div className='flex-grow overflow-y-auto'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
