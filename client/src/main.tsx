import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Main from './pages/Main/Main.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Sign from './pages/Sign/Sign.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/sign-in',
        element: <Sign />
      },
      {
        path: '/sign-up',
        element: <Sign />
      }
    ]
  },
  // {
  //   path: '/profile',
  //   element: <Main />
  // }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
