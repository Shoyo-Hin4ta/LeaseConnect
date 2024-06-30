import ListingCard from '../Card/ListingCard';
import SearchBar from '../SearchBar/SearchBar';

const BrowsePage = () => {
  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
      <div className='sticky top-0 z-20'>
        <SearchBar />
      </div>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </div>
    </div>
  )
}

export default BrowsePage