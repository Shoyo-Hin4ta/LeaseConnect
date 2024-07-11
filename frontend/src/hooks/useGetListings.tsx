import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_LISTINGS } from '../graphql/queries';

const useGetListings = () => {

    const [variables, setVariables] = useState({});

    const {loading, error, data, refetch} = useQuery(GET_LISTINGS , {
        variables
    });


    const getListingsForTheBrowsePage = ( newVariables = {} ) => {
        setVariables(prevVariables => ({
            ...prevVariables,
            ...newVariables
        }))
    };

    return {
        loading,
        error,
        listings: data?.getListings || [],
        getListingsForTheBrowsePage,
        refetch
      };
    };
    
export default useGetListings;