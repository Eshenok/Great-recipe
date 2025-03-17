import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import NotFound from "./pages/NotFound/NotFound";
import Main from "./pages/Main/Main";
import Sign from "./pages/Sign/Sign";
import Login from './widgets/Form/Login/Login.tsx';
import Registration from './widgets/Form/Registration/Registration.tsx';
import { RecipePage, loader as RecipePageLoader } from './pages/RecipePage/RecipePage.tsx';
import Profile from './pages/Profile/Profile.tsx';
import ProtectedRoute from './widgets/ProtectedRoute/ProtectedRoute.tsx';
import EditPass from './widgets/Form/EditPass/EditPass.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {index: true, element: <Main />},
          {
            path: '*',
            element: <NotFound />
          },
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
              },
              {
                path: '/sign/profile/pass',
                element: (
                  <ProtectedRoute>
                    <EditPass />
                  </ProtectedRoute>
                )
              }
            ]
          },
          // {
          //   path: 'fridge',
          //   element: <Fridge />,
          // },
          {
            path: ':recipeId',
            loader: RecipePageLoader,
            element: <RecipePage />
          },
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
