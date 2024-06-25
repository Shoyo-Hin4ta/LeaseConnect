import ListingCard from '../Card/ListingCard';
import SearchBar from '../SearchBar/SearchBar';

const BrowsePage = () => {
  return (
    <div className='w-full '>
        
        {/* <div className='h-screen'></div> */}
        {/* <ListingCard /> */}

          {/* <Sidebar /> */}
          <div className='z-20'>
            <SearchBar />
          </div>
          <div className='flex flex-col items-center gap-5 mt-4 z-0'>
            <ListingCard />
            <ListingCard />
            <ListingCard />          
            <ListingCard />
          </div>
          
  
    </div>
  )
}

export default BrowsePage
