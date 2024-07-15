import { useQuery } from '@apollo/client';
import { useState, useCallback, useEffect } from 'react';
import { GET_LISTINGS } from '../graphql/queries';
import { LIMIT } from '@/lib/constant';

const limit = LIMIT;

const useGetListings = () => {
  const [variables, setVariables] = useState({});
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allListings, setAllListings] = useState<any[]>([]);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_LISTINGS, {
    variables: { ...variables, page, limit },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.getListings?.listings) {
      setAllListings(prevListings => {
        const newListings = page === 1 
          ? data.getListings.listings 
          : [...prevListings, ...data.getListings.listings];
        return Array.from(new Map(newListings.map(listing => [listing.id, listing])).values());
      });
    }
  }, [data?.getListings?.listings, page]);

  const getListingsForTheBrowsePage = useCallback((newVariables = {}) => {
    setPage(1);
    setVariables(newVariables);
    refetch({ ...newVariables, page: 1, limit });
  }, [refetch]);



  const loadMore = useCallback(() => {
    if (isLoadingMore || !data?.getListings?.hasNextPage) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    fetchMore({
      variables: {
        ...variables,
        page: nextPage,
        limit: limit
      },
    }).then(({ data: newData }) => {
      if (newData?.getListings?.listings) {
        setAllListings(prevListings => {
          const newListings = [...prevListings, ...newData.getListings.listings];
          return Array.from(new Map(newListings.map(listing => [listing.id, listing])).values());
        });
      }
      setIsLoadingMore(false);
      setPage(nextPage);
    }).catch(error => {
      setIsLoadingMore(false);
      console.error("Error loading more listings:", error);
    });
  }, [fetchMore, variables, page, isLoadingMore, data?.getListings?.hasNextPage]);

  return {
    initialLoading: loading && page === 1 && allListings.length === 0,
    loadingMore: isLoadingMore,
    error,
    listings: allListings,
    totalCount: data?.getListings?.totalCount || 0,
    hasNextPage: data?.getListings?.hasNextPage || false,
    getListingsForTheBrowsePage,
    loadMore
  };
};

export default useGetListings;