
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import ErrorPage from './components/ErrorPage'
import Register from './components/Register/Register'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = { <Layout /> } errorElement= {< ErrorPage /> }>
      <Route path='/' element = { <HomePage />} />
      <Route path='register' element = { < Register />} />
    </Route>
  )
)

function App() {

  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
