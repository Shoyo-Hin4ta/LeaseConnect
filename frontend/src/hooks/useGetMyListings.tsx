import { useQuery } from '@apollo/client'
import { GET_MY_LISTINGS } from '../graphql/queries';

const useGetMyListings = () => {
  const { loading, error, data, refetch } = useQuery(GET_MY_LISTINGS, {
        fetchPolicy: 'cache-and-network'
    });
    return {
        loading,
        error,
        myListings: data?.getMyListings || null,
        refetch
      };
    };
    
export default useGetMyListings;