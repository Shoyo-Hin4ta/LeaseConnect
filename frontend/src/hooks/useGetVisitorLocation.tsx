import { UserAddress } from "@/components/Browse/BrowsePage";
import { useEffect, useState } from "react";

const useGetVisitorLocation = () => {
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // console.log("useGetVisitorLocation useeffect");

    const getAddress = async () => {
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ip = await ipResponse.json();

        // const locationResponse = await fetch(`https://ip-api.com/json/${ip}`);
        // const locationData = await locationResponse.json();
        // console.log('Raw response:', locationData);

        // console.log(locationData)
        setUserAddress({
          city: ip.city,
          state: ip.region_code,
          country: ip.country_name
        });
      } catch (error) {
        console.error('Error fetching location:', error);
        return { userAddress:null, loading };
      } finally {
        setLoading(false);
      }
    };

    getAddress();
  }, []);

  return { userAddress, loading };

};

export default useGetVisitorLocation;