import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Paste from './components/Paste'
import Home from './components/Home'
import Viewpaste from './components/Viewpaste'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: "/pastes",
      element: <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path: "/pastes/:id",
      element: <div>
        <Navbar />
        <Viewpaste />
      </div>
    },
  ]
)

function App() {
 

  return (
  <div>
   <RouterProvider router = {router} />
   <Toaster />
  </div>
  )
}

export default App
