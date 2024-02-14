import './App.css'
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import './widgets/Form/Form.scss';
import {useEffect, useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import {useDispatch} from "react-redux";
import {initCategories} from "./store/categorySlice";
import Sign from "./pages/Sign/Sign";
import Header from './widgets/Header/Header';
import { Outlet } from 'react-router-dom';

function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useDispatch();

  const changeLanguage = (lng: 'en' | 'ru') => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  useEffect(() => {
    dispatch(initCategories({language: language}));
  }, [language])

  return (
    <LanguageContext.Provider value={language}>
      <Header onSwapLanguage={changeLanguage} />
      <div className='content'>
        <div className='content__bg'/>
          <Outlet />
        {/* <Sign route={'sign-in'} /> */}
        {/* <Main  /> */}
      </div>
    </LanguageContext.Provider>

  )
}

export default App
