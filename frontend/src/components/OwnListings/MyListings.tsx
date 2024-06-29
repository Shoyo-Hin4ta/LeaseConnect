import ListingCard from '../Card/ListingCard';
// import SearchBar from '../SearchBar/SearchBar';

const MyListings = () => {
  return (
    <div className='w-full '>
          
        <div className='flex flex-col items-center gap-5 mt-4 z-0'>
            <ListingCard isMyListings={true}/>
            <ListingCard isMyListings={true}/>                    
            <ListingCard isMyListings={true}/>          
        </div>
    </div>
  )
}

export default MyListings
