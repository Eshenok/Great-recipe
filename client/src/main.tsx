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
import Login from './widgets/Form/Login/Login.tsx';
import Registration from './widgets/Form/Registration/Registration.tsx';

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
            path: '/sign',
            element: <Sign />,
            children: [
              {
                path: '/sign/in',
                element: <Login />,
              },
              {
                path: '/sign/up',
                element: <Registration />
              },
            ]
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
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
)
