import { useEffect, useState } from 'react';
import ListingCard from '../Card/ListingCard';
import SearchBar from '../SearchBar/SearchBar';
import useGetListings from '../../hooks/useGetListings';
import { useSelector } from 'react-redux';
import { getUser } from '@/appstore/userSlice';
import useGetVisitorLocation from '@/hooks/useGetVisitorLocation';
import { Button } from '../ui/button';
import { tabs } from '@/lib/utils';
import ShimmerListingCards from '../ShimmerListingCards';
import NoListingsFound from '../NoListingsFound';

export interface UserAddress {
  city: string,
  state: string,
  country: string
}

const BrowsePage = () => {
  const { userAddress, loading: locationLoading } = useGetVisitorLocation();
  const currentUser = useSelector(getUser);
  const { initialLoading, loadingMore, error, listings, getListingsForTheBrowsePage, hasNextPage, loadMore } = useGetListings();
  const [activeTab, setActiveTab] = useState('');
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);

  useEffect(() => {
    if (!locationLoading) {
      if (userAddress && userAddress.city) {
        setActiveTab('city');
        getListingsForTheBrowsePage({ city: userAddress.city });
      } else {
        setActiveTab('all');
        getListingsForTheBrowsePage({});
      }
      setHasFetchedInitialData(true);
    }
  }, [userAddress, locationLoading]);
  

  const updateListings = (tab) => {
    setActiveTab(tab);
    if (!userAddress && tab !== 'all') {
      // If no user address is available, default to 'all'
      setActiveTab('all');
      getListingsForTheBrowsePage({});
    } else {
      const { city, state, country } = userAddress || {};
      switch (tab) {
        case 'city':
          if (city) getListingsForTheBrowsePage({ city });
          else getListingsForTheBrowsePage({});
          break;
        case 'state':
          if (state) getListingsForTheBrowsePage({ state });
          else getListingsForTheBrowsePage({});
          break;
        case 'country':
          if (country) getListingsForTheBrowsePage({ country });
          else getListingsForTheBrowsePage({});
          break;
        case 'all':
        default:
          getListingsForTheBrowsePage({});
          break;
      }
    }
  };

  const getHeadingText = () => {
    if (activeTab === 'all') {
      return "Showing all listings";
    } else {
      const tabLabel = tabs.find(tab => tab.id === activeTab)?.label || '';
      return `Showing all listings in your ${tabLabel}`;
    }
  };

  const handleTabChange = (tab) => {
    updateListings(tab);
  };

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <SearchBar isFilterPage={false} handleTabChange={handleTabChange} activeTab={activeTab}/>

      <div className='flex-grow overflow-y-auto'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-xl font-bold mb-6 text-center text-violet-600 dark:text-violet-400'>
            {getHeadingText()}            
          </h1>
          {!hasFetchedInitialData || initialLoading ? (
            <ShimmerListingCards count={6} />
          ) : error ? (
            <div className="error-container text-center">
              <p className="text-red-500 mb-4">Error: {error.message || 'An unexpected error occurred.'}</p>
              <Button onClick={() => updateListings(activeTab)} className="bg-violet-600 text-white hover:bg-violet-500">
                Try Again
              </Button>
            </div>
          ) : listings.length === 0 ? (
            <NoListingsFound 
              message={`No listings found ${activeTab !== 'all' ? `in your ${activeTab}` : ''}. Try adjusting your search or location.`}
              ctaText="Explore All Listings"
              ctaLink="/browse"
            />
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