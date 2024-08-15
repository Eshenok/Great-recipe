import './App.css';
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import './widgets/Form/Form.scss';
import {useEffect, useState} from "react";
import {Outlet, useLoaderData} from 'react-router-dom';
import {LanguageContext} from "./context/LanguageContext";
import {useDispatch, useSelector} from "react-redux";
import {initCategories} from "./store/categorySlice";
import Header from './widgets/Header/Header';
import UserType from './Types/UserType';
import { getUser } from './store/userSlice';
import { dropFetchedRecipes } from './pages/Main/Api/DropFetchedRecipes';
import { getRndRecipes } from './pages/Main/Api/GetRndRecipes';
import { useAppDispatch, useAppSelector } from './hooks/useAppRedux';
import { dropRecipes } from './store/recipesSlice';

function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);

  const changeLanguage = (lng: 'en' | 'ru') => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('recipes') || localStorage.getItem('recipes')?.length !== 0) {
      dispatch(dropFetchedRecipes()).then(() =>dispatch(getRndRecipes()));
    } 
    // dispatch(getRndRecipes());
  }, []);


  useEffect(() => {
    dispatch(initCategories({language: language}));
  }, [language])

  return (
    <LanguageContext.Provider value={language}>
      <Header onSwapLanguage={changeLanguage} />
      <div className='content'>
        <div className='content__bg'/>
        <Outlet />
      </div>
    </LanguageContext.Provider>

  )
}

export default App
