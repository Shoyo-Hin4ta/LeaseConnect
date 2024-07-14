import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SEARCH_LISTINGS } from '@/graphql/queries';
import ListingCard from '../Card/ListingCard';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { getUser } from '@/appstore/userSlice';
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { LIMIT } from '@/lib/constant';

const limit = LIMIT;

const FilterPage: React.FC = () => {
  const location = useLocation();
  const filterData = location.state?.filterData;

  const currentUser = useSelector(getUser);
  const [page, setPage] = useState(1);
  const [variables, setVariables] = useState(filterData || {});
  const [allListings, setAllListings] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_SEARCH_LISTINGS, {
    variables: {
      filteringConditions: variables,
      page,
      limit
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.getSearchBasedListings?.listings) {
      setAllListings(prevListings => {
        const newListings = page === 1 
          ? data.getSearchBasedListings.listings 
          : [...prevListings, ...data.getSearchBasedListings.listings];
        return Array.from(new Map(newListings.map(listing => [listing.id, listing])).values());
      });
    }
  }, [data?.getSearchBasedListings?.listings, page]);

  const getListingsForFilter = useCallback((newVariables = {}) => {
    setPage(1);
    setVariables(newVariables);
    refetch({ filteringConditions: newVariables, page: 1, limit });
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !data?.getSearchBasedListings?.hasNextPage) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    fetchMore({
      variables: {
        filteringConditions: variables,
        page: nextPage,
        limit: limit
      },
    }).then(({ data: newData }) => {
      if (newData?.getSearchBasedListings?.listings) {
        setAllListings(prevListings => {
          const newListings = [...prevListings, ...newData.getSearchBasedListings.listings];
          return Array.from(new Map(newListings.map(listing => [listing.id, listing])).values());
        });
      }
      setIsLoadingMore(false);
      setPage(nextPage);
    }).catch(error => {
      setIsLoadingMore(false);
      console.error("Error loading more listings:", error);
    });
  }, [fetchMore, variables, page, isLoadingMore, data?.getSearchBasedListings?.hasNextPage]);

  const handleFilterChange = (newFilterData) => {
    getListingsForFilter(newFilterData);
  };

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <SearchBar isFilterPage={true}  />

      <div className='flex-grow overflow-y-auto'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-6 text-center text-violet-600 dark:text-violet-400'>
            Filtered Listings
          </h1>

          {
            allListings.length === 0 && (
              <>
                <h4 className='text-l font-semibold mb-6 text-center text-violet-600 dark:text-violet-400'>
                    No results found based on your search.
                </h4>
              </>
            )

          }
          
          {loading && allListings.length === 0 ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {allListings.map((listing: any) => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    isOwnListing={currentUser && currentUser.id === listing.createdBy.id}
                  />
                ))}
              </div>
              {data?.getSearchBasedListings?.hasNextPage && (
                <div className="mt-8 text-center">
                  <Button onClick={loadMore} disabled={isLoadingMore} className="bg-violet-600 text-white border-white hover:bg-violet-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                    {isLoadingMore ? 'Loading more...' : 'Load More'}
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

export default FilterPage;