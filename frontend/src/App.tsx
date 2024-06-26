
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import ErrorPage from './components/ErrorPage'
import RegisterPage from './components/Register/RegisterPage'
import { Provider } from 'react-redux'
import store from './appstore/appStore'
import Browse from './components/Browse/BrowsePage'
import ListingPage from './components/Listing/ListingPage'
import MessagePage from './components/Chat/MessagePage'
import ProfilePage from './components/Profile/ProfilePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = { <Layout /> } errorElement= {< ErrorPage /> }>
      <Route path='/' element = { <HomePage />} />
      <Route path='/register' element = { < RegisterPage />} />
      <Route path='/browse' element = { < Browse />} />
      <Route path ='/listingform' element = { < ListingPage/> } />
      <Route path ='/messages' element = { < MessagePage/> } />
      <Route path ='/profilepage' element = { < ProfilePage/> } />

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
