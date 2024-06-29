import ListingContainer from "../Container/ListingContainer"
import ListingForm1 from "./ListingForm1"
import ListingForm2 from "./ListingForm2"
import ListingForm3 from "./ListingForm3"
import ListingForm4 from "./ListingForm4"



const ListingPage = () => {
  return (
    <ListingContainer>
        <ListingForm1 />
        <ListingForm2 />
        <ListingForm3 />
        <ListingForm4 />
    </ListingContainer>
  ) 
}

export default ListingPage