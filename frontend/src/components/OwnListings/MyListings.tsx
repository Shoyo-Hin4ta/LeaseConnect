import ListingCard from '../Card/ListingCard';
// import SearchBar from '../SearchBar/SearchBar';

const MyListings = () => {
  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
      
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            <ListingCard isMyListings={true}/>
            <ListingCard isMyListings={true}/>                    
            <ListingCard isMyListings={true}/> 
        </div>
      </div>
    </div>
  )
}



export default MyListings
