import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App.tsx'
import { RecoilRoot } from 'recoil'
import Auth from './pages/Auth.tsx'
import Tiles from './pages/Tiles.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [{
      path: 'app',
      element: <App />
    }, {
      path: 'auth',
      element: <Auth />
    }, {
      path: 'tiles',
      element: <Tiles />
    }]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
)
