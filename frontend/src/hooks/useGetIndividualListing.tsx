import { useQuery } from '@apollo/client'
import { GET_INDIVIDUAL_LISTING } from '../graphql/queries';



const useGetIndividualListing = (listingID : string) => {
    

    const {loading, refetch, data, error} = useQuery(GET_INDIVIDUAL_LISTING,{
        variables : {
            listingID
        }
    });

    return {
        loading,
        error,
        listingData: data?.getIndividualListing || null,
        refetch
      };

}

export default useGetIndividualListing;