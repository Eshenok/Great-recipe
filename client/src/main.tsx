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
import { RecipePage, loader as RecipePageLoader } from './pages/RecipePage/RecipePage.tsx';
import Profile from './pages/Profile/Profile.tsx';
import ProtectedRoute from './widgets/ProtectedRoute/ProtectedRoute.tsx';

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
              {
                path: '/sign/profile',
                element: (
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
              )
              }
            ]
          },
          {
            path: 'fridge',
            element: <Fridge />,
          },
          {
            path: ':recipeId',
            loader: RecipePageLoader,
            element: <RecipePage />
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
