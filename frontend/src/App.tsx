import client from './lib/appoloClient'
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
import { ApolloProvider } from '@apollo/client'
import { ProtectedRoute, PublicRoute } from './components/RouteGuards'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path='/browse' element={<Browse />} />
      <Route path='/listing/:listingID' element={<IndividualListingPage />} />

      
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/listingform' element={<ListingPage />} />
        <Route path='/messages' element={<ChatComponent />} />
        <Route path='/profilepage' element={<ProfilePage />} />
        <Route path='/mylistings' element={<MyListings />} />
        <Route path='/editlisting/:listingID' element={<EditListingPage />} />
        <Route path='/favourites' element={<FavouritePage />} />
      </Route>
    </Route>
  )
)

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default App