import { UserAddress } from "@/components/Browse/BrowsePage";
import { useEffect, useState } from "react";

const useGetVisitorLocation = () => {
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // console.log("useGetVisitorLocation useeffect");

    const getAddress = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org');
        const ipAddress = await ipResponse.text();
        const locationResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const locationData = await locationResponse.json();
        // console.log(locationData)
        setUserAddress({
          city: locationData.city,
          state: locationData.region,
          country: locationData.country
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setLoading(false);
      }
    };

    getAddress();
  }, []);

  // return { userAddress, loading };
  return { userAddress:null, loading };

};

export default useGetVisitorLocation;