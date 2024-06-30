import React from 'react';
import ListingCard from '../Card/ListingCard';
import SearchBar from '../SearchBar/SearchBar';

const BrowsePage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <SearchBar />
      <div className='flex-grow container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {/* Add many ListingCards to ensure there's enough content to scroll */}
          {[...Array(20)].map((_, index) => (
            <ListingCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrowsePage;