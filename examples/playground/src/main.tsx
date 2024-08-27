import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App.tsx'
import { RecoilRoot } from 'recoil'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [{
      path: 'app',
      element: <App />
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
