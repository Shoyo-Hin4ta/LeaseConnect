
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import HomePage from './components/Home/HomePage'
import ErrorPage from './components/ErrorPage'
import RegisterPage from './components/Register/RegisterPage'
import { Provider } from 'react-redux'
import store from './appstore/appStore'
import Browse from './components/Browse/BrowsePage'
import ListingPage from './components/ListingForm/ListingPage'
import MessagePage from './components/Chat/MessagePage'
import ProfilePage from './components/Profile/ProfilePage'
import IndividualListingPage from './components/IndividualListingPage/IndividualListingPage'
import MyListings from './components/OwnListings/MyListings'
import EditListingPage from './components/OwnListings/EditListing/EditListingPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = { <Layout /> } errorElement= {< ErrorPage /> }>
      <Route path='/' element = { <HomePage />} />
      <Route path='/register' element = { < RegisterPage />} />
      <Route path='/browse' element = { < Browse />} />
      <Route path ='/listingform' element = { < ListingPage/> } />
      <Route path ='/messages' element = { < MessagePage/> } />
      <Route path ='/profilepage' element = { < ProfilePage/> } />
      <Route path ='/listing' element = { < IndividualListingPage/> } />
      <Route path ='/mylistings' element = { < MyListings/> } />
      <Route path ='/editlisting' element = { < EditListingPage/> } />
    </Route>
   
  )
)

function App() {

  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </>
  )
}

export default App
