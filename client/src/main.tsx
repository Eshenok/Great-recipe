import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import NotFound from "./pages/NotFound/NotFound";
import Main from "./pages/Main/Main";
import Sign from "./pages/Sign/Sign";
import Fridge from "./pages/Fridge/Fridge";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        children: [
          {index: true, element: <Main />},
          {
            path: '/sign-in',
            element: <Sign />,
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
