import { useEffect, useState } from 'react';
import ListingCard from '../Card/ListingCard';
import SearchBar from '../SearchBar/SearchBar';
import useGetListings from '../../hooks/useGetListings';
import { useSelector } from 'react-redux';
import { getUser } from '@/appstore/userSlice';
import useGetVisitorLocation from '@/hooks/useGetVisitorLocation';
import { Button } from '../ui/button';
import { tabs } from '@/lib/utils';

export interface UserAddress {
  city: string,
  state: string,
  country: string
}

const BrowsePage = () => {
  const { userAddress, loading: locationLoading } = useGetVisitorLocation();
  const currentUser = useSelector(getUser);
  const { initialLoading, loadingMore, error, listings, getListingsForTheBrowsePage, hasNextPage, loadMore } = useGetListings();
  const [activeTab, setActiveTab] = useState('city');

  useEffect(() => {
    if (!locationLoading && userAddress) {
      updateListings(activeTab);
    }
  }, [userAddress, locationLoading]);

  const updateListings = (tab) => {
    const { city, state, country } = userAddress || {};
    switch (tab) {
      case 'city': getListingsForTheBrowsePage({ city }); break;
      case 'state': getListingsForTheBrowsePage({ state }); break;
      case 'country': getListingsForTheBrowsePage({ country }); break;
      case 'all': getListingsForTheBrowsePage({}); break;
      default: getListingsForTheBrowsePage({}); break;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    updateListings(tab);
  };

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <SearchBar isFilterPage={false} handleTabChange={handleTabChange} activeTab={activeTab}/>

      <div className='flex-grow overflow-y-auto'>
        <div className='container mx-auto px-4 py-8'>
          {initialLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {listings.map((listing: any) => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    isOwnListing={currentUser && currentUser.id === listing.createdBy.id}
                  />
                ))}
              </div>
              {hasNextPage && (
                <div className="mt-8 text-center">
                  <Button onClick={loadMore} disabled={loadingMore} className="bg-violet-600 text-white border-white hover:bg-violet-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                    {loadingMore ? 'Loading more...' : 'Load More'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;