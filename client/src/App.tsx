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

function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useDispatch();
  const {user}: UserType = useSelector(state => state.user);

  const changeLanguage = (lng: 'en' | 'ru') => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  useEffect(() => {
    dispatch(getUser());
  }, [user]);

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
