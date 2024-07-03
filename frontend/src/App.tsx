
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
import ProfilePage from './components/Profile/ProfilePage'
import IndividualListingPage from './components/IndividualListingPage/IndividualListingPage'
import MyListings from './components/OwnListings/MyListings'
import EditListingPage from './components/OwnListings/EditListing/EditListingPage'
import LoginPage from './components/SignIn/LoginPage'
import ForgotPasswordPage from './components/SignIn/ForgotPasswordPage'
import ChatComponent from './components/Chat/ChatComponent'
import FavouritePage from './components/Favourite/FavouritePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = { <Layout /> } errorElement= {< ErrorPage /> }>
      <Route path='/' element = { <HomePage />} errorElement= {< ErrorPage /> }/>
      <Route path='/register' element = { < RegisterPage />} errorElement= {< ErrorPage /> }/>
      <Route path='/login' element = { < LoginPage />} errorElement= {< ErrorPage /> }/>
      <Route path='/forgot-password' element = { < ForgotPasswordPage />} errorElement= {< ErrorPage /> }/>
      <Route path='/browse' element = { < Browse />} errorElement= {< ErrorPage /> }/>
      <Route path ='/listingform' element = { < ListingPage/> } errorElement= {< ErrorPage /> }/>
      <Route path ='/messages' element = { < ChatComponent/> } errorElement= {< ErrorPage /> }/>
      <Route path ='/profilepage' element = { < ProfilePage/> } errorElement= {< ErrorPage /> }/>
      <Route path ='/listing' element = { < IndividualListingPage/> } errorElement= {< ErrorPage /> }/>
      <Route path ='/mylistings' element = { < MyListings/> } errorElement= {< ErrorPage /> }/>
      <Route path ='/editlisting' element = { < EditListingPage/> } errorElement= {< ErrorPage /> }/>
      <Route path ='/favourites' element = { < FavouritePage/> } errorElement= {< ErrorPage /> }/>

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
