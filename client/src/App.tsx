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
import { useAppDispatch } from './hooks/useAppRedux';

function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useAppDispatch();

  const changeLanguage = (lng: 'en' | 'ru') => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('recipes') || localStorage.getItem('recipes')?.length !== 0) {
      dispatch(dropFetchedRecipes());
    }
    dispatch(getRndRecipes());
  }, []);

  useEffect(() => {
    dispatch(getUser());
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
