import './App.css';
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import './widgets/Form/Form.scss';
import {useEffect, useState} from "react";
import {Outlet, useLoaderData} from 'react-router-dom';
import {LanguageContext} from "./context/LanguageContext";
import {useDispatch} from "react-redux";
import {initCategories} from "./store/categorySlice";
import Header from './widgets/Header/Header';

export const loader = async () => {
  const res = await fetch('http://localhost:2020/users/me', {
    method: 'GET',
    credentials: 'include',
  })

  if (res.status === 401 || res.status === 500)  {
    return {user: null}
  }
  const user = await res.json();
  return {user};
}

function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useDispatch();
  const {user} = useLoaderData();

  console.log(user);

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
      </div>
    </LanguageContext.Provider>

  )
}

export default App
