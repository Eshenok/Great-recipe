import React from 'react'
import ReactDOM from 'react-dom/client'
import App, {loader as getUserLoader} from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import NotFound from "./pages/NotFound/NotFound";
import Main from "./pages/Main/Main";
import Sign from "./pages/Sign/Sign";
import Fridge from "./pages/Fridge/Fridge";
import { action as loginAction } from './widgets/Form/Login/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getUserLoader,
    errorElement: <NotFound />,
    children: [
      {
        children: [
          {index: true, element: <Main />},
          {
            path: '/sign-in',
            element: <Sign />,
            action: loginAction,
          },
          {
            path: '/sign-up',
            element: <Sign />
          },
          {
            path: 'fridge',
            element: <Fridge />,
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
